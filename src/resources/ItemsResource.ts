import { ApiResource } from "../core/ApiResource.js"
import {
    InventoryItem,
    InventoryItemSchema,
    InventoryItemListResponseSchema
} from "../types/inventory.js"
import { autoPaginate } from "../utils/autoPagination.js"

export class ItemsResource extends ApiResource {

    async create(item: Partial<InventoryItem>): Promise<InventoryItem> {

        const data = await this.post("/items", item)

        return InventoryItemSchema.parse(data)
    }

    async retrieve(itemId: string, expand: string[] = []): Promise<InventoryItem> {

        const data = await this.get(`/items/${itemId}${expand.length > 0 ? `?expand=${expand.join(",")}` : ""}`)

        return InventoryItemSchema.parse(data)
    }

    async update(itemId: string, item: Partial<InventoryItem>): Promise<InventoryItem> {

        const data = await this.post(`/items/${itemId}`, item)

        return InventoryItemSchema.parse(data)
    }

    async list(offset: number = 0, limit: number = 100, expand: string[] = []): Promise<{ elements: InventoryItem[] }> {

        const data = await this.get(
            `/items?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`
        )

        //console.log(JSON.stringify(data, null, 2));

        const parsed = InventoryItemListResponseSchema.parse(data)
        return {
            elements: parsed.elements ?? []
        };
    }

    private buildUrl(filter: Record<string, string[]> = {},offset: number, limit: number, expand: string[] = []) {
        const params = new URLSearchParams();

        params.append('offset', offset.toString());
        params.append('limit', limit.toString());


        if (expand.length > 0) {
            params.append('expand', expand.join(','));
        }

        for (const [key, values] of Object.entries(filter)) {
            if (!values || values.length === 0) continue;

            const cleanValues = values.filter(v => v != null && v !== '');

            if (cleanValues.length === 0) continue;

            if (cleanValues.length === 1) {
                // Caso: un solo valor → filter=key=value
                params.append('filter', `${key}=${cleanValues[0]}`);
            } else {
                // Caso: múltiples valores → filter=key in ('val1','val2',...)
                const quotedValues = cleanValues
                    .map(v => `'${v.replace(/'/g, "''")}'`)   // escapamos comillas simples
                    .join(',');

                params.append('filter', `${key} in (${quotedValues})`);
            }
        }

        const url = `/items?${params.toString()}`;
        return url;
    }

    async listFiltering(
        filter: Record<string, string[]> = {},
        offset: number = 0,
        limit: number = 100,
        expand: string[] = []
    ): Promise<{ elements: InventoryItem[] }> {



        const url = this.buildUrl(filter,offset, limit, expand);
        const data = await this.get(url);
        const parsed = InventoryItemListResponseSchema.parse(data);

        return {
            elements: parsed.elements ?? []
        };
    }

    async *listAutoPaging(limit: number = 100, expand: string[] = []): AsyncGenerator<InventoryItem> {

        yield* autoPaginate<InventoryItem>(
            async (offset, limit) => {

                const data = await this.get(
                    `/items?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`
                )

                const parsed = InventoryItemListResponseSchema.parse(data)
                return {
                    elements: parsed.elements ?? []
                };
            },
            limit
        )
    }

    async *listAutoPagingFiltering(filter: Record<string, string[]> = {},limit: number = 100, expand: string[] = []): AsyncGenerator<InventoryItem> {

        yield* autoPaginate<InventoryItem>(
            async (offset, limit) => {

                const url = this.buildUrl(filter,offset, limit, expand);

                const data = await this.get(url)

                const parsed = InventoryItemListResponseSchema.parse(data)
                return {
                    elements: parsed.elements ?? []
                };
            },
            limit
        )
    }

    async listAll(): Promise<InventoryItem[]> {

        const results: InventoryItem[] = []

        for await (const item of this.listAutoPaging()) {
            results.push(item)
        }

        return results
    }

    async deleteItem(itemId: string): Promise<void> {
        await this.delete(`/items/${itemId}`)
    }
}