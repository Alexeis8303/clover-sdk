
import { z } from "zod";
import {
  IdRefSchema,
  AmountSchema,
  TimestampSchema,
  GenericExtraSchema,
  GenericAttributesSchema,
  LocaleSchema,
  ExpandedResponseSchema,
  IdRef,
  Amount,
  Timestamp
} from "./base.js";
import {
  CardTypeEnum,
  CardEntryTypeEnum,
  CardTransactionTypeEnum,
  CardTransactionStateEnum,
  AvsResultEnum,
  GatewayTxStateEnum,
  AccountSelectionEnum,
  PrintMessageDestinationEnum,
  TxFormatEnum,
  PaymentResultEnum,
  VoidReasonEnum,
  VoidReasonCodeEnum,
  SignatureEntryLocationEnum,
  TipModeEnum,
  TaxIndicatorEnum,
  IdTypeEnum,
  TerminalComponentTypeEnum,
  AdditionalChargeTypeEnum,
  SelectedServiceEnum,
  TransactionResultEnum,
  ReversalReasonEnum,
  PaymentResult,
  VoidReason
} from "./enums.js";
import { VaultedCardSchema } from "./customer.js";
import { RefundSchema } from "./refund.js";
import { OrderSchema } from "./order.js";
import type { Order } from "./order.js";

// ============================================================================
// DEBIT REFUND
// ============================================================================

export const DebitRefundSchema = z.looseObject({
  debitTransactionRouteInd: z.string().optional(),
  isDebitTransactionRefundable: z.boolean().optional(),
});

// ============================================================================
// CARD TRANSACTION COMPONENTS
// ============================================================================
export const IdentityDocumentSchema = z.looseObject({
  id: z.string().optional(),
  type: z.string().optional(),
  number: z.string().optional(),
  createdTime: TimestampSchema.optional(),
  modifiedTime: TimestampSchema.optional(),
  deletedTime: TimestampSchema.optional(),
  payment: IdRefSchema.optional(),
});


export const PromotionalMessageSchema = z.looseObject({
  message: z.string().optional(),
  showOnMerchantReceipt: z.boolean().optional(),
  showOnCustomerReceipt: z.boolean().optional(),
  showOnDisplay: z.boolean().optional(),
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
  destination: PrintMessageDestinationEnum.optional(),
  content: z.string().optional(),
});


export const CardTransactionSchema = z.looseObject({
  cardType: CardTypeEnum.optional(),
  entryType: CardEntryTypeEnum.optional(),
  first6: z.string().length(6).optional(),
  last4: z.string().length(4).optional(),
  type: CardTransactionTypeEnum.optional(),
  authCode: z.string().optional(),
  referenceId: z.string().optional(),
  transactionNo: z.string().optional(),
  state: CardTransactionStateEnum.optional(),
  extra: GenericExtraSchema.optional(),
  begBalance: AmountSchema.optional(),
  endBalance: AmountSchema.optional(),
  avsResult: AvsResultEnum.optional(),
  cardholderName: z.string().optional(),
  token: z.string().optional(),
  vaultedCard: VaultedCardSchema.optional(),
  gatewayTxState: GatewayTxStateEnum.optional(),
  currency: z.string().length(3).optional(),
  captured: z.boolean().optional(),
  debitRefund: DebitRefundSchema.optional(),
});

export const TransactionInfoSchema = z.looseObject({
  languageIndicator: z.string().length(2).optional(),
  transactionLocale: LocaleSchema.optional(),
  accountSelection: AccountSelectionEnum.optional(),
  fiscalInvoiceNumber: z.string().optional(),
  installmentsQuantity: z.number().int().optional(),
  installmentsPlanCode: z.string().optional(),
  installmentsPlanId: z.string().optional(),
  installmentsPlanDesc: z.string().optional(),
  cardTypeLabel: z.string().optional(),
  cardSymbol: z.string().optional(),
  stan: z.number().int().optional(),
  identityDocument: IdentityDocumentSchema.optional(),
  batchNumber: z.string().optional(),
  receiptNumber: z.string().optional(),
  reversalStanRefNum: z.string().optional(),
  reversalStan: z.number().int().optional(),
  reversalMac: z.string().optional(),
  reversalMacKsn: z.string().optional(),
  terminalIdentification: z.string().optional(),
  externalTerminalId: z.string().optional(),
  merchantIdentifier: z.string().optional(),
  merchantNameLocation: z.string().optional(),
  maskedTrack2: z.string().optional(),
  receiptExtraData: z.string().optional(),
  selectedService: SelectedServiceEnum.optional(),
  transactionResult: TransactionResultEnum.optional(),
  transactionTags: z.string().optional(),
  txFormat: TxFormatEnum.optional(),
  panMask: z.string().optional(),
  transactionSequenceCounter: z.string().optional(),
  applicationPanSequenceNumber: z.string().optional(),
  reversalReason: ReversalReasonEnum.optional(),
  isTokenBasedTx: z.boolean().optional(),
  origTransactionSequenceCounter: z.string().optional(),
  transactionSequenceCounterUpdate: z.string().optional(),
  emergencyFlag: z.boolean().optional(),
  entryType: CardEntryTypeEnum.optional(),
  promotionalMessage: PromotionalMessageSchema.optional(),
  sepaElvTransactionInfo: SepaElvTransactionInfoSchema.optional(),
  clientCardType: CardTypeEnum.optional(),
  explicitlySelectedApp: z.string().optional(),
  isSepaElv: z.boolean().optional(),
  cardEntryType: CardEntryTypeEnum.optional(),
  printMessages: z.array(PrintMessageSchema).optional(),
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

// ============================================================================
// PAYMENT SETTINGS & OPTIONS
// ============================================================================

export const TipSuggestionSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string().optional(),
  percentage: z.number().int().optional(),
  amount: AmountSchema.optional(),
  isEnabled: z.boolean().optional(),
  flatTip: AmountSchema.optional(),
});

export const CashbackSuggestionSchema = z.looseObject({
  amount: AmountSchema.optional(),
});

export const RegionalExtrasSchema = z.looseObject({
  default: z.string().optional(),
  disableCreditSurcharge: z.boolean().optional(),
});

export const ReceiptOptionsSchema = z.looseObject({
  default: z.string().optional(),
  remoteReceipts: z.boolean().optional(),
});

export const TransactionSettingsSchema = z.looseObject({
  cardEntryMethods: z.number().int().optional(),
  disableCashBack: z.boolean().optional(),
  cloverShouldHandleReceipts: z.boolean().optional(),
  forcePinEntryOnSwipe: z.boolean().optional(),
  disableRestartTransactionOnFailure: z.boolean().optional(),
  allowOfflinePayment: z.boolean().optional(),
  approveOfflinePaymentWithoutPrompt: z.boolean().optional(),
  forceOfflinePayment: z.boolean().optional(),
  signatureThreshold: AmountSchema.optional(),
  signatureEntryLocation: SignatureEntryLocationEnum.optional(),
  tipMode: TipModeEnum.optional(),
  tippableAmount: AmountSchema.optional(),
  disableReceiptSelection: z.boolean().optional(),
  disableDuplicateCheck: z.boolean().optional(),
  autoAcceptPaymentConfirmations: z.boolean().optional(),
  autoAcceptSignature: z.boolean().optional(),
  returnResultOnTransactionComplete: z.boolean().optional(),
  tipSuggestions: z.array(TipSuggestionSchema).optional(),
  cashbackSuggestions: z.array(CashbackSuggestionSchema).optional(),
  regionalExtras: RegionalExtrasSchema.optional(),
  disableCreditSurcharge: z.boolean().optional(),
  receiptOptions: ReceiptOptionsSchema.optional(),
});

export const DccInfoSchema = z.looseObject({
  inquiryRateId: z.number().int().optional(),
  dccApplied: z.boolean().optional(),
  foreignCurrencyCode: z.string().optional(),
  foreignAmount: AmountSchema.optional(),
  exchangeRate: z.number().optional(),
  marginRatePercentage: z.string().optional(),
  exchangeRateSourceName: z.string().optional(),
  exchangeRateSourceTimeStamp: z.string().optional(),
  dccEligible: z.boolean().optional(),
  exchangeRateId: z.string().optional(),
  rateRequestId: z.string().optional(),
  baseAmount: AmountSchema.optional(),
  baseCurrencyCode: z.string().optional(),
});

export const SignatureDisclaimerSchema = z.looseObject({
  disclaimerText: z.string().optional(),
  disclaimerValues: z.looseObject({
    default: z.string().optional(),
  }).optional(),
});

export const CashAdvanceCustomerIdentificationSchema = z.looseObject({
  idType: IdTypeEnum.optional(),
  serialNumber: z.string().optional(),
  maskedSerialNumber: z.string().optional(),
  encryptedSerialNumber: z.string().optional(),
  expirationDate: z.string().optional(),
  issuingState: z.string().optional(),
  issuingCountry: z.string().optional(),
  customerName: z.string().optional(),
  addressStreet1: z.string().optional(),
  addressStreet2: z.string().optional(),
  addressCity: z.string().optional(),
  addressState: z.string().optional(),
  addressZipCode: z.string().optional(),
  addressCountry: z.string().optional(),
  tellerID: z.number().int().optional(),
});

export const CashAdvanceExtraSchema = z.looseObject({
  cashAdvanceSerialNum: z.string().optional(),
  cashAdvanceCustomerIdentification: CashAdvanceCustomerIdentificationSchema.optional(),
});

// ============================================================================
// PURCHASE CARD DATA (L2/L3)
// ============================================================================

export const PurchaseCardL2Schema = z.looseObject({
  taxAmount: AmountSchema.optional(),
  taxIndicator: TaxIndicatorEnum.optional(),
  vatTaxAmount: AmountSchema.optional(),
  vatTaxRate: z.number().int().optional(),
  purchaseIdentifier: z.string().optional(),
  pcOrderNumber: z.string().optional(),
  discountAmount: AmountSchema.optional(),
  freightAmount: AmountSchema.optional(),
  dutyAmount: AmountSchema.optional(),
  destinationPostalCode: z.string().optional(),
  shipFromPostalCode: z.string().optional(),
  destinationCountryCode: z.string().optional(),
  merchantTaxId: z.string().optional(),
  productDescription: z.string().optional(),
});

export const PurchaseCardL3LineItemSchema = z.looseObject({
  itemDescription: z.string().optional(),
  productCode: z.string().optional(),
  unitCost: AmountSchema.optional(),
  quantity: z.number().int().optional(),
  discountAmount: AmountSchema.optional(),
  unitOfMeasure: z.string().optional(),
  commodityCode: z.string().optional(),
});

export const PurchaseCardL3Schema = z.looseObject({
  serviceCode: z.string().optional(),
  magneticStripeInd: z.boolean().optional(),
  level3LineItems: z.array(PurchaseCardL3LineItemSchema).optional(),
});

// ============================================================================
// TERMINAL MANAGEMENT
// ============================================================================

export const TerminalStandardSchema = z.looseObject({
  component: z.string().optional(),
  identification: z.string().optional(),
  version: z.string().optional(),
  issuer: z.string().optional(),
  type: z.string().optional(),
  assigner: z.string().optional(),
  assessmentIdentifier: z.string().optional(),
});

export const TerminalManagementComponentSchema = z.looseObject({
  type: TerminalComponentTypeEnum.optional(),
  itemNumber: z.string().optional(),
  provider: z.string().optional(),
  serial: z.string().optional(),
  version: z.string().optional(),
  identification: z.string().optional(),
  standard: TerminalStandardSchema.optional(),
});

export const EmiInfoSchema = z.looseObject({
  mobileNumber: z.string().optional(),
  indicator: z.string().optional(),
  transactionAmount: AmountSchema.optional(),
  productAmount: AmountSchema.optional(),
  discountAmount: AmountSchema.optional(),
  tenure: z.number().int().optional(),
  interestRate: z.number().optional(),
  interestAmount: AmountSchema.optional(),
  processingFee: AmountSchema.optional(),
  totalAmount: AmountSchema.optional(),
  amountPerMonth: AmountSchema.optional(),
});

// ============================================================================
// VOID REASON DETAILS
// ============================================================================

export const VoidReasonDetailsSchema = z.looseObject({
  txError: z.string().optional(),
  voidReasonCode: VoidReasonCodeEnum.optional(),
  description: z.string().optional(),
  descriptionEnum: z.string().optional(),
  payFailureMessage: z.string().optional(),
});

// ============================================================================
// LINE ITEM PAYMENT (Para payments dentro de line items)
// ============================================================================

export const LineItemPaymentSchema = z.looseObject({
  id: z.string().optional(),
  percentage: z.number().int().optional(),
  binName: z.string().optional(),
  refunded: z.boolean().optional(),
});

// ============================================================================
// INCREMENT (Para incremental authorizations)
// ============================================================================

export const IncrementSchema = z.looseObject({
  id: z.string().optional(),
  amount: AmountSchema.optional(),
  cardTransaction: CardTransactionSchema.optional(),
  result: PaymentResultEnum.optional(),
  createdTime: TimestampSchema.optional(),
  employee: IdRefSchema.optional(),
  incrementAmount: AmountSchema.optional(),
});
// ============================================================================
// CLOSING PAYMENT (Para authorizations)
// ============================================================================

export const ClosingPaymentSchema = z.looseObject({
  id: z.string().optional()
});


// ============================================================================
// SERVICE CHARGE (Para payments)
// ============================================================================

export const PaymentServiceChargeSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string().optional(),
  amount: AmountSchema.optional(),
});

// ============================================================================
// ADDITIONAL CHARGE (Para payments)
// ============================================================================

export const PaymentAdditionalChargeSchema = z.looseObject({
  id: z.string().optional(),
  amount: AmountSchema.optional(),
  rate: z.number().int().optional(),
  type: AdditionalChargeTypeEnum.optional(),
  attributes: GenericAttributesSchema.optional(),
});

// ============================================================================
// TAX RATE (Para payments)
// ============================================================================

export const PaymentTaxRateSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string().optional(),
  rate: z.number().int().optional(),
  isDefault: z.boolean().optional(),
  taxableAmount: AmountSchema.optional(),
  isVat: z.boolean().optional(),
  taxAmount: AmountSchema.optional(),
});

// ============================================================================
// TENDER (Para payments)
// ============================================================================

export const TenderSchema = z.looseObject({
  id: z.string().optional(),
  editable: z.boolean().optional(),
  labelKey: z.string().optional(),
  label: z.string().optional(),
  opensCashDrawer: z.boolean().optional(),
  supportsTipping: z.boolean().optional(),
  enabled: z.boolean().optional(),
  visible: z.boolean().optional(),
  instructions: z.string().optional(),
});

// ============================================================================
// PAYMENT MAIN SCHEMA
// ============================================================================

export type Payment = {
  id?: string;
  order?: Order;
  device?: IdRef;
  employee?: IdRef;
  merchant?: IdRef;
  tender?: Tender;
  amount?: Amount;
  tipAmount?: Amount;
  taxAmount?: Amount;
  cashbackAmount?: Amount;
  cashTendered?: Amount;
  externalPaymentId?: string;
  externalReferenceId?: string;
  createdTime?: Timestamp;
  clientCreatedTime?: Timestamp;
  gatewayProcessingTime?: Timestamp;
  modifiedTime?: Timestamp;
  offline?: boolean;
  result?: PaymentResult;
  cardTransaction?: CardTransaction;
  serviceCharge?: PaymentServiceCharge;
  additionalCharges?: PaymentAdditionalCharge[];
  taxRates?: PaymentTaxRate[];
  refunds?: unknown;
  note?: string;
  lineItemPayments?: LineItemPayment[];
  authorization?: IdRef;
  voidPaymentRef?: IdRef;
  voidReason?: VoidReason;
  voidReasonDetails?: VoidReasonDetails;
  dccInfo?: DccInfo;
  transactionSettings?: TransactionSettings;
  germanInfo?: GermanInfo;
  oceanGatewayInfo?: OceanGatewayInfo;
  appTracking?: AppTracking;
  cashAdvanceExtra?: CashAdvanceExtra;
  transactionInfo?: TransactionInfo;
  signatureDisclaimer?: SignatureDisclaimer;
  increments?: Increment[];
  purchaseCardL2?: PurchaseCardL2;
  purchaseCardL3?: PurchaseCardL3;
  terminalManagementComponents?: TerminalManagementComponent[];
  emiInfo?: EmiInfo;
};

export const PaymentSchema: z.ZodType<Payment> = z.looseObject({
  // === Identificación ===
  id: z.string().optional(),

  // === Referencias ===
  order: z.lazy(() => OrderSchema).optional(),
  device: IdRefSchema.optional(),
  employee: IdRefSchema.optional(),
  merchant: IdRefSchema.optional(),

  // === Tender ===
  tender: TenderSchema.optional(),

  // === Montos ===
  amount: AmountSchema.optional(),
  tipAmount: AmountSchema.optional(),
  taxAmount: AmountSchema.optional(),
  cashbackAmount: AmountSchema.optional(),
  cashTendered: AmountSchema.optional(),

  // === Identificadores externos ===
  externalPaymentId: z.string().optional(),
  externalReferenceId: z.string().optional(),

  // === Timestamps ===
  createdTime: TimestampSchema.optional(),
  clientCreatedTime: TimestampSchema.optional(),
  gatewayProcessingTime: TimestampSchema.optional(),
  modifiedTime: TimestampSchema.optional(),

  // === Estado ===
  offline: z.boolean().optional(),
  result: PaymentResultEnum.optional(),

  // === Transacción de tarjeta ===
  cardTransaction: CardTransactionSchema.optional(),

  // === Cargos adicionales ===
  serviceCharge: PaymentServiceChargeSchema.optional(),
  additionalCharges: z.array(PaymentAdditionalChargeSchema).optional(),

  // === Impuestos ===
  taxRates: z.array(PaymentTaxRateSchema).optional(),

  // === Reembolsos ===
  refunds: ExpandedResponseSchema(RefundSchema).optional(),

  // === Nota ===
  note: z.string().optional(),

  // === Line Item Payments ===
  lineItemPayments: z.array(LineItemPaymentSchema).optional(),

  // === Autorizaciones y voids ===
  authorization: IdRefSchema.optional(),
  voidPaymentRef: IdRefSchema.optional(),
  voidReason: VoidReasonEnum.optional(),
  voidReasonDetails: VoidReasonDetailsSchema.optional(),

  // === Conversión de moneda ===
  dccInfo: DccInfoSchema.optional(),

  // === Configuración de transacción ===
  transactionSettings: TransactionSettingsSchema.optional(),

  // === Información regional ===
  germanInfo: GermanInfoSchema.optional(),
  oceanGatewayInfo: OceanGatewayInfoSchema.optional(),

  // === Tracking ===
  appTracking: AppTrackingSchema.optional(),

  // === Cash Advance ===
  cashAdvanceExtra: CashAdvanceExtraSchema.optional(),

  // === Información de transacción ===
  transactionInfo: TransactionInfoSchema.optional(),

  // === Disclaimer de firma ===
  signatureDisclaimer: SignatureDisclaimerSchema.optional(),

  // === Incrementos ===
  increments: z.array(IncrementSchema).optional(),

  // === Purchase Card ===
  purchaseCardL2: PurchaseCardL2Schema.optional(),
  purchaseCardL3: PurchaseCardL3Schema.optional(),

  // === Terminal Management ===
  terminalManagementComponents: z.array(TerminalManagementComponentSchema).optional(),

  // === EMI Info ===
  emiInfo: EmiInfoSchema.optional(),
});

// ============================================================================
// WRAPPERS PARA RESPUESTAS DE API
// ============================================================================

// Respuesta de GET /payments/{id}
export const PaymentResponseSchema = PaymentSchema;

// Respuesta de lista (GET /payments)
export const PaymentListResponseSchema = z.object({
  elements: z.array(PaymentSchema).optional(),
  href: z.string().optional()
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CardTransaction = z.infer<typeof CardTransactionSchema>;
export type TransactionInfo = z.infer<typeof TransactionInfoSchema>;
export type PromotionalMessage = z.infer<typeof PromotionalMessageSchema>;
export type SepaElvTransactionInfo = z.infer<typeof SepaElvTransactionInfoSchema>;
export type PrintMessage = z.infer<typeof PrintMessageSchema>;
export type EmiDetails = z.infer<typeof EmiDetailsSchema>;
export type OceanGatewayInfo = z.infer<typeof OceanGatewayInfoSchema>;
export type GermanInfo = z.infer<typeof GermanInfoSchema>;
export type AppTracking = z.infer<typeof AppTrackingSchema>;
export type TipSuggestion = z.infer<typeof TipSuggestionSchema>;
export type CashbackSuggestion = z.infer<typeof CashbackSuggestionSchema>;
export type RegionalExtras = z.infer<typeof RegionalExtrasSchema>;
export type ReceiptOptions = z.infer<typeof ReceiptOptionsSchema>;
export type TransactionSettings = z.infer<typeof TransactionSettingsSchema>;
export type DccInfo = z.infer<typeof DccInfoSchema>;
export type SignatureDisclaimer = z.infer<typeof SignatureDisclaimerSchema>;
export type CashAdvanceCustomerIdentification = z.infer<typeof CashAdvanceCustomerIdentificationSchema>;
export type CashAdvanceExtra = z.infer<typeof CashAdvanceExtraSchema>;
export type PurchaseCardL2 = z.infer<typeof PurchaseCardL2Schema>;
export type PurchaseCardL3LineItem = z.infer<typeof PurchaseCardL3LineItemSchema>;
export type PurchaseCardL3 = z.infer<typeof PurchaseCardL3Schema>;
export type TerminalStandard = z.infer<typeof TerminalStandardSchema>;
export type TerminalManagementComponent = z.infer<typeof TerminalManagementComponentSchema>;
export type EmiInfo = z.infer<typeof EmiInfoSchema>;
export type VoidReasonDetails = z.infer<typeof VoidReasonDetailsSchema>;
export type LineItemPayment = z.infer<typeof LineItemPaymentSchema>;
export type Increment = z.infer<typeof IncrementSchema>;
export type ClosingPayment = z.infer<typeof ClosingPaymentSchema>;
export type DebitRefund = z.infer<typeof DebitRefundSchema>;
export type PaymentServiceCharge = z.infer<typeof PaymentServiceChargeSchema>;
export type PaymentAdditionalCharge = z.infer<typeof PaymentAdditionalChargeSchema>;
export type PaymentTaxRate = z.infer<typeof PaymentTaxRateSchema>;
export type Tender = z.infer<typeof TenderSchema>;