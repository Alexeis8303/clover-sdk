import { Clover } from "./Clover";
import { LineItem } from "./types/lineitem";
import { AtomicOrderCreateInput } from "./types/order";
import { HostedCheckoutCreateInput } from "./types/shoppingCart";
import orderToHostedCheckout from "./utils/orderToHostedCheckout";

export const pickRandomItems = <T>(arr: T[], n: number): T[] => {
  // Return the entire array if n is greater than or equal to the array length
  if (n >= arr.length) {
    return [...arr];
  }

  // Create a shallow copy of the array to avoid modifying the original
  const shuffled = [...arr];

  // Fisher-Yates Shuffle algorithm for efficient in-place shuffling of the copy
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first n elements of the shuffled array
  return shuffled.slice(0, n);
};


const clover = new Clover({
  merchantId: "****",
  accessToken: "****",
  environment: "sandbox",
  hostedCheckoutPrivateKey: "****"
});

/*const categories = await clover.categories.list(0, 1, ["items"]);
console.log(JSON.stringify(categories, null, 2));*/


/*const modifiersGroups = await clover.modifierGroups.list(0, 1, ["items","modifiers"]);
console.log(JSON.stringify(modifiersGroups, null, 2));*/

/*const modifiers = await clover.modifiers.list("N9XSCZSQXW02G", 0, 1, ["modifierGroup"]);
console.log(JSON.stringify(modifiers, null, 2));*/

/*const orders = await clover.orders.create({
    taxRemoved: true,
    note: "Test order",
    title: "Test order 2",
    state: "open",
    testMode: true,
    manualTransaction: true,
    groupLineItems: true
});

const order = await clover.orders.retrieve(orders.id);
console.log(JSON.stringify(order, null, 2));*/

//const merchant = await clover.merchants.retrieve().then(merchant => clover.merchants.listOrderType(0, 100, ["hours"])) ;
/*const merchant = await clover.merchants.retrieve(["employees", "bankProcessing", "externalMerchant", "merchantBoarding", "merchantL3Prerequisite", "deviceBoarding", "programExpress", "hierarchy",
  "shifts", "orders", "address", "logos", "owner", "items", "tags", "tenders", "payments", "gateway", "printers",
  "modifierGroups", "properties", "tipSuggestions", "openingHours", "partnerApp", "selfBoardingApplication", "enterprises", "equipment", "equipmentSummary"]);*/

/*const merchant = await clover.merchants.retrieve(["employees"]); 
merchant.employees?.elements?.forEach(employee => {
  console.log("Employee:", employee.id, " - ", employee.name)
}) */

//const merchant = await clover.merchants.retrieve();
//console.log(JSON.stringify(merchant, null, 2));

/*const employees = await clover.merchants.listEmployees();

console.log(JSON.stringify(employees, null, 2));*/

/*for await (const employee of clover.merchants.listEmployeesAutoPaging(100, ["roles"])) {
  console.log("Employee:", employee.id, " - ", employee.name) 
  console.log("Orders:", employee.orders)
  console.log("Roles:", employee.roles)
}*/

/*const employee = await clover.merchants.retrieveEmployee("QQAYQB72P2X7M", ["roles"]);
console.log(JSON.stringify(employee, null, 2));*/

/*const role = await clover.merchants.listRoles(0, 100, ["employees"]);
console.log(JSON.stringify(role, null, 2));*/


const items = await clover.items.list(0, 100, ["modifierGroups", "categories"]);
const selectedItems = pickRandomItems(items.elements, 3);
const orderInput: AtomicOrderCreateInput = {
  orderCart: {
    currency: "USD",
    title: "Test order API",
    note: "Order created for testing purposes",
    lineItems: await Promise.all(selectedItems.map(async item => {
      const selectedModifiers = await Promise.all(pickRandomItems(item.modifierGroups || [], 2)
        .map(async modifier => {
          const expandedModifier = await clover.modifierGroups.retrieve(modifier.id as string, ["modifiers"]);
          const selectedModifier = pickRandomItems(expandedModifier.modifiers || [], 1)[0];
          return {
            id: selectedModifier.id,
            name: selectedModifier.name,
            alternateName: selectedModifier?.alternateName,
            amount: selectedModifier?.price,
            modifier: { id: selectedModifier.id, name: selectedModifier.name }
          }
        }));
      return ({ item: { id: item.id }, name: item.name, price: item.price, unitQty: 1, modifications: selectedModifiers } as LineItem)
    }))
  }
}

console.log("-------------------Order Input:-------------------");
console.log(JSON.stringify(orderInput, null, 2));

const order = await clover.orders.createAtomic(orderInput);

console.log("-------------------Created Order:-------------------");
console.log(JSON.stringify(order, null, 2));


const checkoutInput = orderToHostedCheckout(order)
checkoutInput.customer ={
    firstName: "Alexeis",
    lastName: "Martinez",
    //email: "maria.gonzalez@email.com",
    //phoneNumber: "+5215512345678",
  } 
  
  checkoutInput.redirectUrls = {
    success: "https://localhost:3000?sucess",   
    cancel: "https://localhost:3000?cancel",   
    // failure: "https://tudominio.com/pago-fallido"  
  }
  
console.log("-------------------Checkout Input:-------------------");
console.log(JSON.stringify(checkoutInput, null, 2));
const link = await clover.hostedCheckout.create(checkoutInput);
console.log(JSON.stringify(link, null, 2));