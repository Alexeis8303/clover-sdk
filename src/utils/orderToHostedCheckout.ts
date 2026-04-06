import { ca } from "zod/v4/locales";
import { LineItem, LineItemDiscount, Modification, TaxRate } from "../types/lineitem.js";
import type { Discount, Order, OrderAdditionalCharge } from "../types/order.js";
import type { HostedCheckoutCreateInput, CartLineItem, CartTaxRate } from "../types/shoppingCart.js";

function calculatePercentageRate(rawRate: number): number {
    // Heurística para interpretar el formato de la tasa.
    // Según lo indicado: `rate` representa Percent times 100000 (ej: 12.5% = 1250000).
    if (rawRate === 0) {
        return 0;
    }
    // Para obtener el decimal multiplicador hacemos rawRate / 1e7 (porque 12.5% -> 1250000 / 1e7 = 0.125).
    return rawRate / 1e7;
}

function calculateTaxes(subtotal: number, items?: { percentage?: number, amount?: number }[]): { percentTotal: number, numericTotal: number } {    
    let percentTotal = 0;
    let numericTotal = 0;
    if (items && Array.isArray(items)) {
        for (const d of items) {
            const pct = d.percentage;
            const amt = d.amount;
            if (typeof pct === "number") {
                let rateDecimal = calculatePercentageRate(pct);

                percentTotal += Math.round(subtotal * rateDecimal);
            }
            if (typeof amt === "number") {
                // amount ya viene en centavos y se resta como valor absoluto
                numericTotal += amt;
            }
        }
    }
    return { percentTotal, numericTotal };
}

function resumeLineItems(order: Order): { cartLineItem: CartLineItem[], subtotal: number } {
    const lineItemsInput: CartLineItem[] = [];

    let subtotal = 0;

    const orderLineItems = order.lineItems ?? [];

    for (const li of orderLineItems) {
        const quantity = (li.unitQty ?? 1) as number;
        const notes: string[] = li.note?.trim() ? [li.note] : [];

        // El precio base a usar según lo indicado: `price` (siempre en centavos)
        const price = (li.price ?? 0) as number; // en centavos

        // Sumar modificaciones: amount * quantitySold por cada modification
        let modificationsTotalPerUnit = 0;
        if (li.modifications && Array.isArray(li.modifications)) {
            for (const m of li.modifications as Modification[]) {
                const modAmount = m.amount;
                const qtySold = m.quantitySold;
                const modQty = typeof qtySold === "number" ? qtySold : 1;
                const modA = typeof modAmount === "number" ? modAmount : 0;
                modificationsTotalPerUnit += modA * modQty;
                notes.push(`${m.name} ${modQty !== 1 ? `(x${modQty})` : ""}`);
            }
        }

        const unitPriceWithMods = price + modificationsTotalPerUnit;

        // Subtotal por línea antes de descuentos (en centavos)
        const lineSubtotalBeforeDiscounts = Math.round(unitPriceWithMods * quantity);


       // Aplicar descuentos de linea: primero porcentuales, luego numéricos 
       let itemDiscounts = calculateTaxes(lineSubtotalBeforeDiscounts, li.discounts);

        let lineSubtotalAfterDiscounts = lineSubtotalBeforeDiscounts - itemDiscounts.percentTotal - itemDiscounts.numericTotal;
        if (lineSubtotalAfterDiscounts < 0) lineSubtotalAfterDiscounts = 0;

         let itemTaxes = calculateTaxes(lineSubtotalAfterDiscounts, li.taxRates?.map(tr => ({ amount: tr.taxAmount })));
         let lineSubtotalAfterTaxes = lineSubtotalAfterDiscounts  + itemTaxes.numericTotal; 

        const lineTotal = lineSubtotalAfterTaxes; // precio total por la cantidad, ya con modificaciones y  descuentos aplicados (en centavos)
        subtotal += lineTotal;
       

        const cartLine: CartLineItem = {
            name: li.name,
            price: lineTotal, // precio total por la cantidad, ya con modificaciones y descuentos aplicados (en centavos)
            unitQty: quantity,
            note: notes.length ? notes.join(" * ") : undefined,
        } as CartLineItem;

        // Añadir taxRates simplificados si vienen en el line item
        if (li.taxRates && Array.isArray(li.taxRates)) {
            const cartTaxRates: CartTaxRate[] = li.taxRates?.map((t) => {                
                return {
                    id: t.id,
                    name: t.name,
                    rate: t.rate ? t.rate : undefined
                } as CartTaxRate;
            })
                .filter(tr => typeof tr.rate === "number" || typeof tr.taxAmount === "number")
                .filter(tr => tr.rate || tr.taxAmount); // filtrar taxRates sin info útil
            if (cartTaxRates.length) {
                cartLine.taxRates = cartTaxRates;
            }
        }

        lineItemsInput.push(cartLine);
    }

    return { cartLineItem: lineItemsInput,  subtotal };
}

function calculateOrderLevelDiscounts(order: Order, subtotal: number): number {
    // Subtotal de la orden antes de descuentos (en centavos)
    const orderSubtotalBeforeDiscounts = subtotal;    
   var orderDiscounts = calculateTaxes(orderSubtotalBeforeDiscounts, order.discounts);

    let orderSubtotalAfterDiscounts = orderSubtotalBeforeDiscounts - orderDiscounts.percentTotal - orderDiscounts.numericTotal;
    if (orderSubtotalAfterDiscounts < 0) orderSubtotalAfterDiscounts = 0;

    return orderSubtotalAfterDiscounts;
}

function calculateOrderLevelCharges(order: Order, subtotal: number): number {
    // Subtotal de la orden antes de descuentos (en centavos)
    const orderSubtotalBeforeCharges = subtotal;
    var orderCharges = calculateTaxes(orderSubtotalBeforeCharges, [...(order.additionalCharges || []), ...(order.serviceCharge ? [order.serviceCharge] : [])  ]);

    let orderSubtotalAfterCharges = orderSubtotalBeforeCharges + orderCharges.percentTotal + orderCharges.numericTotal;
    return orderSubtotalAfterCharges;
}


/**
 * Convierte un `Order` a `HostedCheckoutCreateInput` aplicando cálculos básicos
 * de subtotal, impuestos y total. Usa heurísticas para interpretar tasas.
 */
export function orderToHostedCheckout(order: Order, tipAmount = 0): HostedCheckoutCreateInput {
    const { cartLineItem, subtotal } = resumeLineItems(order);

    //Descuentos a nivel de orden.

    let orderSubtotalAfterDiscounts = calculateOrderLevelDiscounts(order, subtotal);

    //Service Charges
    let orderSubtotalAfterCharges = calculateOrderLevelCharges(order, orderSubtotalAfterDiscounts);


    const total = orderSubtotalAfterCharges +  (tipAmount ?? 0);

    const shoppingCart = {
        lineItems: cartLineItem,
        subtotal: subtotal,
        //totalTaxAmount: totalTaxAmount,
        tipAmount: tipAmount,
        total: total,
        //taxSummaries: taxSummaries.length ? taxSummaries : undefined,
    };

    return {
        shoppingCart,
    } as HostedCheckoutCreateInput;
}

export default orderToHostedCheckout;
