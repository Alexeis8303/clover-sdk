import { z } from "zod";
import { AddressSchema, EmailAddressSchema, IdRefSchema, PhoneNumberSchema, TimestampSchema } from "./base";
import { CardTypeEnum } from "./enums";


// ============================================================================
// CARD DETAILS
// ============================================================================

export const VaultedCardSchema = z.looseObject({
  first6: z.string().length(6),
  last4: z.string().length(4),
  cardholderName: z.string().optional(),
  expirationDate: z.string().optional(),
  token: z.string().max(72).optional()
});

export const CardAdditionalInfoSchema = z.looseObject({
  default: z.string().optional(),
  cardType: CardTypeEnum.optional(),
  token: z.string().max(72).optional(),
  tokenType: z.enum(["MULTIPAY", "FINANCIAL", "CTOKEN"]).optional(),
  modifiedTime: TimestampSchema.optional()
});

export const CardSchema = z.looseObject({
  id: z.string().optional(),
  first6: z.string().optional(),
  last4: z.string().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  expirationDate: z.string().nullable().optional(),
  additionalInfo: CardAdditionalInfoSchema.optional(),
  cardType: CardTypeEnum.optional(),
  token: z.string().nullable().optional(),
  tokenType: z.enum(["MULTIPAY", "FINANCIAL", "CTOKEN"]).optional(),
  modifiedTime: TimestampSchema,
  customer: IdRefSchema,
});

// ============================================================================
// CUSTOMER METADATA
// ============================================================================

export const CustomerMetadataSchema = z.looseObject({
  businessName: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  dobYear: z.number().int().nullable().optional(),
  dobMonth: z.number().int().nullable().optional(),
  dobDay: z.number().int().nullable().optional(),
  modifiedTime: TimestampSchema,
  customer: IdRefSchema,
});

// ============================================================================
// CUSTOMER MAIN SCHEMA
// ============================================================================

export const CustomerSchema = z.looseObject({
  id: z.string().optional(),
  merchant: IdRefSchema,
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  marketingAllowed: z.boolean().optional(),
  customerSince: TimestampSchema,
  orders: z.array(IdRefSchema).optional(),
  addresses: z.array(AddressSchema).optional(),
  emailAddresses: z.array(EmailAddressSchema).optional(),
  phoneNumbers: z.array(PhoneNumberSchema).optional(),
  cards: z.array(CardSchema).optional(),
  metadata: CustomerMetadataSchema.optional(),
  modifiedTime: TimestampSchema.optional()
});

export type VaultedCard = z.infer<typeof VaultedCardSchema>;
export type CardAdditionalInfo = z.infer<typeof CardAdditionalInfoSchema>;
export type Card = z.infer<typeof CardSchema>;
export type CustomerMetadata = z.infer<typeof CustomerMetadataSchema>;
export type Customer = z.infer<typeof CustomerSchema>;