// src/schemas/clover/category.ts
import { z } from "zod";
import { 
  HexColorSchema, 
  TimestampSchema, 
  IdRefOptionalSchema, 
  IdRefArrayItemSchema, 
  ExpandedResponseSchema
} from "./base";

// ============================================================================
// SCHEMA PRINCIPAL: Category
// ============================================================================

export const CategorySchema = z.object({
  // === Identificación ===
  id: z.string().optional(),
  
  // === Nombre (REQUIRED según documentación) ===
  name: z.string(),
  
  // === Ordenamiento ===
  sortOrder: z.number().int().optional(),
  
  // === Items asociados (referencias) ===
  items: ExpandedResponseSchema(IdRefArrayItemSchema).optional(),
  
  // === UI/Visual ===
  colorCode: HexColorSchema.optional(),
  
  // === Estado ===
  deleted: z.boolean().optional(),
  
  // === Metadatos ===
  modifiedTime: TimestampSchema,
  
  // === Referencia canónica ===
  canonical: IdRefOptionalSchema.optional()
});

// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

// Respuesta de GET /categories/{id}
export const CategoryResponseSchema = CategorySchema;
export type CategoryResponse = Category;

// Respuesta de lista (GET /categories)
export const CategoryListResponseSchema = z.object({
  elements: z.array(CategorySchema).optional(),
  href: z.string().optional()
});

// ============================================================================
// SCHEMA PARA CREACIÓN/ACTUALIZACIÓN (input del usuario)
// ============================================================================

// Campos requeridos para crear una categoría
export const CategoryCreateInputSchema = CategorySchema.pick({
  name: true,
  sortOrder: true,
  colorCode: true,
  items: true,
  canonical: true
}).partial().required({ name: true });

// Campos permitidos para actualizar una categoría
export const CategoryUpdateInputSchema = CategorySchema.pick({
  name: true,
  sortOrder: true,
  colorCode: true,
  items: true,
  canonical: true,
  deleted: true
}).partial();

export type Category = z.infer<typeof CategorySchema>;
export type CategoryListResponse = z.infer<typeof CategoryListResponseSchema>;
export type CategoryCreateInput = z.infer<typeof CategoryCreateInputSchema>;
export type CategoryUpdateInput = z.infer<typeof CategoryUpdateInputSchema>;