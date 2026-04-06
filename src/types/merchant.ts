// src/schemas/clover/merchant.ts
import { z } from "zod";
import {
  // Base schemas
  IdRefSchema,
  TimestampSchema,
  AmountSchema,
  ExpandedResponseSchema,
  AddressSchema as CustomerAddressSchema
} from "./base.js";
import {
  // Enums
  RoleEnum,
} from "./enums.js";
import { EmployeeSchema } from "./employee.js";

// ============================================================================
// MERCHANT REFERENCE SCHEMA (Para referencias simples)
// ============================================================================

export const MerchantRefSchema = z.looseObject({
  id: z.string().optional(),
  href: z.string().optional(),
});

export const MerchantLogoSchema = z.looseObject({
  logoType: z.string().optional(),
  logoFilename: z.string().optional(),
  url: z.string().optional(),
});

export function MerchantExpandedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
        elements: z.array(itemSchema).optional(),
        href: z.string().optional()
      });
}


// ============================================================================
// MERCHANT SUB-SCHEMAS (Objetos anidados)
// ============================================================================


// Address - dirección del merchant
export const MerchantAddressSchema = z.looseObject({
  href: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  address3: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  phoneNumber: z.string().optional(),
});


// MerchantPlan - plan comercial
export const MerchantPlanSchema = z.looseObject({
  id: z.string().optional(),
});

// Properties - configuración del merchant
export const MerchantPropertiesSchema = z.looseObject({
  href: z.string().optional(),
  merchantRef: MerchantRefSchema.optional(),
  defaultCurrency: z.string().length(3).optional(),
  tipsEnabled: z.boolean().optional(),
  summaryHour: z.number().int().optional(),
  signatureThreshold: AmountSchema.optional(),
  hasDefaultEmployee: z.boolean().optional(),
  tipRateDefault: z.number().int().optional(),
  autoLogout: z.boolean().optional(),
  orderTitle: z.enum(["NONE", "TABLE", "CUSTOMER"]).optional(),
  orderTitleMax: z.number().int().optional(),
  resetOnReportingTime: z.boolean().optional(),
  notesOnOrders: z.boolean().optional(),
  deleteOrders: z.boolean().optional(),
  removeTaxEnabled: z.boolean().optional(),
  groupLineItems: z.boolean().optional(),
  alternateInventoryNames: z.boolean().optional(),
  autoPrint: z.boolean().optional(),
  infoleaseSuppressBilling: z.boolean().optional(),
  infoleaseSuppressPlanBilling: z.boolean().optional(),
  shippingAddress: z.string().optional(),
  marketingEnabled: z.boolean().optional(),
  supportPhone: z.string().optional(),
  supportEmail: z.string().email().optional(),
  manualCloseout: z.boolean().optional(),
  manualCloseoutPerDevice: z.boolean().optional(),
  autoCloseoutTimezone: z.string().optional(),
  showCloseoutOrders: z.boolean().optional(),
  sendCloseoutEmail: z.boolean().optional(),
  stayInCategory: z.boolean().optional(),
  locale: z.string().optional(),
  timezone: z.string().optional(),
  vat: z.boolean().optional(),
  vatTaxName: z.string().optional(),
  appBillingSystem: z.string().optional(),
  abaAccountNumber: z.string().optional(),
  ddaAccountNumber: z.string().optional(),
  trackStock: z.boolean().optional(),
  updateStock: z.boolean().optional(),
  allowClockOutWithOpenOrders: z.boolean().optional(),
  logInClockInPrompt: z.boolean().optional(),
  pinLength: z.number().int().optional(),
  cashBackEnabled: z.boolean().optional(),
  hasConsented: z.boolean().optional(),
  merchantBoardingStatus: z.string().optional(),
  printedFirstDataReceiptLogoEnabled: z.boolean().optional(),
  disablePrintTaxesPaymentOnReceipts: z.boolean().optional(),
  processingRestrictions: z.enum(["NONE", "CARD_PRESENT_ONLY"]).optional(),
  limpModeAllowed2: z.boolean().optional(),
});



// Gateway - configuración de gateway de pagos
export const GatewaySchema = z.looseObject({
  authorizationFrontEnd: z.string().optional(),
  acquiringBackEnd: z.string().optional(),
  paymentGatewayApi: z.string().optional(),
  accountName: z.string().optional(),
  mid: z.string().optional(),
  tid: z.string().optional(),
  supportsTipping: z.boolean().optional(),
  frontendMid: z.string().optional(),
  backendMid: z.string().optional(),
  mcc: z.string().optional(),
  tokenType: z.string().optional(),
  groupId: z.string().optional(),
  platform: z.string().optional(),
  debitKeyCode: z.string().optional(),
  supportsTipAdjust: z.boolean().optional(),
  supportsNakedCredit: z.boolean().optional(),
  supportsMultiPayToken: z.boolean().optional(),
  supportsPreauthOverage: z.boolean().optional(),
  closingTime: z.string().optional(),
  newBatchCloseEnabled: z.boolean().optional(),
  production: z.boolean().optional(),
  mcc_group_name: z.string().optional(),
});


// TipSuggestion
export const TipSuggestionSchema = z.looseObject({
  id: z.string().optional(),
  percentage: z.number().int().optional(),
  amount: AmountSchema.optional(),
  isEnabled: z.boolean().optional(),
  flatTip: AmountSchema.optional(),
});



// Inventory Item (simplificado para merchant.items)
export const MerchantItemSchema = z.looseObject({
  id: z.string().optional(),
  hidden: z.boolean().optional(),
  available: z.boolean().optional(),
  autoManage: z.boolean().optional(),
  name: z.string().optional(),
  price: AmountSchema.optional(),
  priceType: z.enum(["FIXED", "VARIABLE", "PER_UNIT"]).optional(),
  defaultTaxRates: z.boolean().optional(),
  isRevenue: z.boolean().optional(),
  modifiedTime: TimestampSchema.optional(),
  deleted: z.boolean().optional(),
});


// Tag (simplificado)
export const MerchantTagSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string().optional(),
});


// Tender (método de pago)
export const TenderSchema = z.looseObject({
  href: z.string().optional(),
  id: z.string().optional(),
  editable: z.boolean().optional(),
  labelKey: z.string().optional(),
  label: z.string().optional(),
  opensCashDrawer: z.boolean().optional(),
  supportsTipping: z.boolean().optional(),
  enabled: z.boolean().optional(),
  visible: z.boolean().optional(),
  supportsCashDiscount: z.boolean().optional(),
  instructions: z.string().optional(),
});


// Order (simplificado para merchant.orders)
export const MerchantOrderSchema = z.looseObject({
  href: z.string().optional(),
  id: z.string().optional(),
  currency: z.string().length(3).optional(),
  title: z.string().optional(),
  note: z.string().optional(),
  taxRemoved: z.boolean().optional(),
  isVat: z.boolean().optional(),
  state: z.enum(["open", "locked", "deleted", "hidden"]).optional(),
  manualTransaction: z.boolean().optional(),
  groupLineItems: z.boolean().optional(),
  testMode: z.boolean().optional(),
  createdTime: TimestampSchema.optional(),
  clientCreatedTime: TimestampSchema.optional(),
  modifiedTime: TimestampSchema.optional(),
});

// Printer
export const PrinterSchema = z.looseObject({
  id: z.string().optional(),
  type: z.string().optional(),
});

// Reseller
export const ResellerSchema = z.looseObject({
  id: z.string().optional(),
});


// BillingInfo
export const BillingInfoSchema = z.looseObject({
  planBillable: z.boolean().optional(),
  appBillable: z.boolean().optional(),
  wmBillable: z.boolean().optional(),
});


// MerchantBoarding
export const MerchantBoardingSchema = z.looseObject({
  translatedAccountStatus: z.string().optional(),
  createdTime: TimestampSchema.optional(),
  modifiedTime: TimestampSchema.optional(),
  creationSource: z.string().optional(),
});



// Level3PreReqs
export const Level3PreReqsSchema = z.looseObject({
  merchantHasTaxId: z.boolean().optional(),
  isNorthMerchant: z.boolean().optional(),
});


// DeviceBoarding
export const DeviceBoardingSchema = z.looseObject({
  merchantRef: MerchantRefSchema.optional(),
  productType: z.string().optional(),
  equipmentNumber: z.string().optional(),
  businessType: z.string().optional(),
  status: z.string().optional(),
  forceCloseTime: z.string().optional(),
  createdTime: TimestampSchema.optional(),
  modifiedTime: TimestampSchema.optional(),
});


// Equipment
export const EquipmentSchema = z.looseObject({
  merchantId: z.string().optional(),
  boarded: z.boolean().optional(),
  provisioned: z.boolean().optional(),
  equipmentNumber: z.string().optional(),
  equipmentCode: z.string().optional(),
  equipmentCodeDesc: z.string().optional(),
});


// ============================================================================
// MERCHANT MAIN SCHEMA
// ============================================================================

export const MerchantSchema = z.looseObject({
  // === Identificación y básicos ===
  href: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),

  // === Owner (puede ser referencia O expandido) ===
  owner: EmployeeSchema.optional(),

  // === Address (puede ser referencia O expandido) ===
  address: MerchantAddressSchema.optional(),

  // === Plan y configuración ===
  merchantPlan: IdRefSchema.optional(),
  logos: MerchantExpandedResponseSchema(MerchantLogoSchema).optional(),

  // === Timestamps ===
  createdTime: TimestampSchema.optional(),

  // === Configuración detallada ===
  properties: MerchantPropertiesSchema.optional(),

  // === Gateway de pagos ===
  gateway: GatewaySchema.optional(),

  // === Tip suggestions ===
  tipSuggestions: MerchantExpandedResponseSchema(TipSuggestionSchema).optional(),

  // === Colecciones expandidas (usando ExpandedResponseSchema<T>) ===
  employees: MerchantExpandedResponseSchema(EmployeeSchema).optional(),
  items: MerchantExpandedResponseSchema(MerchantItemSchema).optional(),
  tags: MerchantExpandedResponseSchema(MerchantTagSchema).optional(),
  tenders: MerchantExpandedResponseSchema(TenderSchema).optional(),
  shifts: MerchantExpandedResponseSchema(MerchantRefSchema).optional(),
  orders: MerchantExpandedResponseSchema(MerchantOrderSchema).optional(),
  payments: MerchantExpandedResponseSchema(MerchantRefSchema).optional(),
  taxRates: MerchantExpandedResponseSchema(MerchantRefSchema).optional(),
  printers: MerchantExpandedResponseSchema(PrinterSchema).optional(),
  modifierGroups: MerchantExpandedResponseSchema(MerchantRefSchema).optional(),
  orderTypes: MerchantExpandedResponseSchema(MerchantRefSchema).optional(),
  opening_hours: MerchantExpandedResponseSchema(MerchantRefSchema).optional(),

  // === Reseller ===
  reseller: ResellerSchema.optional(),

  // === Billing ===
  billingInfo: BillingInfoSchema.optional(),
  isBillable: z.boolean().optional(),

  // === Boarding ===
  merchantBoarding: MerchantBoardingSchema.optional(),

  // === Level 3 prerequisites ===
  level3PreReqs: Level3PreReqsSchema.optional(),

  // === Otras colecciones expandidas ===
  externalMerchants: MerchantExpandedResponseSchema(MerchantRefSchema).optional(),
  programExpresses: MerchantExpandedResponseSchema(MerchantRefSchema).optional(),
  deviceBoardings: MerchantExpandedResponseSchema(DeviceBoardingSchema).optional(),
  equipment: MerchantExpandedResponseSchema(EquipmentSchema).optional(),
  enterprises: MerchantExpandedResponseSchema(MerchantRefSchema).optional(),
});


// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

export const MerchantResponseSchema = MerchantSchema;
export type MerchantResponse = Merchant;

// ============================================================================
// TYPE EXPORTS (ALL)
// ============================================================================
export type MerchantRef = z.infer<typeof MerchantRefSchema>;
export type MerchantAddress = z.infer<typeof MerchantAddressSchema>;
export type MerchantPlan = z.infer<typeof MerchantPlanSchema>;
export type MerchantProperties = z.infer<typeof MerchantPropertiesSchema>;
export type Gateway = z.infer<typeof GatewaySchema>;
export type TipSuggestion = z.infer<typeof TipSuggestionSchema>;
export type MerchantItem = z.infer<typeof MerchantItemSchema>;
export type MerchantTag = z.infer<typeof MerchantTagSchema>;
export type Tender = z.infer<typeof TenderSchema>;
export type MerchantOrder = z.infer<typeof MerchantOrderSchema>;
export type Printer = z.infer<typeof PrinterSchema>;
export type Reseller = z.infer<typeof ResellerSchema>;
export type BillingInfo = z.infer<typeof BillingInfoSchema>;
export type MerchantBoarding = z.infer<typeof MerchantBoardingSchema>;
export type Level3PreReqs = z.infer<typeof Level3PreReqsSchema>;
export type DeviceBoarding = z.infer<typeof DeviceBoardingSchema>;
export type Equipment = z.infer<typeof EquipmentSchema>;
export type Merchant = z.infer<typeof MerchantSchema>;