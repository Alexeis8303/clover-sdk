// src/schemas/clover/modifierGroup.ts
import { z } from "zod";
import { 
  ExpandedResponseSchema,
  IdRefArrayItemSchema 
} from "./base";
import { 
  ModifierSchema 
} from "./modifier";

// ============================================================================
// SCHEMA PRINCIPAL: ModifierGroup
// ============================================================================

export const ModifierGroupSchema = z.object({
  // === Identificación ===
  id: z.string().optional(),
  
  // === Nombres ===
  name: z.string().optional(),
  alternateName: z.string().optional().nullable(),
  
  // === Configuración de modificadores ===
  minRequired: z.number().int().optional().nullable(),
  maxAllowed: z.number().int().optional().nullable(),
  showByDefault: z.boolean().optional().default(true),
  
  // === Modificadores asociados (anidados) ===
  modifiers: ExpandedResponseSchema(ModifierSchema).optional(),
  
  // === IDs de modificadores (read-only, comma-separated) ===
  modifierIds: z.string().optional(),
  
  // === Items asociados (referencias simples) ===
  items: ExpandedResponseSchema(IdRefArrayItemSchema).optional(),
  
  // === Ordenamiento ===
  sortOrder: z.number().int().optional()  
});


// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

// Respuesta de GET /modifier_groups/{id}
export const ModifierGroupResponseSchema = ModifierGroupSchema;

// Respuesta de lista (GET /modifier_groups)
export const ModifierGroupListResponseSchema = z.object({
  elements: z.array(ModifierGroupSchema).optional(),
  href: z.string().optional()
});

// ============================================================================
// SCHEMAS PARA CREACIÓN/ACTUALIZACIÓN (input del usuario)
// ============================================================================

// Campos requeridos para crear un modifier group
export const ModifierGroupCreateInputSchema = ModifierGroupSchema.pick({
  name: true,
  alternateName: true,
  minRequired: true,
  maxAllowed: true,
  showByDefault: true,
  modifiers: true,
  items: true,
  sortOrder: true
}).partial().required({ name: true });



// Campos permitidos para actualizar un modifier group
export const ModifierGroupUpdateInputSchema = ModifierGroupSchema.pick({
  name: true,
  alternateName: true,
  minRequired: true,
  maxAllowed: true,
  showByDefault: true,
  modifiers: true,
  items: true,
  sortOrder: true
}).partial();

export type ModifierGroup = z.infer<typeof ModifierGroupSchema>;
export type ModifierGroupResponse = ModifierGroup;
export type ModifierGroupListResponse = z.infer<typeof ModifierGroupListResponseSchema>;
export type ModifierGroupCreateInput = z.infer<typeof ModifierGroupCreateInputSchema>;
export type ModifierGroupUpdateInput = z.infer<typeof ModifierGroupUpdateInputSchema>;