import { RequestSender } from "./RequestSender.js"

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

  protected buildUrl(filter: Record<string, string[]> = {},offset: number, limit: number, expand: string[] = []) {
        const params = new URLSearchParams();

        params.append('offset', offset.toString());
        params.append('limit', limit.toString());


        if (expand.length > 0) {
            params.append('expand', expand.join(','));
        }

        for (const [key, values] of Object.entries(filter)) {
            if (!values || values.length === 0) continue;

            const cleanValues = values.filter(v => v != null && v !== '');

            if (cleanValues.length === 0) continue;

            if (cleanValues.length === 1) {
                // Caso: un solo valor → filter=key=value
                params.append('filter', `${key}=${cleanValues[0]}`);
            } else {
                // Caso: múltiples valores → filter=key in ('val1','val2',...)
                const quotedValues = cleanValues
                    .map(v => `'${v.replace(/'/g, "''")}'`)   // escapamos comillas simples
                    .join(',');

                params.append('filter', `${key} in (${quotedValues})`);
            }
        }

        return params.toString();
    }
}