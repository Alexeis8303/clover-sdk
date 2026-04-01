import { ApiResource } from "../core/ApiResource"
import {
    ModifierGroup,
    ModifierGroupSchema,
    ModifierGroupListResponseSchema,
    ModifierGroupCreateInput,
    ModifierGroupUpdateInput
} from "../types/modifierGroup"
import { autoPaginate } from "../utils/autoPagination"

export class ModifierGroupsResource extends ApiResource {

    async create(group: ModifierGroupCreateInput): Promise<ModifierGroup> {

        const data = await this.post("/modifier_groups", group)

        return ModifierGroupSchema.parse(data)
    }

    async retrieve(groupId: string, expand:string[] = []): Promise<ModifierGroup> {

        const data = await this.get(`/modifier_groups/${groupId}${expand.length > 0 ? `?expand=${expand.join(",")}` : ""}`)

        return ModifierGroupSchema.parse(data)
    }

    async update(groupId: string, group: ModifierGroupUpdateInput): Promise<ModifierGroup> {

        const data = await this.post(`/modifier_groups/${groupId}`, group)

        return ModifierGroupSchema.parse(data)
    }

    async list(offset: number = 0, limit: number = 100, expand:string[] = []): Promise<{ elements: ModifierGroup[] }> {

        const data = await this.get(
            `/modifier_groups?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`
        )

        const parsed = ModifierGroupListResponseSchema.parse(data)
        return {
            elements: parsed.elements ?? []
        };
    }

    async *listAutoPaging(limit: number = 100, expand:string[] = []): AsyncGenerator<ModifierGroup> {

        yield* autoPaginate<ModifierGroup>(
            async (offset, limit) => {

                const data = await this.get(
                    `/modifier_groups?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}  `
                )

                const parsed = ModifierGroupListResponseSchema.parse(data)
                return {
                    elements: parsed.elements ?? []
                };
            },
            limit
        )
    }

    async listAll(): Promise<ModifierGroup[]> {

        const results: ModifierGroup[] = []

        for await (const group of this.listAutoPaging()) {
            results.push(group)
        }

        return results
    }

    async deleteModifierGroup(groupId: string): Promise<void> {
        await this.delete(`/modifier_groups/${groupId}`)
    }
}