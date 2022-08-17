# SPFX Consume Northwind Microsoft database from Azure using a Function App 

## Summary

This Webpart consume an anonymous Function App from an HTTP Triger using the templates from the Northwind Microsoft DBs
You must create a database in azure and run the scripts

![Here](https://github.com/jtlivio/react-azurefunction-northwind/blob/master/FAPP.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.15.2-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| react-azurefunction-northwind | Joao Livio @jlivio |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | August 15, 2022 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

- Consume a Function app from SQL Server
- No Authentication is active, only the url code for the Function, must change
- Uses react controls (Listview) - https://pnp.github.io/sp-dev-fx-controls-react/

## References

- [Go and create a database in Azure](https://github.com/Microsoft/sql-server-samples/tree/master/samples/databases/northwind-pubs)
- [Create your first Function](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development


### CODE

```c#
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace FunctionAppNW
{
    public static class ProcessCustomers
    {
        [FunctionName("GetCustomers")]
        public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", Route = "customer")] HttpRequest req, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            List<Customers> customersList = new List<Customers>();
            try
            {
                using (SqlConnection connection = new SqlConnection(Environment.GetEnvironmentVariable("SqlConnectionString")))
                {
                    connection.Open();
                    var query = @"Select * from Customers";
                    SqlCommand command = new SqlCommand(query, connection);
                    var reader = await command.ExecuteReaderAsync();

                    while (reader.Read())
                    {
                        Customers customer = new Customers()
                        {
                            CustomerID = reader["CustomerID"].ToString(),
                            CompanyName = reader["CompanyName"].ToString(),
                            ContactName = reader["ContactName"].ToString(),
                            ContactTitle = reader["ContactTitle"].ToString(),
                            Address = reader["Address"].ToString(),
                            City = reader["City"].ToString(),
                            PostalCode = reader["PostalCode"].ToString(),
                            Region = reader["Region"].ToString(),

                        };
                        customersList.Add(customer);
                    }
                }
            }
            catch (Exception e)
            {
                log.LogError(e.ToString());
            }
            if (customersList.Count > 0)
            {
                return new OkObjectResult(customersList);
            }
            else
            {
                return new NotFoundResult();
            }

        }
    }
}

///Model

public class Customers
    {
        public string CustomerID { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
        public string ContactTitle { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }

    }

```
