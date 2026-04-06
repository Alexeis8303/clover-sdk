import { ApiResource } from "../core/ApiResource.js"
import {
  HostedCheckoutCreateInputSchema,
  HostedCheckoutResponseSchema,
  type HostedCheckoutCreateInput,
  type HostedCheckoutResponse,
} from "../types/shoppingCart.js" 


export class HostedCheckoutResource extends ApiResource {
  /**
   * Crea una sesión de Hosted Checkout y devuelve el enlace de pago.
   */
  async create(input: HostedCheckoutCreateInput): Promise<HostedCheckoutResponse> {
    // Validación fuerte con tu schema
    const validatedInput = HostedCheckoutCreateInputSchema.parse(input);

    const payload = {
      customer: validatedInput.customer,
      redirectUrls: validatedInput.redirectUrls,
      shoppingCart: validatedInput.shoppingCart,
      // tips: { enabled: true }, // descomentar para  habilitar propinas por defecto
    };

    try {
      // Se usa el método raw del client porque la URL base es diferente
      const responseData = await this.client.requestRaw<unknown>(
        "POST",
        "/invoicingcheckoutservice/v1/checkouts",
        payload,
        true
      );

      const parsed = HostedCheckoutResponseSchema.parse(responseData);

      if (!parsed.href) {
        throw new Error("La respuesta de Clover no incluyó el campo 'href' (enlace de pago)");
      }

      return parsed;
    } catch (error) {      
      throw error;
    }
  }
}