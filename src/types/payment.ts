
import { z } from "zod";
import {
  IdRefSchema,
  AmountSchema,
  TimestampSchema,
  GenericExtraSchema,
  GenericAttributesSchema,
  PercentageDecimalSchema,
  LocaleSchema
} from "./base";
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
  ReversalReasonEnum
} from "./enums";
import { CustomerSchema, VaultedCardSchema } from "./customer";
import { RefundSchema } from "./refund";

// ============================================================================
// CARD TRANSACTION COMPONENTS
// ============================================================================

export const PromotionalMessageSchema = z.looseObject({
  message: z.string(),
  showOnMerchantReceipt: z.boolean(),
  showOnCustomerReceipt: z.boolean(),
  showOnDisplay: z.boolean()
});

export const SepaElvTransactionInfoSchema = z.looseObject({
  receiptFormat: z.string().optional(),
  extAppLabel: z.string().optional(),
  preNotification: z.string().optional(),
  mandate: z.string().optional(),
  creditorId: z.string().optional(),
  mandateId: z.string().optional(),
  iban: z.string().optional(),
  isMerchantForced: z.boolean().optional()
});

export const PrintMessageSchema = z.looseObject({
  destination: PrintMessageDestinationEnum.optional(),
  content: z.string().optional()
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
  begBalance: AmountSchema,
  endBalance: AmountSchema,
  avsResult: AvsResultEnum.optional(),
  cardholderName: z.string().optional(),
  token: z.string().optional(),
  vaultedCard: VaultedCardSchema.optional(),
  gatewayTxState: GatewayTxStateEnum.optional(),
  currency: z.string().length(3).optional(),
  captured: z.boolean().optional()
});

export const TransactionInfoSchema = z.looseObject({
  languageIndicator: z.string().length(2).optional(),
  transactionLocale: LocaleSchema.optional(),
  accountSelection: AccountSelectionEnum.optional(),
  fiscalInvoiceNumber: z.string().regex(/^\d{12}$/).optional(),
  installmentsQuantity: z.number().int().min(1).max(999).optional(),
  installmentsPlanCode: z.string().optional(),
  installmentsPlanId: z.string().optional(),
  installmentsPlanDesc: z.string().optional(),
  cardTypeLabel: z.string().optional(),
  cardSymbol: z.string().optional(),
  stan: z.number().int().optional(),
  identityDocument: z.looseObject({
    id: z.string(),
    type: z.string(),
    number: z.string(),
    createdTime: TimestampSchema.optional(),
    modifiedTime: TimestampSchema.optional(),
    deletedTime: TimestampSchema.optional()
  }).optional(),
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
  promotionalMessage: PromotionalMessageSchema.optional(),
  sepaElvTransactionInfo: SepaElvTransactionInfoSchema.optional(),
  clientCardType: CardTypeEnum.optional(),
  explicitlySelectedApp: z.string().optional(),
  isSepaElv: z.boolean().optional(),
  cardEntryType: CardEntryTypeEnum.optional(),
  printMessages: z.array(PrintMessageSchema).optional()
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
  totalPayable: z.string().optional()
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
  emiDetails: EmiDetailsSchema.optional()
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
  sepaElvIban: z.string().optional()
});

export const AppTrackingSchema = z.looseObject({
  developerAppId: z.string().uuid().optional(),
  applicationName: z.string().optional(),
  applicationID: z.string().optional(),
  applicationVersion: z.string().optional(),
  sourceSDK: z.string().optional(),
  sourceSDKVersion: z.string().optional()
});

// ============================================================================
// PAYMENT SETTINGS & OPTIONS
// ============================================================================

export const TipSuggestionSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  percentage: z.number().int().optional(),
  amount: AmountSchema,
  isEnabled: z.boolean().optional(),
  flatTip: AmountSchema
});

export const CashbackSuggestionSchema = z.looseObject({
  amount: AmountSchema
});

export const RegionalExtrasSchema = z.looseObject({
  default: z.string().optional(),
  disableCreditSurcharge: z.boolean().default(false)
});

export const ReceiptOptionsSchema = z.looseObject({
  default: z.string().optional(),
  remoteReceipts: z.boolean().optional()
});

export const TransactionSettingsSchema = z.looseObject({
  cardEntryMethods: z.number().int().optional(),
  disableCashBack: z.boolean().default(false),
  cloverShouldHandleReceipts: z.boolean().default(true),
  forcePinEntryOnSwipe: z.boolean().default(false),
  disableRestartTransactionOnFailure: z.boolean().default(false),
  allowOfflinePayment: z.boolean().default(false),
  approveOfflinePaymentWithoutPrompt: z.boolean().default(false),
  forceOfflinePayment: z.boolean().default(false),
  signatureThreshold: AmountSchema,
  signatureEntryLocation: SignatureEntryLocationEnum.optional(),
  tipMode: TipModeEnum.optional(),
  tippableAmount: AmountSchema,
  disableReceiptSelection: z.boolean().default(false),
  disableDuplicateCheck: z.boolean().default(false),
  autoAcceptPaymentConfirmations: z.boolean().default(false),
  autoAcceptSignature: z.boolean().default(false),
  returnResultOnTransactionComplete: z.boolean().default(false),
  tipSuggestions: z.array(TipSuggestionSchema).optional(),
  cashbackSuggestions: z.array(CashbackSuggestionSchema).optional(),
  regionalExtras: RegionalExtrasSchema.optional(),
  receiptOptions: ReceiptOptionsSchema.optional()
});

export const DccInfoSchema = z.looseObject({
  inquiryRateId: z.number().int().optional(),
  dccApplied: z.boolean().optional(),
  foreignCurrencyCode: z.string().optional(),
  foreignAmount: AmountSchema,
  exchangeRate: z.number().optional(),
  marginRatePercentage: z.string().optional(),
  exchangeRateSourceName: z.string().optional(),
  exchangeRateSourceTimeStamp: z.string().optional(),
  dccEligible: z.boolean().optional(),
  exchangeRateId: z.string().optional(),
  rateRequestId: z.string().optional(),
  baseAmount: AmountSchema,
  baseCurrencyCode: z.string().optional()
});

export const SignatureDisclaimerSchema = z.looseObject({
  disclaimerText: z.string().optional(),
  disclaimerValues: z.looseObject({ default: z.string().optional() }).optional()
});

export const CashAdvanceCustomerIdentificationSchema = z.looseObject({
  idType: IdTypeEnum.optional(),
  serialNumber: z.string().optional(),
  maskedSerialNumber: z.string().optional(),
  encryptedSerialNumber: z.string().optional(),
  expirationDate: z.string().regex(/^\d{8}$/).optional(),
  issuingState: z.string().optional(),
  issuingCountry: z.string().optional(),
  customerName: z.string().optional(),
  addressStreet1: z.string().optional(),
  addressStreet2: z.string().optional(),
  addressCity: z.string().optional(),
  addressState: z.string().optional(),
  addressZipCode: z.string().optional(),
  addressCountry: z.string().optional(),
  tellerID: z.number().int().optional()
});

export const CashAdvanceExtraSchema = z.looseObject({
  cashAdvanceSerialNum: z.string().optional(),
  cashAdvanceCustomerIdentification: CashAdvanceCustomerIdentificationSchema.optional()
});

// ============================================================================
// PURCHASE CARD DATA (L2/L3)
// ============================================================================

export const PurchaseCardL2Schema = z.looseObject({
  taxAmount: AmountSchema,
  taxIndicator: TaxIndicatorEnum.optional(),
  vatTaxAmount: AmountSchema,
  vatTaxRate: z.number().int().optional(),
  purchaseIdentifier: z.string().optional(),
  pcOrderNumber: z.string().optional(),
  discountAmount: AmountSchema,
  freightAmount: AmountSchema,
  dutyAmount: AmountSchema,
  destinationPostalCode: z.string().optional(),
  shipFromPostalCode: z.string().optional(),
  destinationCountryCode: z.string().optional(),
  merchantTaxId: z.string().optional(),
  productDescription: z.string().optional()
});

export const PurchaseCardL3LineItemSchema = z.looseObject({
  itemDescription: z.string().max(26).optional(),
  productCode: z.string().optional(),
  unitCost: AmountSchema,
  quantity: z.number().int().optional(),
  discountAmount: AmountSchema,
  unitOfMeasure: z.string().optional(),
  commodityCode: z.string().optional()
});

export const PurchaseCardL3Schema = z.looseObject({
  serviceCode: z.string().optional(),
  magneticStripeInd: z.boolean().optional(),
  level3LineItems: z.array(PurchaseCardL3LineItemSchema).optional()
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
  assessmentIdentifier: z.string().optional()
});

export const TerminalManagementComponentSchema = z.looseObject({
  type: TerminalComponentTypeEnum.optional(),
  itemNumber: z.string().optional(),
  provider: z.string().optional(),
  serial: z.string().optional(),
  version: z.string().optional(),
  identification: z.string().optional(),
  standard: TerminalStandardSchema.optional()
});

export const EmiInfoSchema = z.looseObject({
  mobileNumber: z.string().optional(),
  indicator: z.string().optional(),
  transactionAmount: AmountSchema,
  productAmount: AmountSchema,
  discountAmount: AmountSchema,
  tenure: z.number().int().optional(),
  interestRate: z.number().optional(),
  interestAmount: AmountSchema,
  processingFee: AmountSchema,
  totalAmount: AmountSchema,
  amountPerMonth: AmountSchema
});

// ============================================================================
// VOID REASON DETAILS
// ============================================================================

export const VoidReasonDetailsSchema = z.looseObject({
  txError: z.string().optional(),
  voidReasonCode: VoidReasonCodeEnum.optional(),
  description: z.string().optional(),
  descriptionEnum: z.string().optional(),
  payFailureMessage: z.string().optional()
});

// ============================================================================
// LINE ITEM PAYMENT (Para payments dentro de line items)
// ============================================================================

export const LineItemPaymentSchema = z.looseObject({
  id: z.string().optional(),
  percentage: z.number().int().optional(),
  binName: z.string().optional(),
  refunded: z.boolean().optional()
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
  purchaseCardL2: PurchaseCardL2Schema.optional(),
  purchaseCardL3: PurchaseCardL3Schema.optional(),
  oceanGatewayInfo: OceanGatewayInfoSchema.optional(),
  terminalManagementComponents: z.array(TerminalManagementComponentSchema).optional(),
  emiInfo: EmiInfoSchema.optional()
});

// ============================================================================
// CLOSING PAYMENT (Para authorizations)
// ============================================================================

export const ClosingPaymentSchema = z.looseObject({
  id: z.string().optional()
});

// ============================================================================
// DEBIT REFUND
// ============================================================================

export const DebitRefundSchema = z.looseObject({
  debitTransactionRouteInd: z.string().optional(),
  isDebitTransactionRefundable: z.boolean().optional()
});

// ============================================================================
// SERVICE CHARGE (Para payments)
// ============================================================================

export const PaymentServiceChargeSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string().optional(),
  amount: AmountSchema.optional()
});

// ============================================================================
// ADDITIONAL CHARGE (Para payments)
// ============================================================================

export const PaymentAdditionalChargeSchema = z.looseObject({
  id: z.string().optional(),
  amount: AmountSchema.optional(),
  rate: z.number().int().optional(),
  type: AdditionalChargeTypeEnum.optional(),
  attributes: GenericAttributesSchema.optional()
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
  transactionRef: IdRefSchema.optional()
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
  instructions: z.string().optional()
});

// ============================================================================
// PAYMENT MAIN SCHEMA
// ============================================================================


export const PaymentSchema = z.looseObject({
   // === Identificación ===
  id: z.string(),

  // === Referencias ===
  order: IdRefSchema.optional(),
  device: IdRefSchema.optional(),
  tender: IdRefSchema.optional(),
  employee: IdRefSchema.optional(),
  merchant: IdRefSchema,

  // === Montos ===
  amount: AmountSchema,
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
  offline: z.boolean().default(false),
  result: PaymentResultEnum.optional(),

  // === Transacción de tarjeta ===
  cardTransaction: CardTransactionSchema.optional(),
  debitRefund: DebitRefundSchema.optional().optional(),

  // === Cargos adicionales ===
  serviceCharge: PaymentServiceChargeSchema.optional(),
  additionalCharges: z.array(PaymentAdditionalChargeSchema).optional(),

  // === Impuestos ===
  taxRates: z.array(PaymentTaxRateSchema).optional(),

  // === Reembolsos (referencia circular con lazy) ===
  refunds: z.array(z.lazy(() => RefundSchema)).optional(),

  // === Autorizaciones y voids ===
  authorization: IdRefSchema.optional(),
  voidPaymentRef: IdRefSchema.optional(),
  voidReason: VoidReasonEnum.optional(),
  voidReasonDetails: VoidReasonDetailsSchema.optional(),

  // === Mensajes de fallo ===
  payFailureMessage: z.string().optional(),

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
  

  // === Incrementos (authorizations incrementales) ===
  increments: z.array(IncrementSchema).optional(),
  
  // === Purchase Card ===
  purchaseCardL2: PurchaseCardL2Schema.optional(),
  purchaseCardL3: PurchaseCardL3Schema.optional(),
  
  // === Terminal Management ===
  terminalManagementComponents: z.array(TerminalManagementComponentSchema).optional(),
  
  // === EMI Info ===
  emiInfo: EmiInfoSchema.optional(),

  // === Line Item Payments ===
  lineItemPayments: z.array(LineItemPaymentSchema).optional(),
  
  // === Closing Payment (para authorizations) ===
  closingPayment: ClosingPaymentSchema.optional(),
  
  // === Tab Name (para authorizations) ===
  tabName: z.string().optional(),
  
  // === Auth Code (lowercase según JSON) ===
  authcode: z.string().optional(),
  
  // === Note ===
  note: z.string().optional()
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
export type Payment = z.infer<typeof PaymentSchema>;