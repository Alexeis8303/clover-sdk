import { z } from "zod";

// ============================================================================
// MERCHANT & EMPLOYEES ENUMS
// ============================================================================

export const RoleEnum = z.enum([
  "OWNER",
  "ADMIN",
  "MANAGER",
  "EMPLOYEE",
  "SUPER_ADMIN"
]);


// ============================================================================
// CARD & PAYMENT ENUMS
// ============================================================================

export const CardTypeEnum = z.enum([
  "VISA", "MC", "AMEX", "DISCOVER", "DINERS_CLUB", "JCB",
  "MAESTRO", "SOLO", "LASER", "CHINA_UNION_PAY", "CARTE_BLANCHE",
  "UNKNOWN", "GIFT_CARD", "EBT", "GIROCARD", "INTERAC", "OTHER", "RUPAY"
]);

export const CardEntryTypeEnum = z.enum([
  "SWIPED", "KEYED", "VOICE", "VAULTED", "OFFLINE_SWIPED",
  "OFFLINE_KEYED", "EMV_CONTACT", "EMV_CONTACTLESS", "MSD_CONTACTLESS",
  "PINPAD_MANUAL_ENTRY", "QR_CODE", "SCANNED"
]);

export const CardTransactionTypeEnum = z.enum([
  "AUTH", "PREAUTH", "PREAUTH_CAPTURE", "ADJUST", "VOID", "VOID_RETURN",
  "RETURN", "REFUND", "NAKED_REFUND", "GET_BALANCE", "BATCH_CLOSE",
  "ACTIVATE", "BALANCE_LOCK", "LOAD", "CASH_OUT", "CASH_OUT_ACTIVE_STATUS",
  "REDEMPTION", "REDEMPTION_UNLOCK", "RELOAD", "CASH_ADVANCE",
  "VOID_CREDIT", "REFUND_CREDIT", "INTERNET_ACTIVATE", "TOKEN_REQUEST",
  "VERIFICATION"
]);

export const CardTransactionStateEnum = z.enum(["PENDING", "CLOSED"]);

export const AvsResultEnum = z.enum([
  "SUCCESS", "ZIP_CODE_MATCH", "ZIP_CODE_MATCH_ADDRESS_NOT_CHECKED",
  "ADDRESS_MATCH", "ADDRESS_MATCH_ZIP_NOT_CHECKED", "NEITHER_MATCH",
  "SERVICE_FAILURE", "SERVICE_UNAVAILABLE", "NOT_CHECKED",
  "ZIP_CODE_NOT_MATCHED_ADDRESS_NOT_CHECKED",
  "ADDRESS_NOT_MATCHED_ZIP_CODE_NOT_CHECKED"
]);

export const GatewayTxStateEnum = z.enum([
  "INITIATED", "INITIATED_ON_AUTH", "ACKNOWLEDGED", "CONNECT_FAILED",
  "TIMEOUT", "FAILED", "REVERSE_INITIATED", "REVERSE_INITIATED_ON_AUTH",
  "REVERSED", "REVERSAL_FAILED", "EXTERNAL"
]);

export const AccountSelectionEnum = z.enum(["CREDIT", "DEBIT", "CHECKING", "SAVINGS"]);

export const SelectedServiceEnum = z.enum([
  "NONE", "PAYMENT", "REFUND", "CANCELLATION", "PRE_AUTH",
  "UPDATE_PRE_AUTH", "PAYMENT_COMPLETION", "CASH_ADVANCE",
  "DEFERRED_PAYMENT", "DEFERRED_PAYMENT_COMPLETION", "VOICE_AUTHORISATION",
  "CARDHOLDER_DETECTION", "TOKEN_REQUEST", "VERIFICATION"
]);

export const TransactionResultEnum = z.enum([
  "APPROVED", "DECLINED", "ABORTED", "VOICE_AUTHORISATION",
  "PAYMENT_PART_ONLY", "PARTIALLY_APPROVED", "NONE"
]);

export const ReversalReasonEnum = z.enum([
  "CHIP_DECLINE", "CARDHOLDER_CANCELLATION", "COMMUNICATION_ERROR", "OTHER_REASON"
]);

export const PrintMessageDestinationEnum = z.enum([
  "CUSTOMER_DISPLAY", "CUSTOMER_RECEIPT", "CUSTOMER_RECEIPT_AID_PARAM",
  "MERCHANT_DISPLAY", "MERCHANT_RECEIPT", "MERCHANT_RECEIPT_AID_PARAM"
]);

export const RefundStatusEnum = z.enum(["FAIL", "SUCCESS", "PENDING"]);

export const TxFormatEnum = z.enum(["DEFAULT", "NEXO"]);

export const PaymentResultEnum = z.enum([
  "SUCCESS", "FAIL", "INITIATED", "VOIDED", "VOIDING", "VOID_FAILED",
  "AUTH", "AUTH_COMPLETED", "DISCOUNT", "OFFLINE_RETRYING", "PENDING"
]);

export const VoidReasonEnum = z.enum([
  "USER_CANCEL", "TRANSPORT_ERROR", "REJECT_SIGNATURE", "REJECT_PARTIAL_AUTH",
  "NOT_APPROVED", "FAILED", "AUTH_CLOSED_NEW_CARD", "DEVELOPER_PAY_PARTIAL_AUTH",
  "REJECT_DUPLICATE", "REJECT_OFFLINE", "GIFTCARD_LOAD_FAILED",
  "USER_GIFTCARD_LOAD_CANCEL", "DEVELOPER_PAY_TIP_ADJUST_FAILED",
  "USER_CUSTOMER_CANCEL", "FRAUD", "REJECT_GREATER_APPROVED_AMOUNT", "TIMEOUT"
]);

export const VoidReasonCodeEnum = z.enum([
  "CANCEL_PAYMENT_ADJUST", "BREAK_RESET", "CANCEL", "AUTH_FAILED", "NETWORK_FAILED",
  "NON_OK_RESULT_CODE_RETURNED_FROM_VERIFY_CVM", "PARTIAL_AUTH_NOT_ALLOWED",
  "PARTIAL_AUTH_CANCELLED", "QUICK_CHIP_DECLINE", "KERNEL_DECLINE",
  "NON_OK_RESULT_CODE_FROM_FORCE_ACCEPT", "MERCHANT_CANCELLED_THE_FORCE_ACCEPTANCE",
  "CARD_READER_ERROR", "UNKNOWN_EXCEPTION", "ERROR_EVENT", "KERNEL_EXCEPTION",
  "FATAL_EXCEPTION", "CARD_CHECK_FAILED_FOR_REVERSAL", "MANUAL_ENTRY_NOT_ALLOWED",
  "MANUAL_ENTRY_NOT_ALLOWED_FOR_CARD", "SWIPE_CARD_CHECK_FAILED_FOR_REVERSAL",
  "OFFLINE_AUTH_FAILED", "TXN_STATUS_DECLINED", "COMPLETION_DEVICE",
  "NON_OK_RESULT_CODE_FROM_DUPLICATE_CHECK", "MERCHANT_CANCELLED_THE_DUPLICATE_CHECK",
  "NON_OK_RESULT_CODE_RETURNED_FROM_OFFLINE_SCREEN", "MERCHANT_CANCELLED_OFFLINE_PAYMENT",
  "OFFLINE_AUTH_FAILED_ON_CARD_PRESENT_REVERSAL", "QUICK_CHIP_TIME_OUT",
  "HANDLE_PAY_STATE", "HANDLE_CONTACT_REQUIRED", "FINALIZE",
  "HANDLE_CARD_DECLINED_TXN_STATUS", "MERCHANT_REASON"
]);

export const SignatureEntryLocationEnum = z.enum(["ON_SCREEN", "ON_PAPER", "NONE"]);

export const TipModeEnum = z.enum([
  "TIP_PROVIDED", "ON_SCREEN_BEFORE_PAYMENT", "ON_SCREEN_AFTER_PAYMENT",
  "ON_PAPER", "NO_TIP"
]);

export const TaxIndicatorEnum = z.enum(["UNKNOWN", "TAXABLE", "NON_TAXABLE"]);

export const IdTypeEnum = z.enum([
  "DRIVERS_LICENSE", "PASSPORT", "US_MILITARY_ID", "US_RESIDENT",
  "CONSULAR_ID", "CANADIAN_CITIZEN", "US_STATE_GOVT_ID", "OTHER_ID"
]);

export const TerminalComponentTypeEnum = z.enum([
  "ACQUIRER_PROTOCOL_PARAMS", "APPLICATION_PARAMS", "TERMINAL_PARAMS",
  "SECURITY_PARAMS", "SERVER", "TERMINAL", "DEVICE", "SECURE_MODULE",
  "PAYMENT_APPLICATION", "EMV_KERNEL", "EMV_LEVEL1", "MIDDLEWARE",
  "DRIVER", "OPERATING_SYSTEM", "MERCHANT_PARAMS", "CERTIFICATE_PARAMS",
  "TMS_PROTOCOL_PARAMS"
]);

export const AuthTypeEnum = z.enum(["TAB", "AUTH"]);

export const HoursAvailableEnum = z.enum(["ALL", "BUSINESS", "CUSTOM"]);

export const CustomerIdMethodEnum = z.enum(["NAME", "TABLE", "NAME_TABLE"]);

export const PaymentStateEnum = z.enum([
  "OPEN", "PAID", "REFUNDED", "CREDITED", "PARTIALLY_PAID", "PARTIALLY_REFUNDED"
]);

export const PayTypeEnum = z.enum([
  "SPLIT_GUEST", "SPLIT_ITEM", "SPLIT_CUSTOM", "FULL"
]);

export const OrderStateEnum = z.enum(["open", "OPEN", "locked", "LOCKED", "deleted", "DELETED", "hidden", "HIDDEN"]);

// ============================================================================
// TAX & DISCOUNT ENUMS
// ============================================================================

export const TaxTypeEnum = z.enum([
  "VAT_TAXABLE", "VAT_NON_TAXABLE", "VAT_EXEMPT", "INTERNAL_TAX", "PARTNER_TAX"
]);

export const AdditionalChargeTypeEnum = z.enum([
  "INTERAC", "CREDIT_SURCHARGE", "CONVENIENCE_FEE", "INTERAC_V2", "DELIVERY_FEE"
]);

export const AgeRestrictedTypeEnum = z.enum([
  "Alcohol", "Tobacco", "OTC products", "Vitamin & Supplements"
]);
// ============================================================================
// INVENTORY ENUMS
// ============================================================================

export const PriceTypeEnum = z.enum(["FIXED", "VARIABLE", "PER_UNIT"]);

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CardType = z.infer<typeof CardTypeEnum>;
export type CardEntryType = z.infer<typeof CardEntryTypeEnum>;
export type CardTransactionType = z.infer<typeof CardTransactionTypeEnum>;
export type CardTransactionState = z.infer<typeof CardTransactionStateEnum>;
export type AvsResult = z.infer<typeof AvsResultEnum>;
export type GatewayTxState = z.infer<typeof GatewayTxStateEnum>;
export type AccountSelection = z.infer<typeof AccountSelectionEnum>;
export type SelectedService = z.infer<typeof SelectedServiceEnum>;
export type TransactionResult = z.infer<typeof TransactionResultEnum>;
export type ReversalReason = z.infer<typeof ReversalReasonEnum>;
export type PrintMessageDestination = z.infer<typeof PrintMessageDestinationEnum>;
export type RefundStatus = z.infer<typeof RefundStatusEnum>;
export type TxFormat = z.infer<typeof TxFormatEnum>;
export type PaymentResult = z.infer<typeof PaymentResultEnum>;
export type VoidReason = z.infer<typeof VoidReasonEnum>;
export type VoidReasonCode = z.infer<typeof VoidReasonCodeEnum>;
export type SignatureEntryLocation = z.infer<typeof SignatureEntryLocationEnum>;
export type TipMode = z.infer<typeof TipModeEnum>;
export type TaxIndicator = z.infer<typeof TaxIndicatorEnum>;
export type IdType = z.infer<typeof IdTypeEnum>;
export type TerminalComponentType = z.infer<typeof TerminalComponentTypeEnum>;
export type AuthType = z.infer<typeof AuthTypeEnum>;
export type HoursAvailable = z.infer<typeof HoursAvailableEnum>;
export type CustomerIdMethod = z.infer<typeof CustomerIdMethodEnum>;
export type PaymentState = z.infer<typeof PaymentStateEnum>;
export type PayType = z.infer<typeof PayTypeEnum>;
export type OrderState = z.infer<typeof OrderStateEnum>;
export type TaxType = z.infer<typeof TaxTypeEnum>;
export type AdditionalChargeType = z.infer<typeof AdditionalChargeTypeEnum>;
export type AgeRestrictedType = z.infer<typeof AgeRestrictedTypeEnum>;
export type PriceType = z.infer<typeof PriceTypeEnum>;
export type Role = z.infer<typeof RoleEnum>;