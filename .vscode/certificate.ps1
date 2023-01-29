Connect-PnPOnline -ClientId $ClientId -Url "https://joaolivio.sharepoint.com/sites/FHOMESITE" -Tenant "joaolivio.onmicrosoft.com" -CertificatePath ".\PnP-Powershell.pfx"
Get-PnPTenantSite | Format-Table -AutoSize
