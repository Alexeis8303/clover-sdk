// src/schemas/clover/modifier.ts
import { z } from "zod";
import { 
  IdRefOptionalSchema 
} from "./base";

// ============================================================================
// SCHEMA PRINCIPAL: Modifier
// (ÚNICO schema - se usa tanto standalone como anidado)
// ============================================================================

export const ModifierSchema = z.object({
  // === Identificación ===
  id: z.string().optional(),
  
  // === Nombres ===
  name: z.string().optional(),
  alternateName: z.string().optional().nullable(),
  
  // === Estado ===
  available: z.boolean().optional().default(true),
  
  // === Precio (costo adicional en centavos) ===
  price: z.number().int().optional().default(0),
  
  // === Referencia al grupo de modificadores ===
  modifierGroup: IdRefOptionalSchema.optional()
});



// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

export const ModifierResponseSchema = ModifierSchema;


export const ModifierListResponseSchema = z.object({
  elements: z.array(ModifierSchema).optional(),
  href: z.string().optional()
});


// ============================================================================
// SCHEMAS PARA CREACIÓN/ACTUALIZACIÓN
// ============================================================================

export const ModifierCreateInputSchema = ModifierSchema.pick({
  name: true,
  alternateName: true,
  available: true,
  price: true,
  modifierGroup: true
}).partial().required({ name: true });

export const ModifierUpdateInputSchema = ModifierSchema.pick({
  name: true,
  alternateName: true,
  available: true,
  price: true
}).partial();

export type Modifier = z.infer<typeof ModifierSchema>;
export type ModifierResponse = Modifier;
export type ModifierListResponse = z.infer<typeof ModifierListResponseSchema>;
export type ModifierCreateInput = z.infer<typeof ModifierCreateInputSchema>;
export type ModifierUpdateInput = z.infer<typeof ModifierUpdateInputSchema>;