import { z } from "zod";
import { IdRefSchema, TimestampSchema, GenericAttributesSchema, PercentageDecimalSchema, AmountSchema, ExpandedResponseSchema, MoneySchema } from "./base";
import { CustomerSchema } from "./customer";
import { OrderTypeSchema, LineItemPaymentSchema } from "./order-type";
import { PaymentResultEnum, CardTypeEnum, PaymentStateEnum, OrderStateEnum, PayTypeEnum, AdditionalChargeTypeEnum, AuthTypeEnum, VoidReasonCodeEnum, VoidReasonEnum } from "./enums";
import { RefundSchema, AppTrackingSchema } from "./refund";
import { LineItemSchema } from "./lineitem";
import {
  PaymentSchema, TenderSchema, PaymentTaxRateSchema, CashAdvanceExtraSchema, SignatureDisclaimerSchema, IncrementSchema,
  PurchaseCardL2Schema, PurchaseCardL3Schema, OceanGatewayInfoSchema, TerminalManagementComponentSchema, EmiInfoSchema, ClosingPaymentSchema,
  EmiDetailsSchema
} from "./payment";


// ============================================================================
// SERVICE CHARGE & DISCOUNTS
// ============================================================================

export const ServiceChargeSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean().optional(),
  percentage: z.number().int().optional(),
  percentageDecimal: PercentageDecimalSchema.optional(),
  isAutoApplied: z.boolean().optional()
});

export const DiscountApproverSchema = z.looseObject({
  id: z.string(),
  name: z.string().optional()
});

export const DiscountSchema = z.looseObject({
  id: z.string(),
  discount: IdRefSchema.optional(),
  approver: DiscountApproverSchema.optional(),
  name: z.string().optional(),
  amount: AmountSchema.optional(),
  percentage: z.number().int().optional()
});

// ============================================================================
// CREDIT & VOID SCHEMAS
// ============================================================================

export const CreditRefundSchema = z.looseObject({
  id: z.string(),
  orderRef: IdRefSchema.optional(),
  device: IdRefSchema.optional(),
  createdTime: TimestampSchema.optional(),
  clientCreatedTime: TimestampSchema.optional(),
  credit: IdRefSchema.optional(),
  employee: IdRefSchema.optional(),
  germanInfo: z.any().optional(),
  appTracking: z.any().optional(),
  transactionInfo: z.any().optional(),
  printMessages: z.array(z.looseObject({
    destination: z.string().optional(),
    content: z.string().optional()
  })).optional()
});

export const CreditSchema = z.looseObject({
  id: z.string(),
  orderRef: IdRefSchema.optional(),
  device: IdRefSchema.optional(),
  tender: TenderSchema.optional(),
  employee: IdRefSchema.optional(),
  customer: CustomerSchema.optional(),
  amount: AmountSchema,
  taxAmount: AmountSchema.optional(),
  taxRates: z.array(PaymentTaxRateSchema).optional(),
  createdTime: TimestampSchema.optional(),
  clientCreatedTime: TimestampSchema.optional(),
  cardTransaction: z.any().optional(), // Reusar de payment.ts
  voided: z.boolean().optional(),
  voidReason: z.string().optional(),
  dccInfo: z.any().optional(),
  transactionSettings: z.any().optional(),
  germanInfo: z.any().optional(),
  appTracking: z.any().optional(),
  transactionInfo: z.any().optional(),
  merchant: IdRefSchema.optional(),
  externalReferenceId: z.string().optional(),
  CreditAttributes: GenericAttributesSchema,
  creditRefunds: z.array(CreditRefundSchema).optional(),
  result: PaymentResultEnum.optional(),
  reason: z.string().optional()
});

// ============================================================================
// VOID SCHEMA
// ============================================================================
export const VoidReasonDetailsSchema = z.looseObject({
  txError: z.string().optional(),
  voidReasonCode: VoidReasonCodeEnum.optional(),
  description: z.string().optional(),
  descriptionEnum: z.string().optional(),
  payFailureMessage: z.string().optional()
});

export const VoidSchema = z.looseObject({
  id: z.string(),
  order: IdRefSchema.optional(),
  device: IdRefSchema.optional(),
  tender: TenderSchema.optional(),
  amount: AmountSchema,
  tipAmount: AmountSchema.optional(),
  taxAmount: AmountSchema.optional(),
  cashbackAmount: AmountSchema.optional(),
  cashTendered: AmountSchema.optional(),
  externalPaymentId: z.string().optional(),
  employee: IdRefSchema.optional(),
  createdTime: TimestampSchema.optional(),
  clientCreatedTime: TimestampSchema.optional(),
  gatewayProcessingTime: TimestampSchema.optional(),
  modifiedTime: TimestampSchema.optional(),
  offline: z.boolean().default(false),
  result: PaymentResultEnum.optional(),
  cardTransaction: z.any().optional(),
  serviceCharge: z.looseObject({
    id: z.string(),
    name: z.string(),
    amount: AmountSchema
  }).optional(),
  attributes: GenericAttributesSchema.optional(),
  additionalCharges: z.array(z.looseObject({
    id: z.string(),
    amount: AmountSchema,
    rate: z.number().int().optional(),
    type: AdditionalChargeTypeEnum.optional()
  })).optional(),
  taxRates: z.array(z.looseObject({
    id: z.string(),
    name: z.string(),
    rate: z.number().int(),
    isDefault: z.boolean().optional(),
    taxableAmount: AmountSchema,
    isVat: z.boolean().optional(),
    taxAmount: AmountSchema.optional()
  })).optional(),
  refunds: z.array(z.lazy(() => RefundSchema)).optional(),
  note: z.string().optional(),
  lineItemPayments: z.array(LineItemPaymentSchema).optional(),
  authorization: IdRefSchema.optional(),
  voidPaymentRef: IdRefSchema.optional(),
  voidReason: VoidReasonEnum.optional(),
  voidReasonDetails: VoidReasonDetailsSchema.optional(),
  dccInfo: z.any().optional(),
  transactionSettings: z.any().optional(),
  germanInfo: z.any().optional(),
  appTracking: AppTrackingSchema.optional(),
  cashAdvanceExtra: CashAdvanceExtraSchema,
  signatureDisclaimer: SignatureDisclaimerSchema,
  increments: z.array(IncrementSchema).optional(),
  purchaseCardL2: PurchaseCardL2Schema.optional(),
  purchaseCardL3: PurchaseCardL3Schema,
  oceanGatewayInfo: OceanGatewayInfoSchema,
  terminalManagementComponents: z.array(TerminalManagementComponentSchema).optional(),
  emiInfo: EmiInfoSchema.optional()
});

// ============================================================================
// AUTHORIZATION SCHEMA
// ============================================================================

export const AuthorizationSchema = z.looseObject({
  id: z.string(),
  payment: z.object({ id: z.string() }).passthrough().optional(),
  order: IdRefSchema.optional(),
  device: IdRefSchema.optional(),
  tender: TenderSchema.optional(),
  amount: AmountSchema,
  tipAmount: AmountSchema.optional(),
  taxAmount: AmountSchema.optional(),
  cashbackAmount: AmountSchema.optional(),
  cashTendered: AmountSchema.optional(),
  externalPaymentId: z.string().optional(),
  employee: IdRefSchema.optional(),
  createdTime: TimestampSchema.optional(),
  clientCreatedTime: TimestampSchema.optional(),
  gatewayProcessingTime: TimestampSchema.optional(),
  modifiedTime: TimestampSchema.optional(),
  offline: z.boolean().default(false),
  result: PaymentResultEnum.optional(),
  cardTransaction: z.any().optional(),
  debitRefund: z.any().optional(),
  serviceCharge: z.any().optional(),
  attributes: GenericAttributesSchema.optional(),
  additionalCharges: z.array(z.any()).optional(),
  taxRates: z.array(z.any()).optional(),
  refunds: z.array(z.lazy(() => RefundSchema)).optional(),
  // Authorization specific fields
  tabName: z.string().optional(),
  cardType: CardTypeEnum.optional(),
  last4: z.string().length(4).optional(),
  authcode: z.string().optional(),
  token: z.string().optional(),
  type: AuthTypeEnum.optional(),
  note: z.string().optional(),
  externalReferenceId: z.string().optional(),
  closingPayment: ClosingPaymentSchema.optional(),
  createdTimeAuth: TimestampSchema.optional(),
  additionalChargesAuth: z.array(z.any()).optional(),
  transactionSequenceCounter: z.string().optional(),
  acquirerTerminalId: z.string().optional(),
  merchant: IdRefSchema.optional(),
  increments: z.array(IncrementSchema).optional(),
  purchaseCardL2: PurchaseCardL2Schema.optional(),
  purchaseCardL3: PurchaseCardL3Schema.optional(),
  oceanGatewayInfo: OceanGatewayInfoSchema.optional(),
  terminalManagementComponents: z.array(TerminalManagementComponentSchema).optional(),
  emiInfo: EmiInfoSchema.optional()
});

// ============================================================================
// PRINT GROUP & FULFILLMENT
// ============================================================================

export const PrintGroupSchema = z.looseObject({
  id: z.string(),
  orderRef: IdRefSchema.optional(),
  name: z.string().optional(),
  sortOrder: z.number().int().optional(),
  fired: z.boolean().default(false),
  printTime: TimestampSchema.optional()
});

export const OrderFulfillmentEventSchema = z.looseObject({
  id: z.string(),
  type: z.string(),
  orderId: z.string(),
  lineItemId: z.string().optional(),
  clientCreatedTime: TimestampSchema,
  createdTime: TimestampSchema.optional(),
  parentLineItemEvent: IdRefSchema.optional()
});

// ============================================================================
// ADDITIONAL CHARGE (Order level)
// ============================================================================

export const OrderAdditionalChargeSchema = z.looseObject({
  id: z.string(),
  merchantAdditionalChargeRef: IdRefSchema.optional(),
  type: AdditionalChargeTypeEnum.optional(),
  amount: AmountSchema,
  percentageDecimal: PercentageDecimalSchema.optional(),
  createdTime: TimestampSchema.optional(),
  modifiedTime: TimestampSchema.optional(),
  deletedTime: TimestampSchema.optional()
});


// ============================================================================
// ORDER MAIN SCHEMA
// ============================================================================

export const OrderSchema = z.looseObject({
  // === Identificación ===
  id: z.string().optional(),

  // === Moneda ===
  currency: z.string().length(3).optional(),

  // === Clientes ===
  customers: ExpandedResponseSchema(CustomerSchema).optional(),

  // === Empleado ===
  employee: IdRefSchema.optional(),

  // === Montos ===
  total: MoneySchema.optional(),
  unpaidBalance: MoneySchema.optional(),

  // === Referencias externas ===
  externalReferenceId: z.string().optional(),

  // === Estado de pago ===
  paymentState: PaymentStateEnum.optional(),

  // === Título y notas ===
  title: z.string().optional(),
  note: z.string().optional(),

  // === Tipo de orden ===
  orderType: OrderTypeSchema.optional(),

  // === Impuestos ===
  taxRemoved: z.boolean().default(false),
  isVat: z.boolean().optional(),

  // === Estado de la orden ===
  state: OrderStateEnum.optional(),

  // === Configuración de transacción ===
  manualTransaction: z.boolean().optional(),
  groupLineItems: z.boolean().optional(),
  testMode: z.boolean().optional(),

  // === Tipo de pago ===
  payType: PayTypeEnum.optional(),

  // === Timestamps ===
  createdTime: TimestampSchema.optional(),
  clientCreatedTime: TimestampSchema.optional(),
  modifiedTime: TimestampSchema.optional(),
  deletedTimestamp: TimestampSchema.optional(),

  // === Cargo por servicio ===
  serviceCharge: ServiceChargeSchema.optional(),

  // === Cargos adicionales ===
  additionalCharges: z.array(OrderAdditionalChargeSchema).optional(),

  // === Descuentos ===
  discounts: ExpandedResponseSchema(DiscountSchema).optional(),

  // === Line items ===
  lineItems: ExpandedResponseSchema(LineItemSchema).optional(),

  // === Pagos ===
  payments: z.array(PaymentSchema).optional(),

  // === Reembolsos ===
  refunds: ExpandedResponseSchema(RefundSchema).optional(),

  // === Créditos ===
  credits: z.array(CreditSchema).optional(),

  // === Voids ===
  voids: z.array(VoidSchema).optional(),

  // === Pre-authorizations ===
  preAuths: z.array(AuthorizationSchema).optional(),

  // === Authorizations ===
  authorizations: z.array(AuthorizationSchema).optional(),

  // === Dispositivo ===
  device: IdRefSchema.optional(),

  // === Grupos de impresión ===
  printGroups: z.array(PrintGroupSchema).optional(),

  // === Evento de fulfillment ===
  orderFulfillmentEvent: OrderFulfillmentEventSchema.optional(),

  // === Merchant ===
  merchant: IdRefSchema.optional(),

  href: z.string().optional()
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================
export type ServiceCharge = z.infer<typeof ServiceChargeSchema>;
export type DiscountApprover = z.infer<typeof DiscountApproverSchema>;
export type Discount = z.infer<typeof DiscountSchema>;
export type CreditRefund = z.infer<typeof CreditRefundSchema>;
export type Credit = z.infer<typeof CreditSchema>;
export type VoidReasonDetails = z.infer<typeof VoidReasonDetailsSchema>;
export type Void = z.infer<typeof VoidSchema>;
export type Authorization = z.infer<typeof AuthorizationSchema>;
export type PrintGroup = z.infer<typeof PrintGroupSchema>;
export type OrderFulfillmentEvent = z.infer<typeof OrderFulfillmentEventSchema>;
export type OrderAdditionalCharge = z.infer<typeof OrderAdditionalChargeSchema>;
export type Order = z.infer<typeof OrderSchema>;

// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

export const AtomicOrderCreateInputSchema = z.looseObject({
  orderCart: z.looseObject({
    id: z.string().optional(),
    currency: z.string().length(3).optional(),
    title: z.string().optional(),
    note: z.string().optional(),
    clientCreatedTime: TimestampSchema.optional(),
    serviceCharge: ServiceChargeSchema.optional(),
    discounts: z.array(DiscountSchema).optional(),
    lineItems: z.array(LineItemSchema).optional(),
    orderType: OrderTypeSchema.optional(),
    merchant: IdRefSchema.optional(),
    groupLineItems: z.boolean().optional()
  })
});

export type AtomicOrderCreateInput = z.infer<typeof AtomicOrderCreateInputSchema>;

export const OrderResponseSchema = OrderSchema;
export type OrderResponse = Order;

export const OrderListResponseSchema = z.looseObject({
  elements: z.array(OrderSchema).optional(),
  href: z.string().optional()
});
export type OrderListResponse = z.infer<typeof OrderListResponseSchema>;