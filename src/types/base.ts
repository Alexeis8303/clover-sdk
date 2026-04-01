import { z } from "zod";

export function ExpandedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z
    .union([
      // Caso 1: objeto paginado con "elements"
      z.object({
        elements: z.array(itemSchema).default([]),
      }),

      // Caso 2: array directo
      z.array(itemSchema),
    ])
    .transform((val) => {
      // Normalizar a array en ambos casos
      if (Array.isArray(val)) {
        return val;
      }
      return val.elements;
    });
}
export const IdRefSchema = z.object({ id: z.string() }).nullable().optional();
export const IdRefOptionalSchema = z.object({ id: z.string().optional() }).nullable().optional();

export const HexColorSchema = z.string().regex(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
export const TimestampSchema = z.number().int().nullable().optional(); // int64 ms
export const MoneySchema = z.number().int().nonnegative().nullable().optional()
  .transform((cents) => {
    if (cents == null) return null;
    return Number((cents / 100).toFixed(2));
  });// cents
export const AmountSchema = z.number().int().optional();
export const PercentageDecimalSchema = z.number().int().describe("Percent times 10000, e.g., 12.5% = 125000");
export const LocaleSchema = z.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/).optional();
export const GenericAttributesSchema = z.record(z.string(), z.unknown()).optional();
export const GenericExtraSchema = z.record(z.string(), z.unknown()).optional();
export const CommaSeparatedIdsSchema = z.string().transform((val) => val ? val.split(",").map((id) => id.trim()) : []).pipe(z.array(z.string())).optional();
export const DeprecatedFieldSchema = z.unknown().describe("Deprecated field - use alternative");
export const IdRefArrayItemSchema = z.object({ id: z.string().optional() });

export const HrefSchema = z.object({ href: z.string().optional() });

// ============================================================================
// ADDRESS & CONTACT
// ============================================================================

export const AddressSchema = z.looseObject({
  address1: z.string().nullable().optional(),
  address2: z.string().nullable().optional(),
  address3: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),
});

export const EmailAddressSchema = z.looseObject({
  id: z.string().optional(),
  emailAddress: z.string().optional(),
  verifiedTime: TimestampSchema,
  primaryEmail: z.boolean().optional(),
  customer: IdRefSchema,
});

export const PhoneNumberSchema = z.looseObject({
  id: z.string().optional(),
  phoneNumber: z.string().optional(),
  customer: IdRefSchema,
});

export type IdRef = z.infer<typeof IdRefSchema>;
export type Href = z.infer<typeof HrefSchema>;
export type HexColor = z.infer<typeof HexColorSchema>;
export type Timestamp = z.infer<typeof TimestampSchema>;
export type Money = z.infer<typeof MoneySchema>;
export type Amount = z.infer<typeof AmountSchema>;
export type Attributes = z.infer<typeof GenericAttributesSchema>;
export type CommaSeparatedIds = z.infer<typeof CommaSeparatedIdsSchema>;
export type IdRefOptional = z.infer<typeof IdRefOptionalSchema>;
export type IdRefArrayItem = z.infer<typeof IdRefArrayItemSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type EmailAddress = z.infer<typeof EmailAddressSchema>;
export type PhoneNumber = z.infer<typeof PhoneNumberSchema>;