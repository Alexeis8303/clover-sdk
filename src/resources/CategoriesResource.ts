import { ApiResource } from "../core/ApiResource.js"
import {
    Category,
    CategorySchema,
    CategoryListResponseSchema
} from "../types/category.js"

import { autoPaginate } from "../utils/autoPagination.js"

export class CategoriesResource extends ApiResource {

    async create(category: Partial<Category>): Promise<Category> {

        const data = await this.post("/categories", category)

        return CategorySchema.parse(data)
    }

    async retrieve(categoryId: string, expand:string[] = []): Promise<Category> {

        const data = await this.get(`/categories/${categoryId}${expand.length > 0 ? `?expand=${expand.join(",")}` : ""}`)

        return CategorySchema.parse(data)
    }

    async list(offset: number = 0, limit: number = 100, expand:string[] = []): Promise<{ elements: Category[] }> {

        const data = await this.get(
            `/categories?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`
        )

        const parsed = CategoryListResponseSchema.parse(data);

        return {
            elements: parsed.elements ?? []
        };
    }

    async *listAutoPaging(limit: number = 100, expand:string[] = []): AsyncGenerator<Category> {

        yield* autoPaginate<Category>(
            async (offset, limit) => {

                const data = await this.get(
                    `/categories?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`
                )

                const parsed = CategoryListResponseSchema.parse(data)

                return {
                    elements: parsed.elements ?? []
                };
            },
            limit
        )
    }

    async listAll(): Promise<Category[]> {

        const results: Category[] = []

        for await (const category of this.listAutoPaging()) {
            results.push(category)
        }

        return results
    }

    async deleteCategory(categoryId: string): Promise<void> {
        await this.delete(`/categories/${categoryId}`);
    }


}