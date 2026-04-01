import { z } from "zod";
import {
  // Base schemas
  AddressSchema,
  AmountSchema,
  PercentageDecimalSchema
} from "./base";

// ============================================================================
// CUSTOMER SCHEMAS (Para Hosted Checkout)
// ============================================================================


export const CheckoutCustomerMetaDataSchema = z.looseObject({
  businessName: z.string().optional(),
});


export const CheckoutCustomerSchema = z.looseObject({
  id: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email().optional(),
  phoneNumber: z.string().optional(),
  address: AddressSchema.optional(),
  customerMetaData: CheckoutCustomerMetaDataSchema.optional(),
});


// ============================================================================
// REDIRECT URLs SCHEMA
// ============================================================================

export const RedirectUrlsSchema = z.looseObject({
  success: z.url().optional(),
  failure: z.url().optional(),
  cancel: z.url().optional(),
});


// ============================================================================
// SHOPPING CART SCHEMAS
// ============================================================================

// TaxRate para line items
export const CartTaxRateSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string().optional(),
  rate: PercentageDecimalSchema.optional(), // 100% = 1e7
  taxAmount: AmountSchema.optional(), // en centavos
});


// LineItem del carrito
export const CartLineItemSchema = z.looseObject({
  itemRefUuid: z.string().uuid().optional(), // UUID del item en inventario
  name: z.string(), // required según documentación
  note: z.string().optional(),
  price: AmountSchema, // required, en centavos
  unitQty: z.number().int(), // required, factor de escala 1000 (ej: 1000 = 1.0 unidad)
  taxRates: z.array(CartTaxRateSchema).optional(),
});


// TaxSummary para resumen de impuestos
export const CartTaxSummarySchema = z.looseObject({
  id: z.string().optional(),
  name: z.string().optional(),
  rate: PercentageDecimalSchema.optional(), // 100% = 1e7
  amount: AmountSchema.optional(), // en centavos
});


// ShoppingCart principal
export const ShoppingCartSchema = z.looseObject({
  lineItems: z.array(CartLineItemSchema), // required, al menos 1 item
  total: AmountSchema.optional(), // total con impuestos y propina
  subtotal: AmountSchema.optional(), // subtotal antes de impuestos
  totalTaxAmount: AmountSchema.optional(), // total de impuestos
  tipAmount: AmountSchema.optional(), // propina
  taxSummaries: z.array(CartTaxSummarySchema).optional(),
});


// ============================================================================
// HOSTED CHECKOUT MAIN SCHEMA
// ============================================================================

export const HostedCheckoutSchema = z.looseObject({
  // === Cliente ===
  customer: CheckoutCustomerSchema.optional(),

  // === URLs de redirección ===
  redirectUrls: RedirectUrlsSchema.optional(),

  // === Carrito de compras ===
  shoppingCart: ShoppingCartSchema, // required según documentación
});


// ============================================================================
// SCHEMAS PARA CREACIÓN (input del usuario)
// ============================================================================

// Schema mínimo requerido para crear un hosted checkout
export const HostedCheckoutCreateInputSchema = z.looseObject({
  customer: CheckoutCustomerSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    address: true,
    customerMetaData: true,
  }).optional(),
  redirectUrls: RedirectUrlsSchema.optional(),
  shoppingCart: z.object({
    lineItems: z.array(CartLineItemSchema.pick({
      itemRefUuid: true,
      name: true,
      note: true,
      price: true,
      unitQty: true,
      taxRates: true,
    }).partial().required({ name: true, price: true, unitQty: true })),
    total: AmountSchema.optional(),
    subtotal: AmountSchema.optional(),
    totalTaxAmount: AmountSchema.optional(),
    tipAmount: AmountSchema.optional(),
    taxSummaries: z.array(CartTaxSummarySchema).optional(),
  }),
});



// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

// Respuesta exitosa de POST /checkouts
export const HostedCheckoutResponseSchema = z.looseObject({
  checkoutSessionId: z.string(),

  expirationTime: z.iso.datetime().optional(), 
  createdTime: z.iso.datetime().optional(), 
  deletedTime: z.iso.datetime().optional(),
  
  href: z.url().optional(), 
});

// ============================================================================
// TYPE EXPORTS (ALL)
// ============================================================================
export type CheckoutCustomerMetaData = z.infer<typeof CheckoutCustomerMetaDataSchema>;
export type CheckoutCustomer = z.infer<typeof CheckoutCustomerSchema>;
export type RedirectUrls = z.infer<typeof RedirectUrlsSchema>;
export type CartTaxRate = z.infer<typeof CartTaxRateSchema>;
export type CartLineItem = z.infer<typeof CartLineItemSchema>;
export type CartTaxSummary = z.infer<typeof CartTaxSummarySchema>;
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>;
export type HostedCheckout = z.infer<typeof HostedCheckoutSchema>;
export type HostedCheckoutCreateInput = z.infer<typeof HostedCheckoutCreateInputSchema>;
export type HostedCheckoutResponse = z.infer<typeof HostedCheckoutResponseSchema>;
