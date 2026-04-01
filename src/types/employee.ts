// src/schemas/clover/employee.ts
import { z } from "zod";
import {
  // Base schemas
  IdRefSchema,
  IdRefArrayItemSchema,
  TimestampSchema,
  Href,
  HrefSchema,
  ExpandedResponseSchema,
} from "./base";
import {
  // Enums
  RoleEnum,
} from "./enums";

// ============================================================================
// EMPLOYEE MAIN SCHEMA
// ============================================================================

export const EmployeeSchema = z.looseObject({
  // === Identificación ===
  id: z.string().optional(),

  // === Información personal ===
  name: z.string().optional(),
  nickname: z.string().optional(),
  customId: z.string().optional(),
  email: z.string().email().optional(),

  // === Estado ===
  inviteSent: z.boolean().optional(),
  isOwner: z.boolean().optional(),

  // === Timestamps ===
  claimedTime: TimestampSchema.optional(),
  deletedTime: TimestampSchema.optional(),

  // === Seguridad ===
  pin: z.string().optional(),
  unhashedPin: z.string().optional(),

  // === Roles ===
  role: RoleEnum.optional(),
  roles: ExpandedResponseSchema(IdRefSchema).optional(),

  // === Referencias relacionadas (arrays de IDs) ===
  shifts: ExpandedResponseSchema(IdRefArrayItemSchema).optional(),
  payments: ExpandedResponseSchema(IdRefArrayItemSchema).optional(),
  orders: HrefSchema.optional(),
  employeeCards: z.array(IdRefArrayItemSchema).optional(),

  // === Referencia al merchant ===
  merchant: IdRefSchema.optional(),

  // === URL del recurso ===
  href: z.string().optional()
});


// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

// Respuesta de GET /employees/{eId}
export const EmployeeResponseSchema = EmployeeSchema;
export type EmployeeResponse = Employee;

// Respuesta de lista (GET /employees)
export const EmployeeListResponseSchema = z.object({
  elements: z.array(EmployeeSchema).optional(),
  href: z.string().optional()
});

// ============================================================================
// SCHEMAS PARA CREACIÓN/ACTUALIZACIÓN (input del usuario)
// ============================================================================

// Campos requeridos para crear un employee
export const EmployeeCreateInputSchema = EmployeeSchema.pick({
  name: true,
  nickname: true,
  customId: true,
  email: true,
  role: true,
  isOwner: true,
}).partial().required({ name: true });

export type EmployeeCreateInput = z.infer<typeof EmployeeCreateInputSchema>;

// Campos permitidos para actualizar un employee
export const EmployeeUpdateInputSchema = EmployeeSchema.pick({
  name: true,
  nickname: true,
  customId: true,
  email: true,
  inviteSent: true,
  role: true,
  roles: true,
}).partial();

export type EmployeeUpdateInput = z.infer<typeof EmployeeUpdateInputSchema>;

// ============================================================================
// TYPE EXPORTS (ALL)
// ============================================================================
export type Employee = z.infer<typeof EmployeeSchema>;