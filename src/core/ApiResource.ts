import { RequestSender } from "./RequestSender"

export class ApiResource {

  constructor(protected client: RequestSender) {}

  protected get(path: string) {
    return this.client.request("GET", path)
  }

  protected post(path: string, body?: any) {
    return this.client.request("POST", path, body)
  }

  protected delete(path: string) {
    return this.client.request("DELETE", path)
  }
}