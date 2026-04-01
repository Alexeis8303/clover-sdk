import { ApiResource } from "../core/ApiResource"
import { LineItem, LineItemListResponseSchema, LineItemSchema } from "../types/lineitem"
import { AtomicOrderCreateInput, Order, OrderListResponseSchema, OrderSchema } from "../types/order"
import { OrderType, OrderTypeListResponseSchema, OrderTypeSchema } from "../types/order-type"
import { autoPaginate } from "../utils/autoPagination"

export class OrdersResource extends ApiResource {

  async create(order: Partial<Order>): Promise<Order> {
    const data = await this.post("/orders", order)
    return OrderSchema.parse(data)

  }

   async createAtomic(order: AtomicOrderCreateInput): Promise<Order> {
    const data = await this.post("/atomic_order/orders", order)
    return OrderSchema.parse(data)

  }

  async createAtomicCheckout (order: AtomicOrderCreateInput): Promise<Order> {
    const data = await this.post("/atomic_order/checkouts", order)
    return OrderSchema.parse(data)

  }

  async retrieve(orderId: string, expand: string[] = []): Promise<Order> {
    const data = await this.get(`/orders/${orderId}${expand.length > 0 ? `?expand=${expand.join(",")}` : ""}`)

    return OrderSchema.parse(data)
  }

  async list(offset: number = 0, limit: number = 100, expand: string[] = []): Promise<{ elements: Order[] }> {
    const data = await this.get(`/orders?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`)

    const parsed = OrderListResponseSchema.parse(data);

    return {
      elements: parsed.elements ?? []
    };
  }

  async *listAutoPaging(limit: number = 100, expand: string[] = []): AsyncGenerator<Order> {

    yield* autoPaginate<Order>(
      async (offset, limit) => {
        const data = await this.get(`/orders?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`)

        const parsed = OrderListResponseSchema.parse(data)

        return {
          elements: parsed.elements ?? []
        };
      }
      ,
      limit
    )

  }

  async listAll(): Promise<Order[]> {

    const results: Order[] = []

    for await (const order of this.listAutoPaging()) {
      results.push(order)
    }

    return results
  }

  // ============================================================
  // Line Items
  // ============================================================

  async listLineItems(orderId: string, offset: number = 0, limit: number = 100, expand: string[] = []): Promise<{ elements: LineItem[] }> {

    const data = await this.get(
      `/orders/${orderId}/line_items?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`
    )

    const parsed = LineItemListResponseSchema.parse(data)

    return {
      elements: parsed.elements ?? []
    }
  }

  async *listLineItemsAutoPaging(orderId: string, limit: number = 100, expand: string[] = []): AsyncGenerator<LineItem> {

    yield* autoPaginate<LineItem>(
      async (offset, limit) => {
        const data = await this.get(
          `/orders/${orderId}/line_items?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`
        )

        const parsed = LineItemListResponseSchema.parse(data)

        return {
          elements: parsed.elements ?? []
        }
      },
      limit
    )
  }

  async addLineItem(orderId: string, payload: {
    itemId?: string
    name?: string
    price?: number
    quantity?: number
  }
  ): Promise<LineItem> {

    if (!payload.itemId && !(payload.name && payload.price)) {
      throw new Error(
        "Must provide either itemId or (name + price)"
      )
    }

    const body =
      payload.itemId
        ? {
          item: { id: payload.itemId },
          unitQty: payload.quantity ?? 1
        }
        : {
          name: payload.name,
          price: payload.price,
          unitQty: payload.quantity ?? 1
        }

    const data = await this.post(
      `/orders/${orderId}/line_items`,
      body
    )

    return LineItemSchema.parse(data)
  }

}