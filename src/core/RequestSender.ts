import { sleep } from "../utils/sleep"
import { shouldRetry } from "../utils/shouldRetry"
import { getRetryDelay } from "../utils/getRetryDelay"
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';


export interface RequestConfig {
  baseUrl: string
  merchantId: string
  accessToken: string

  maxRetries?: number
  // Soporte para Hosted Checkout
  hostedCheckoutPrivateKey?: string
}

export class RequestSender {

  private client: AxiosInstance

  constructor(private config: RequestConfig) {
    this.client = axios.create({
      baseURL: `${config.baseUrl}/v3/merchants/${config.merchantId}`,
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Content-Type": "application/json"
      },
      timeout: 15000
    })
  }

  async request<T = unknown>(
    method: string,
    path: string,
    body?: any
  ): Promise<T> {

    const retries = this.config.maxRetries ?? 1

    for (let attempt = 0; attempt <= retries; attempt++) {

      try {
        const response: AxiosResponse<T> = await this.client.request({
          method,
          url: path,
          data: body
        })

        return response.data

      } catch (err) {

        const error = err as AxiosError

        const status = error.response?.status

        if (
          attempt < retries &&
          status &&
          shouldRetry(status)
        ) {
          const delay = getRetryDelay(error.response!, attempt)
          await sleep(delay)
          continue
        }

        if (error.response) {
          throw new Error(
            `Clover API error ${error.response.status}: ${JSON.stringify(error.response.data)}`
          )
        }

        if (attempt >= retries) {
          throw error
        }

        const delay = 2 ** attempt * 200
        await sleep(delay)
      }


    }

    throw new Error("Max retries exceeded");

  }

  /**
 * Método especial para Hosted Checkout (y otros servicios Ecommerce)
 * - Usa baseUrl completa del servicio
 * - Incluye X-Clover-Merchant-Id
 * - Usa privateKey en Authorization
 */
  async requestRaw<T = unknown>(
    method: string,
    fullPath: string,                    // Ej: "/invoicingcheckoutservice/v1/checkouts"
    body?: any,
    isHostedCheckout: boolean = false
  ): Promise<T> {
    const retries = this.config.maxRetries ?? 1;
    let url: string;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      accept: "application/json",
    };

    if (isHostedCheckout && this.config.hostedCheckoutPrivateKey) {
      // Hosted Checkout usa su propia URL base y private key
      const base = this.config.baseUrl;

      url = `${base}${fullPath}`;

      headers.Authorization = `Bearer ${this.config.hostedCheckoutPrivateKey}`;
      headers["X-Clover-Merchant-Id"] = this.config.merchantId;
    } else {
      // Comportamiento normal (Platform API)
      url = `${this.config.baseUrl}/v3/merchants/${this.config.merchantId}${fullPath}`;
      headers.Authorization = `Bearer ${this.config.accessToken}`;
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response: AxiosResponse<T> = await axios.request({
          method,
          url,
          headers,
          data: body,
          timeout: 15000
        })

        return response.data
      } catch (err) {
        const error = err as AxiosError
        const status = error.response?.status

        if (
          attempt < retries &&
          status &&
          shouldRetry(status)
        ) {
          const delay = getRetryDelay(error.response!, attempt)
          await sleep(delay)
          continue
        }

        if (error.response) {
          throw new Error(
            `Clover API error ${error.response.status}: ${JSON.stringify(error.response.data)}`
          )
        }

        if (attempt >= retries) {
          throw error
        }

        const delay = 2 ** attempt * 200
        await sleep(delay)
      }
    }
  
    throw new Error("Max retries exceeded");
  }

}