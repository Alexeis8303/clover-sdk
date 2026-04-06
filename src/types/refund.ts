import { z } from "zod";
import {
  // Base schemas
  IdRefSchema, IdRef,
  TimestampSchema, Timestamp,
  AmountSchema, Amount,
  GenericAttributesSchema,
  GenericExtraSchema,
  Attributes
} from "./base.js";
import {
  // Enums
  AgeRestrictedTypeEnum,
  AdditionalChargeTypeEnum,
  CardTypeEnum,
  CardEntryTypeEnum,
  CardTransactionTypeEnum,
  CardTransactionStateEnum,
  AvsResultEnum,
  GatewayTxStateEnum,
  AccountSelectionEnum,
  PrintMessageDestinationEnum,
  RefundStatusEnum, RefundStatus

} from "./enums.js";

import type { LineItem } from "./lineitem.js";
import {  LineItemSchema } from "./lineitem.js";

export const OverrideMerchantTenderSchema = z.looseObject({
  id: z.string(),
  editable: z.boolean().optional(),
  labelKey: z.string().optional(),
  label: z.string().optional(),
  opensCashDrawer: z.boolean().optional(),
  supportsTipping: z.boolean().optional(),
  enabled: z.boolean().optional(),
  visible: z.boolean().optional(),
  instructions: z.string().optional(),
});

export const TaxableAmountRateSchema = z.looseObject({
  id: z.string(),
  name: z.string().optional(),
  taxableAmount: AmountSchema,
  rate: AmountSchema,
  isVat: z.boolean().optional(),
  taxAmount: AmountSchema.optional(),
  transactionRef: IdRefSchema.optional(),
});

export const ServiceChargeAmountSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  amount: AmountSchema,
});

export const AdditionalChargeSchema = z.looseObject({
  id: z.string(),
  amount: AmountSchema,
  rate: AmountSchema.optional(),
  type: AdditionalChargeTypeEnum.optional(),
  attributes: GenericAttributesSchema,
});

// ============================================================================
// REFUND COMPLEX SCHEMAS
// ============================================================================

export const GermanInfoSchema = z.looseObject({
  cardTrack2: z.string().optional(),
  cardSequenceNumber: z.string().optional(),
  transactionCaseGermany: z.string().optional(),
  transactionTypeGermany: z.string().optional(),
  terminalID: z.string().optional(),
  traceNumber: z.string().optional(),
  oldTraceNumber: z.string().optional(),
  receiptNumber: z.string().optional(),
  transactionAID: z.string().optional(),
  transactionMSApp: z.string().optional(),
  transactionScriptResults: z.string().optional(),
  receiptType: z.string().optional(),
  customerTransactionDOLValues: z.string().optional(),
  merchantTransactionDOLValues: z.string().optional(),
  merchantJournalDOL: z.string().optional(),
  merchantJournalDOLValues: z.string().optional(),
  configMerchantId: z.string().optional(),
  configProductLabel: z.string().optional(),
  hostResponseAidParBMP53: z.string().optional(),
  hostResponsePrintDataBM60: z.string().optional(),
  sepaElvReceiptFormat: z.string().optional(),
  sepaElvExtAppLabel: z.string().optional(),
  sepaElvPreNotification: z.string().optional(),
  sepaElvMandate: z.string().optional(),
  sepaElvCreditorId: z.string().optional(),
  sepaElvMandateId: z.string().optional(),
  sepaElvIban: z.string().optional(),
});

export const AppTrackingSchema = z.looseObject({
  developerAppId: z.string().uuid().optional(),
  applicationName: z.string().optional(),
  applicationID: z.string().optional(),
  applicationVersion: z.string().optional(),
  sourceSDK: z.string().optional(),
  sourceSDKVersion: z.string().optional(),
});

export const VaultedCardSchema = z.looseObject({
  first6: z.string().length(6),
  last4: z.string().length(4),
  cardholderName: z.string().optional(),
  expirationDate: z.string().optional(),
  token: z.string().optional(),
});

export const CardTransactionSchema = z.looseObject({
  cardType: CardTypeEnum,
  entryType: CardEntryTypeEnum,
  first6: z.string().length(6).optional(),
  last4: z.string().length(4).optional(),
  type: CardTransactionTypeEnum,
  authCode: z.string().optional(),
  referenceId: z.string().optional(),
  transactionNo: z.string().optional(),
  state: CardTransactionStateEnum.optional(),
  extra: GenericExtraSchema,
  begBalance: AmountSchema.optional(),
  endBalance: AmountSchema.optional(),
  avsResult: AvsResultEnum.optional(),
  cardholderName: z.string().optional(),
  token: z.string().optional(),
  vaultedCard: VaultedCardSchema.optional(),
  gatewayTxState: GatewayTxStateEnum.optional(),
  currency: z.string().length(3).optional(),
  captured: z.boolean().optional(),
});

export const DebitRefundSchema = z.looseObject({
  debitTransactionRouteInd: z.string().optional(),
  isDebitTransactionRefundable: z.boolean().optional(),
});

export const IdentityDocumentSchema = z.looseObject({
  id: z.string(),
  type: z.string(),
  number: z.string(),
  createdTime: TimestampSchema.optional(),
  modifiedTime: TimestampSchema.optional(),
  deletedTime: TimestampSchema.optional(),
});

export const TransactionInfoSchema = z.looseObject({
  languageIndicator: z.string().length(2).optional(),
  transactionLocale: z.string().optional(),
  accountSelection: AccountSelectionEnum.optional(),
  fiscalInvoiceNumber: z.string().regex(/^\d{12}$/).optional(),
  installmentsQuantity: z.number().int().min(1).max(999).optional(),
  installmentsPlanCode: z.string().optional(),
  installmentsPlanId: z.string().optional(),
  installmentsPlanDesc: z.string().optional(),
  cardTypeLabel: z.string().optional(),
  cardSymbol: z.string().optional(),
  stan: z.number().int().optional(),
  identityDocument: IdentityDocumentSchema.optional(),
});

export const PromotionalMessageSchema = z.looseObject({
  message: z.string(),
  showOnMerchantReceipt: z.boolean(),
  showOnCustomerReceipt: z.boolean(),
  showOnDisplay: z.boolean(),
});

export const SepaElvTransactionInfoSchema = z.looseObject({
  receiptFormat: z.string().optional(),
  extAppLabel: z.string().optional(),
  preNotification: z.string().optional(),
  mandate: z.string().optional(),
  creditorId: z.string().optional(),
  mandateId: z.string().optional(),
  iban: z.string().optional(),
  isMerchantForced: z.boolean().optional(),
});

export const PrintMessageSchema = z.looseObject({
  destination: PrintMessageDestinationEnum,
  content: z.string(),
});

export const EmiDetailsSchema = z.looseObject({
  lenderName: z.string().optional(),
  tenure: z.string().optional(),
  interestRate: z.string().optional(),
  interest: z.string().optional(),
  emiAmount: z.string().optional(),
  lenderLoanId: z.string().optional(),
  fees: z.string().optional(),
  discountAmount: z.string().optional(),
  offerCashback: z.string().optional(),
  tranAmount: z.string().optional(),
  totalPayable: z.string().optional(),
});

export const OceanGatewayInfoSchema = z.looseObject({
  tranSource: z.string().optional(),
  tranChannel: z.string().optional(),
  transactionType: z.string().optional(),
  merchantId: z.string().optional(),
  terminalId: z.string().optional(),
  tenderType: z.string().optional(),
  entryMethod: z.string().optional(),
  transactionAmount: z.string().optional(),
  transactionCurrency: z.string().optional(),
  fpTransactionId: z.string().optional(),
  merchantTxnId: z.string().optional(),
  fpRefundTransactionId: z.string().optional(),
  transactionStatus: z.string().optional(),
  transactionStatusDescription: z.string().optional(),
  rrn: z.string().optional(),
  batchNo: z.string().optional(),
  invoiceNo: z.string().optional(),
  cardScheme: z.string().optional(),
  qrType: z.string().optional(),
  transactionDateTime: z.string().optional(),
  authCode: z.string().optional(),
  pan: z.string().optional(),
  customerMobile: z.string().optional(),
  customerName: z.string().optional(),
  customerRemarks: z.string().optional(),
  bankName: z.string().optional(),
  bankCode: z.string().optional(),
  emiDetails: EmiDetailsSchema.optional(),
});

// ============================================================================
// REFUND SCHEMA (Con referencia recursiva a LineItem)
// ============================================================================

export const PaymentRefSchema = z.looseObject({
  id: z.string(),
});

export type Refund = {
  // Identificadores básicos
  id: string;
  orderRef?: IdRef;
  device?: IdRef;
  merchant?: IdRef;
  externalReferenceId?: string;
  
  // Montos
  amount?: Amount;
  taxAmount?: Amount;
  tipAmount?: Amount;
  
  // Timestamps
  createdTime?: Timestamp;
  clientCreatedTime?: Timestamp;
  gatewayProcessingTime?: Timestamp;
  
  // Referencias
  payment?: PaymentRef;
  employee?: IdRef;
  
  // Line items (referencia circular con LineItem)
  lineItems?: LineItem[];
  
  // Tender y cargos
  overrideMerchantTender?: OverrideMerchantTender;
  taxableAmountRates?: TaxableAmountRate[];
  serviceChargeAmount?: ServiceChargeAmount;
  additionalCharges?: AdditionalCharge[];
  attributes?: Attributes;
  
  // Información de transacción
  cardTransaction?: CardTransaction;
  debitRefund?: DebitRefund;
  transactionInfo?: TransactionInfo;
  
  // Información regional
  germanInfo?: GermanInfo;
  oceanGatewayInfo?: OceanGatewayInfo;
  
  // Estado y motivo
  voided?: boolean;
  voidReason?: string;
  authCode?: string;
  status?: RefundStatus;
  reason?: string;
  note?: string;
  
  // Revenue
  isRevenue?: boolean;

}

export const RefundSchema: z.ZodType<Refund> = z.looseObject({
  id: z.string(),
  orderRef: IdRefSchema.optional(),
  device: IdRefSchema.optional(),
  amount: AmountSchema.optional(),
  taxAmount: AmountSchema.optional(),
  tipAmount: AmountSchema.optional(),
  createdTime: TimestampSchema.optional(),
  clientCreatedTime: TimestampSchema.optional(),
  gatewayProcessingTime: TimestampSchema.optional(),
  payment: PaymentRefSchema.optional(),
  employee: IdRefSchema.optional(),
  lineItems: z.array(z.lazy(() => LineItemSchema)).optional(),
  overrideMerchantTender: OverrideMerchantTenderSchema.optional(),
  taxableAmountRates: z.array(TaxableAmountRateSchema).optional(),
  serviceChargeAmount: ServiceChargeAmountSchema.optional(),
  additionalCharges: z.array(AdditionalChargeSchema).optional(),
  attributes: GenericAttributesSchema.optional(),
  germanInfo: GermanInfoSchema.optional(),
  cardTransaction: CardTransactionSchema.optional(),
  debitRefund: DebitRefundSchema.optional(),
  transactionInfo: TransactionInfoSchema.optional(),
  voided: z.boolean().optional(),
  voidReason: z.string().optional(),
  merchant: IdRefSchema.optional(),
  externalReferenceId: z.string().optional(),
  authCode: z.string().optional(),
  status: RefundStatusEnum.optional(),
  oceanGatewayInfo: OceanGatewayInfoSchema.optional(),
  reason: z.string().optional(),
  isRevenue: z.boolean().default(false),
  note: z.string().optional(),
});


export type GermanInfo = z.infer<typeof GermanInfoSchema>;
export type AppTracking = z.infer<typeof AppTrackingSchema>;
export type VaultedCard = z.infer<typeof VaultedCardSchema>;
export type CardTransaction = z.infer<typeof CardTransactionSchema>;
export type DebitRefund = z.infer<typeof DebitRefundSchema>;
export type IdentityDocument = z.infer<typeof IdentityDocumentSchema>;
export type TransactionInfo = z.infer<typeof TransactionInfoSchema>;
export type PromotionalMessage = z.infer<typeof PromotionalMessageSchema>;
export type SepaElvTransactionInfo = z.infer<typeof SepaElvTransactionInfoSchema>;
export type PrintMessage = z.infer<typeof PrintMessageSchema>;
export type EmiDetails = z.infer<typeof EmiDetailsSchema>;
export type OceanGatewayInfo = z.infer<typeof OceanGatewayInfoSchema>;

export type OverrideMerchantTender = z.infer<typeof OverrideMerchantTenderSchema>;
export type TaxableAmountRate = z.infer<typeof TaxableAmountRateSchema>;
export type ServiceChargeAmount = z.infer<typeof ServiceChargeAmountSchema>;
export type AdditionalCharge = z.infer<typeof AdditionalChargeSchema>;
export type PaymentRef = z.infer<typeof PaymentRefSchema>;