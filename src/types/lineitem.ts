// src/schemas/clover/lineitem.ts
import { z } from "zod";
import {
  // Base schemas
  IdRefSchema, 
  TimestampSchema, Timestamp,
  AmountSchema, Amount,
  HexColorSchema,
  IdRef,
  ExpandedResponseSchema
} from "./base";
import {
  // Enums
  AgeRestrictedTypeEnum,
  TaxTypeEnum,
  AgeRestrictedType,
  PriceTypeEnum

} from "./enums";

import {LineItemPaymentSchema} from "./order-type"

import type { Refund } from "./refund";
import { RefundSchema } from "./refund";
import { ModifierSchema } from "./modifier";

// ============================================================================
// ITEM & MODIFIER SCHEMAS (Específicos de LineItem)
// ============================================================================

export const ItemSchema = z.looseObject({
  id: z.string(),
  colorCode: HexColorSchema.optional(),
  name: z.string().optional,
  alternateName: z.string().optional(),
  price: AmountSchema.optional(),
  priceType: PriceTypeEnum.optional(),
});

export const ApproverSchema = z.looseObject({
  id: z.string(),
  name: z.string().optional(),
});

export const DiscountSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  amount: AmountSchema,
  percentage: z.number().int().optional(),
  approver: ApproverSchema.optional(),
});

export const LineItemDiscountSchema = z.looseObject({
  id: z.string(),
  discount: IdRefSchema.optional(),
  approver: IdRefSchema.optional(),
  name: z.string(),
  amount: AmountSchema,
  percentage: z.number().int().optional() 
});

export const OrderLevelDiscountSchema = z.looseObject({
  id: z.string(),
  discount: DiscountSchema.optional(),
  approver: IdRefSchema.optional(),
  name: z.string().optional(),
  amount: AmountSchema,
  percentage: z.number().int().optional(),
});

export const ModifierGroupSchema = z.looseObject({
  id: z.string(),
});

export const ModificationSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  alternateName: z.string().optional(),
  amount: AmountSchema.optional(),
  modifier: ModifierSchema.optional(),
  quantitySold: AmountSchema.optional(),
});

export const TagSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  showInReporting: z.boolean().default(false),
  items: z.array(IdRefSchema).optional(),
  printers: z.array(IdRefSchema).optional(),
});

export const ExchangedLineItemSchema = z.looseObject({
  id: z.string(),
});

export const PrintGroupSchema = z.looseObject({
  id: z.string(),
});

// ============================================================================
// TAX SCHEMAS
// ============================================================================

export const TaxRateSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  taxType: TaxTypeEnum.optional(),
  rate: AmountSchema.optional(),
  isDefault: z.boolean().optional(),
  items: z.array(IdRefSchema).optional(),
  taxAmount: AmountSchema.optional(),
  deletedTime: TimestampSchema.optional(),
  modifiedTime: TimestampSchema.optional(),
});

// ============================================================================
// PAYMENT SCHEMAS (Para LineItem)
// ============================================================================


export interface LineItem {
  id?: string;

  // Información del item
  item?: IdRef;
  colorCode?: string;
  name: string;
  alternateName?: string;
  itemCode?: string;
  
  // Precios
  price?: Amount;
  priceWithModifiers?: Amount;
  priceWithModifiersAndItemAndOrderDiscounts?: Amount;
  
  // Cantidad y unidades
  unitQty?: Amount;
  unitName?: string;
  
  // Restricciones de edad
  isAgeRestricted?: boolean;
  ageRestrictedType?: AgeRestrictedType;
  minimumAge?: Amount;
  
  // Notas y metadata
  note?: string;
  binName?: string;
  userData?: string;
  
  // Estados
  printed: boolean;
  exchanged: boolean;
  refunded: boolean;
  isRevenue: boolean;
  
  // Timestamps
  createdTime?: Timestamp;
  orderClientCreatedTime?: Timestamp;
  
  // Descuentos
  discounts?: LineItemDiscount[];
  orderLevelDiscounts?: OrderLevelDiscount[];
  discountAmount?: Amount;
  orderLevelDiscountAmount?: Amount;
  
  // Modificaciones
  modifications?: Modification[];
  
  // Tags
  tags?: Tag[];
  
  // Item intercambiado
  exchangedLineItem?: ExchangedLineItem;
  
  // Reembolso
  refund?: Refund;
  
  // Impuestos
  taxRates?: TaxRate[];
  
  // Pagos
  payments?: LineItemPayment[];
  
  // Grupo de impresion
  printGroup?: PrintGroup;
}

// ============================================================================
// LINEITEM MAIN SCHEMA
// ============================================================================

export const LineItemSchema: z.ZodType<LineItem> = z.looseObject({
  id: z.string().optional(),
  item: IdRefSchema.optional(),
  colorCode: HexColorSchema.optional(),
  name: z.string(),
  alternateName: z.string().optional(),
  price: AmountSchema.optional(),
  priceWithModifiers: AmountSchema.optional(),
  priceWithModifiersAndItemAndOrderDiscounts: AmountSchema.optional(),
  unitQty: AmountSchema.optional(),
  unitName: z.string().optional(),
  itemCode: z.string().optional(),
  isAgeRestricted: z.boolean().optional(),
  ageRestrictedType: AgeRestrictedTypeEnum.optional(),
  minimumAge: AmountSchema.optional(),
  note: z.string().optional(),
  printed: z.boolean().default(false),
  exchangedLineItem: ExchangedLineItemSchema.optional(),
  binName: z.string().optional(),
  userData: z.string().optional(),
  createdTime: TimestampSchema.optional(),
  orderClientCreatedTime: TimestampSchema.optional(),
  discounts: ExpandedResponseSchema(LineItemDiscountSchema).optional(),
  orderLevelDiscounts: ExpandedResponseSchema(OrderLevelDiscountSchema).optional(),
  discountAmount: AmountSchema.optional(),
  orderLevelDiscountAmount: AmountSchema.optional(),
  exchanged: z.boolean().default(false),
  modifications: ExpandedResponseSchema(ModificationSchema).optional(),
  tags: ExpandedResponseSchema(TagSchema).optional(),
  refunded: z.boolean().default(false),
  refund: z.lazy(() => RefundSchema).optional(),
  taxRates: ExpandedResponseSchema(TaxRateSchema).optional(),
  payments: ExpandedResponseSchema(LineItemPaymentSchema).optional(),
  printGroup: PrintGroupSchema.optional(),
  isRevenue: z.boolean().default(false),
});

// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

// Respuesta de GET /orders/{orderId}/line_items

// Respuesta de lista (GET /orders/{orderId}/line_items)

export const LineItemListResponseSchema = z.object({
  elements: z.array(LineItemSchema).optional(),
  href: z.string().optional()
});

// ============================================================================
// TYPE EXPORTS (ALL)
// ============================================================================

export type Item = z.infer<typeof ItemSchema>;
export type Approver = z.infer<typeof ApproverSchema>;
export type Discount = z.infer<typeof DiscountSchema>;
export type LineItemDiscount = z.infer<typeof LineItemDiscountSchema>;
export type OrderLevelDiscount = z.infer<typeof OrderLevelDiscountSchema>;
export type Modifier = z.infer<typeof ModifierSchema>;
export type ModifierGroup = z.infer<typeof ModifierGroupSchema>;
export type Modification = z.infer<typeof ModificationSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type ExchangedLineItem = z.infer<typeof ExchangedLineItemSchema>;
export type PrintGroup = z.infer<typeof PrintGroupSchema>;
export type TaxRate = z.infer<typeof TaxRateSchema>;
export type LineItemPayment = z.infer<typeof LineItemPaymentSchema>;
export type LineItemListResponse = z.infer<typeof LineItemListResponseSchema>;
