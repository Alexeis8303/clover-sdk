import { ApiResource } from "../core/ApiResource.js"
import { Payment, PaymentSchema, PaymentListResponseSchema } from "../types/payment.js"
import { autoPaginate } from "../utils/autoPagination.js"

export class PaymentsResource extends ApiResource {    

    async retrieve(payId: string, expand:string[] = []): Promise<Payment> {

        const data = await this.get(`/payments/${payId}${expand.length > 0 ? `?expand=${expand.join(",")}` : ""}`)

        return PaymentSchema.parse(data)
    }


    async list(offset: number = 0, limit: number = 100, expand:string[] = []): Promise<{ elements: Payment[] }> {

        const data = await this.get(
            `/payments?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`
        )

        const parsed = PaymentListResponseSchema.parse(data)
        return {
            elements: parsed.elements ?? []
        };
    }    

    async *listAutoPaging(limit: number = 100, expand:string[] = []): AsyncGenerator<Payment> {

        yield* autoPaginate<Payment>(
            async (offset, limit) => {

                const data = await this.get(
                    `/payments?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`
                )

                const parsed = PaymentListResponseSchema.parse(data)
                return {
                    elements: parsed.elements ?? []
                };
            },
            limit
        )
    }

    async listAll(): Promise<Payment[]> {

        const results: Payment[] = []

        for await (const group of this.listAutoPaging()) {
            results.push(group)
        }

        return results
    }
}