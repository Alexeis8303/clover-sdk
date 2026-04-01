// src/schemas/clover/inventory.ts
import { z } from "zod";
import { 
  TaxTypeEnum, 
  PriceTypeEnum,
  type TaxType,
  type PriceType 
} from "./enums";
import { 
  HexColorSchema, 
  TimestampSchema, 
  MoneySchema,
  PercentageDecimalSchema,
  IdRefOptionalSchema,
  IdRefArrayItemSchema,
  ExpandedResponseSchema
} from "./base";

import {CategorySchema} from "./category"
import { ModifierGroupSchema } from "./modifierGroup";

// ============================================================================
// SCHEMAS DE OBJETOS ANIDADOS (ESPECÍFICOS DE INVENTORY)
// ============================================================================

// Option - variante dentro de un ItemGroup
export const OptionSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string(), // required
  attribute: IdRefOptionalSchema.optional(),
  items: z.array(IdRefArrayItemSchema).optional()
});


// TaxRate
export const TaxRateSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string(), // required
  taxType: TaxTypeEnum.optional(),
  rate: PercentageDecimalSchema.optional(),
  isDefault: z.boolean().optional(),
  items: z.array(IdRefArrayItemSchema).optional(),
  taxAmount: MoneySchema,
  deletedTime: TimestampSchema,
  modifiedTime: TimestampSchema
});

// Tag
export const TagItemRefSchema = z.object({ id: z.string().optional() });
export const TagPrinterRefSchema = z.object({ id: z.string().optional() });

export const TagSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string(), // required
  showInReporting: z.boolean().optional().default(false),
  items: z.array(TagItemRefSchema).optional(),
  printers: z.array(TagPrinterRefSchema).optional(),
  canonical: IdRefOptionalSchema.optional()
});

// ItemStock
export const ItemStockSchema = z.looseObject({
  item: IdRefOptionalSchema.optional(),
  stockCount: z.number().int().optional().nullable(),
  quantity: z.number().optional(),
  modifiedTime: TimestampSchema
});



// MenuItem
export const MenuItemSchema = z.looseObject({
  id: z.string().optional(),
  item: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional().nullable(),
  imageFilename: z.string().optional().nullable(),
  enabled: z.boolean().optional(),
  reasonCode: z.string().optional().nullable(),
  createdTime: TimestampSchema,
  modifiedTime: TimestampSchema,
  deletedTime: TimestampSchema
});



// ============================================================================
// SCHEMA PRINCIPAL: InventoryItem
// ============================================================================

export const InventoryItemSchema = z.looseObject({
  // === Identificación ===
  id: z.string().optional(),
  
  // === Nombres y códigos ===
  name: z.string(),
  alternateName: z.string().optional().nullable(),
  code: z.string().optional().nullable(),
  sku: z.string().optional().nullable(),
  
  // === Estado ===
  hidden: z.boolean().optional().default(false),
  available: z.boolean().optional().default(true),
  autoManage: z.boolean().optional().default(false),
  
  // === Agrupación ===
  itemGroup: IdRefOptionalSchema,
  options: z.array(OptionSchema).optional(),
  
  // === Precios ===
  price: MoneySchema,
  priceType: PriceTypeEnum.optional(),
  priceWithoutVat: MoneySchema.optional(),
  
  // === Impuestos ===
  defaultTaxRates: z.boolean().optional().default(true),
  taxRates: ExpandedResponseSchema(TaxRateSchema).optional(),
  
  // === Modificadores ===
  modifierGroups:ExpandedResponseSchema(ModifierGroupSchema).optional(),
  
  // === Categorías ===
  categories: ExpandedResponseSchema(CategorySchema).optional(),
  
  // === Tags ===
  tags: ExpandedResponseSchema(TagSchema).optional(),
  
  // === Stock ===
  itemStock: ItemStockSchema.optional(),
  
  // === Menú ===
  MenuItem: MenuItemSchema.optional(),
  
  // === UI/Metadatos ===
  colorCode: HexColorSchema.optional(),
  modifiedTime: TimestampSchema,
  deletedTime: TimestampSchema,
  
  // === Financieros ===
  cost: z.number().int().optional().nullable(),
  isRevenue: z.boolean().optional().default(false),
  
  // === Unidad ===
  unitName: z.string().optional().nullable(),
  
  // === Canónico ===
  canonical: IdRefOptionalSchema.optional()
});


// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

export const InventoryItemResponseSchema = InventoryItemSchema;

export const InventoryItemListResponseSchema = z.looseObject({
  elements: z.array(InventoryItemSchema).optional(),
  href: z.string().optional()
});

export type Option = z.infer<typeof OptionSchema>;
export type TaxRate = z.infer<typeof TaxRateSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type ItemStock = z.infer<typeof ItemStockSchema>;
export type MenuItem = z.infer<typeof MenuItemSchema>;
export type InventoryItem = z.infer<typeof InventoryItemSchema>;
export type InventoryItemResponse = InventoryItem;
export type InventoryItemListResponse = z.infer<typeof InventoryItemListResponseSchema>;