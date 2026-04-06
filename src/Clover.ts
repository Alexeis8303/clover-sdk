import { RequestSender } from "./core/RequestSender.js"
import { OrdersResource } from "./resources/OrdersResource.js"
import { CategoriesResource } from "./resources/CategoriesResource.js"
import { ItemsResource } from "./resources/ItemsResource.js"
import { ModifierGroupsResource } from "./resources/ModifierGroupsResource.js"
import { ModifiersResource } from "./resources/ModifiersResource.js"
import { MerchantsResource } from "./resources/MerchantResource.js"
import { HostedCheckoutResource } from "./resources/HostedCheckoutResource.js"

export interface CloverOptions {
  merchantId: string
  accessToken: string
  environment?: "sandbox" | "production"

   maxRetries?: number

   hostedCheckoutPrivateKey?: string
}

export class Clover {

  public orders: OrdersResource;
  public categories: CategoriesResource;
  public items: ItemsResource;
  public modifierGroups: ModifierGroupsResource;
  public modifiers: ModifiersResource;
  public merchants: MerchantsResource;
  public hostedCheckout: HostedCheckoutResource;

  constructor(options: CloverOptions) {

    const baseUrl =
      options.environment === "production"
        ? "https://api.clover.com"
        : "https://apisandbox.dev.clover.com"

    const requestSender = new RequestSender({
      baseUrl,
      merchantId: options.merchantId,
      accessToken: options.accessToken,
      maxRetries: options.maxRetries,
      hostedCheckoutPrivateKey: options.hostedCheckoutPrivateKey
    })

    this.orders = new OrdersResource(requestSender)
    this.categories = new CategoriesResource(requestSender)
    this.items = new ItemsResource(requestSender)
    this.modifierGroups = new ModifierGroupsResource(requestSender)
    this.modifiers = new ModifiersResource(requestSender)
    this.merchants = new MerchantsResource(requestSender)
    this.hostedCheckout = new HostedCheckoutResource(requestSender);
  }
}