import { ApiResource } from "../core/ApiResource.js"
import { Employee, EmployeeListResponseSchema, EmployeeSchema } from "../types/employee.js"
import { TaxRate, TaxRateListResponseSchema, TaxRateSchema } from "../types/lineitem.js"
import { Merchant, MerchantSchema } from "../types/merchant.js"
import { OrderType, OrderTypeListResponseSchema, OrderTypeSchema } from "../types/order-type.js"
import { Role, RoleListResponseSchema, RoleSchema } from "../types/roles.js"

import { autoPaginate } from "../utils/autoPagination.js"

export class MerchantsResource extends ApiResource {


    async retrieve(expand:string[] = []): Promise<Merchant> {

        const data = await this.get(`${expand.length > 0 ? `?expand=${expand.join(",")}` : ""}`)      
        return MerchantSchema.parse(data)
    }

  // ============================================================
  // Order Types
  // ============================================================

  async listOrderType(offset: number = 0, limit: number = 100, expand: string[] = []): Promise<{ elements: OrderType[] }> {

    const data = await this.get(`/order_types?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`)

    const parsed = OrderTypeListResponseSchema.parse(data)

    return {
      elements: parsed.elements ?? []
    }
  }

  async *listOrderTypeAutoPaging(limit: number = 100, expand: string[] = []): AsyncGenerator<OrderType> {

    yield* autoPaginate<OrderType>(
      async (offset, limit) => {

        const data = await this.get(
          `/order_types?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""
          }`
        )

        const parsed = OrderTypeListResponseSchema.parse(data)

        return {
          elements: parsed.elements ?? []
        }
      },
      limit
    )
  }

  async retrieveOrderType(orderTypeId: string, expand: string[] = []): Promise<OrderType> {

    const data = await this.get(`/order_types/${orderTypeId}${expand.length > 0 ? `?expand=${expand.join(",")}` : ""
      }`
    )

    return OrderTypeSchema.parse(data)
  }

  // ============================================================
  // Employees
  // ============================================================

  async listEmployees(offset: number = 0, limit: number = 100, expand: string[] = []): Promise<{ elements: Employee[] }> {

    const data = await this.get(`/employees?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`)    

    const parsed = EmployeeListResponseSchema.parse(data)

    return {
      elements: parsed.elements ?? []
    }
  }

  async *listEmployeesAutoPaging(limit: number = 100, expand: string[] = []): AsyncGenerator<Employee> {

    yield* autoPaginate<Employee>(
      async (offset, limit) => {

        const data = await this.get(
          `/employees?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""
          }`
        )

         //console.log("Employees data raw:", JSON.stringify(data, null, 2));

        const parsed = EmployeeListResponseSchema.parse(data)

        return {
          elements: parsed.elements ?? []
        }
      },
      limit
    )
  }

  async retrieveEmployee(employeeId: string, expand: string[] = []): Promise<Employee> {

    const data = await this.get(`/employees/${employeeId}${expand.length > 0 ? `?expand=${expand.join(",")}` : ""
      }`
    )

    return EmployeeSchema.parse(data)
  }

  // ============================================================
  // Roles
  // ============================================================

  async listRoles(offset: number = 0, limit: number = 100, expand: string[] = []): Promise<{ elements: Role[] }> {

    const data = await this.get(`/roles?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`)    

    const parsed = RoleListResponseSchema.parse(data)

    return {
      elements: parsed.elements ?? []
    }
  }

  async *listRolesAutoPaging(limit: number = 100, expand: string[] = []): AsyncGenerator<Role> {

    yield* autoPaginate<Role>(
      async (offset, limit) => {

        const data = await this.get(
          `/roles?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""
          }`
        )

        const parsed = RoleListResponseSchema.parse(data)

        return {
          elements: parsed.elements ?? []
        }
      },
      limit
    )
  }

  async retrieveRole(roleId: string, expand: string[] = []): Promise<Role> {

    const data = await this.get(`/roles/${roleId}${expand.length > 0 ? `?expand=${expand.join(",")}` : ""
      }`
    )

    return RoleSchema.parse(data)
  }

  // ============================================================
  // Tax Rates
  // ============================================================

  async listTaxRates(offset: number = 0, limit: number = 100, expand: string[] = []): Promise<{ elements: TaxRate[] }> {
    const data = await this.get(`/tax_rates?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""}`);
    const parsed = TaxRateListResponseSchema.parse(data);
    return { elements: parsed.elements ?? [] };
  }

  async listTaxRatesFiltering(
          filter: Record<string, string[]> = {},
          offset: number = 0,
          limit: number = 100,
          expand: string[] = []
      ): Promise<{ elements: TaxRate[] }> {
  
  
  
          const url = `/tax_rates?${this.buildUrl(filter,offset, limit, expand)}`;
          const data = await this.get(url);
          const parsed = TaxRateListResponseSchema.parse(data);
  
          return {
              elements: parsed.elements ?? []
          };
      }

  async *listTaxRatesAutoPaging(limit: number = 100, expand: string[] = []): AsyncGenerator<TaxRate> {

    yield* autoPaginate<TaxRate>(
      async (offset, limit) => {

        const data = await this.get(
          `/tax_rates?offset=${offset}&limit=${limit}${expand.length > 0 ? `&expand=${expand.join(",")}` : ""
          }`
        )

        const parsed = TaxRateListResponseSchema.parse(data)

        return {
          elements: parsed.elements ?? []
        }
      },
      limit
    )
  }

  async *listTaxRatesAutoPagingFiltering(filter: Record<string, string[]> = {},limit: number = 100, expand: string[] = []): AsyncGenerator<TaxRate> {
  
          yield* autoPaginate<TaxRate>(
              async (offset, limit) => {
  
                  const url = `/tax_rates?${this.buildUrl(filter,offset, limit, expand)}`;
  
                  const data = await this.get(url)
  
                  const parsed = TaxRateListResponseSchema.parse(data)
                  return {
                      elements: parsed.elements ?? []
                  };
              },
              limit
          )
      }

  async retrieveTaxRate(taxRateId: string, expand: string[] = []): Promise<TaxRate> {
    const data = await this.get(`/tax_rates/${taxRateId}${expand.length > 0 ? `?expand=${expand.join(",")}` : ""}`);
    return TaxRateSchema.parse(data);
  }


}