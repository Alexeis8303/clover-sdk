// roles.ts
import { z } from "zod";
import { RoleEnum } from "./enums.js";
import { IdRefSchema, IdRefArrayItemSchema, ExpandedResponseSchema, IdRefOptionalSchema } from "./base.js";
import { EmployeeSchema } from "./employee.js";

// ============================================================================
// ROLE SCHEMA
// ============================================================================

/**
 * Schema para el objeto Role de la API de Clover.
 * Representa un rol con permisos asociados a empleados dentro de un merchant.
 */
export const RoleSchema = z.looseObject({
  /** Identificador único del rol */
  id: z.string(),
  
  /** Nombre legible del rol */
  name: z.string(),
  
  /** Tipo de rol del sistema (OWNER, ADMIN, MANAGER, etc.) */
  systemRole: RoleEnum,
  
  /** Referencias a los empleados asignados a este rol */
  employeesRef: ExpandedResponseSchema(EmployeeSchema).optional(),
  
  /** Referencia al merchant al que pertenece este rol */
  merchant: IdRefOptionalSchema.optional(),

  // === URL del recurso ===
  href: z.string().optional()
});

// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

// Respuesta de GET /categories/{id}
export const RoleResponseSchema = RoleSchema;
export type RoleResponse = Role;

// Respuesta de lista (GET /categories)
export const RoleListResponseSchema = z.object({
  elements: z.array(RoleSchema).optional(),
  href: z.string().optional()
});

export type RoleListResponse = z.infer<typeof RoleListResponseSchema>;

// ============================================================================
// SCHEMAS PARA CREACIÓN/ACTUALIZACIÓN (input del usuario)
// ============================================================================

// Campos requeridos para crear un rol
export const RoleCreateInputSchema = RoleSchema.pick({
  name: true,
  systemRole: true,
  employeesRef: true,
  merchant: true,
}).partial().required({ name: true });

export type RoleCreateInput = z.infer<typeof RoleCreateInputSchema>;

// Campos permitidos para actualizar un rol
export const RoleUpdateInputSchema = RoleSchema.pick({
  name: true,
  systemRole: true,
  employeesRef: true,
}).partial();

export type RoleUpdateInput = z.infer<typeof RoleUpdateInputSchema>;

// ============================================================================
// TYPE EXPORT
// ============================================================================

export type Role = z.infer<typeof RoleSchema>;