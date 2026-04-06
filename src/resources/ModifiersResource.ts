import { ApiResource } from "../core/ApiResource.js"
import {
    Modifier,
    ModifierSchema,
    ModifierListResponseSchema,
    ModifierCreateInput,
    ModifierUpdateInput
} from "../types/modifier.js"
import { autoPaginate } from "../utils/autoPagination.js"

export class ModifiersResource extends ApiResource {

    async create( groupId: string, modifier: ModifierCreateInput): Promise<Modifier> {

        const data = await this.post(
            `/modifier_groups/${groupId}/modifiers`,
            modifier
        )

        return ModifierSchema.parse(data)
    }

    async retrieve(groupId: string, modifierId: string, expand:string[] = []): Promise<Modifier> {

        const data = await this.get(
            `/modifier_groups/${groupId}/modifiers/${modifierId}${expand.length > 0 ? `?expand=${expand.join(",")}` : ""}`
        )

        return ModifierSchema.parse(data)
    }

    async update(groupId: string, modifierId: string, modifier: ModifierUpdateInput): Promise<Modifier> {

        const data = await this.post(
            `/modifier_groups/${groupId}/modifiers/${modifierId}`,
            modifier
        )

        return ModifierSchema.parse(data)
    }

    async list(groupId: string, offset: number = 0, limit: number = 100, expand:string[] = []): Promise<{ elements: Modifier[] }> {

        const data = await this.get(
            `/modifier_groups/${groupId}/modifiers?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`
        )

        const parsed = ModifierListResponseSchema.parse(data)
        return {
            elements: parsed.elements ?? []
        };
    }

    async *listAutoPaging( groupId: string, limit: number = 100, expand:string[] = [] ): AsyncGenerator<Modifier> {

        yield* autoPaginate<Modifier>(
            async (offset, limit) => {

                const data = await this.get(
                    `/modifier_groups/${groupId}/modifiers?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`
                )

                const parsed = ModifierListResponseSchema.parse(data)
                return {
                    elements: parsed.elements ?? []
                };
            },
            limit
        )
    }

    async listAll(groupId: string): Promise<Modifier[]> {

        const results: Modifier[] = []

        for await (const modifier of this.listAutoPaging(groupId)) {
            results.push(modifier)
        }

        return results
    }

    async deleteModifier(groupId: string, modifierId: string): Promise<void> {
        await this.delete(`/modifier_groups/${groupId}/modifiers/${modifierId}`
        )
    }
}