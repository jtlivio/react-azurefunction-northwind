# Consume a Northwind Microsoft database from Azure

FUNCTION CODE

```
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

```

## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

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

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
