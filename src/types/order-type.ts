import { z } from "zod";
import { IdRefSchema, MoneySchema, AmountSchema } from "./base";
import { HoursAvailableEnum, CustomerIdMethodEnum} from "./enums";

export const HoursDaySchema = z.looseObject({
  start: z.number().int(),
  end: z.number().int(),
});

export const HoursSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string().nullable().optional(),
  reference: IdRefSchema,
  sunday: z.array(HoursDaySchema).optional(),
  monday: z.array(HoursDaySchema).optional(),
  tuesday: z.array(HoursDaySchema).optional(),
  wednesday: z.array(HoursDaySchema).optional(),
  thursday: z.array(HoursDaySchema).optional(),
  friday: z.array(HoursDaySchema).optional(),
  saturday: z.array(HoursDaySchema).optional(),
});

export const OrderTypeSchema = z.looseObject({
  id: z.string().optional(),
  labelKey: z.string().nullable().optional(),
  label: z.string().nullable().optional(),
  taxable: z.boolean().optional().default(false),
  isDefault: z.boolean().optional().default(false),
  filterCategories: z.boolean().optional().default(false),
  isHidden: z.boolean().optional().default(false),
  fee: MoneySchema.optional(),
  minOrderAmount: MoneySchema.optional(),
  maxOrderAmount: MoneySchema.optional(),
  maxRadius: z.number().int().nullable().optional(),
  avgOrderTime: z.number().int().nullable().optional(),
  hoursAvailable: HoursAvailableEnum.optional(),
  customerIdMethod: CustomerIdMethodEnum.optional(),
  isDeleted: z.boolean().optional().default(false),
  systemOrderTypeId: z.string().nullable().optional(),
  hours: HoursSchema.optional(),
  categories: z.array(IdRefSchema).optional(),
});

// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

export const OrderTypeListResponseSchema = z.looseObject({
  elements: z.array(OrderTypeSchema).optional(),
  href: z.string().optional()
});
export type OrderTypeListResponse = z.infer<typeof OrderTypeListResponseSchema>;

export const LineItemPaymentSchema = z.looseObject({
  id: z.string(),
  percentage: AmountSchema.optional(),
  binName: z.string().optional(),
  refunded: z.boolean().optional(),
  revenueAmount: AmountSchema.optional(),
  quantitySold: z.number().optional(),
});

export type HoursDay = z.infer<typeof HoursDaySchema>;
export type Hours = z.infer<typeof HoursSchema>;
export type OrderType = z.infer<typeof OrderTypeSchema>;
export type LineItemPayment = z.infer<typeof LineItemPaymentSchema>;