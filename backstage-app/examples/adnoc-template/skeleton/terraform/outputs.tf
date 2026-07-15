output "resource_group_name" {
  description = "Name of the Azure Resource Group"
  value       = azurerm_resource_group.rg.name
}

output "webapp_name" {
  description = "Name of the Azure Web App"
  value       = azurerm_linux_web_app.webapp.name
}

output "webapp_url" {
  description = "URL of the deployed Azure Web App"
  value       = "https://${azurerm_linux_web_app.webapp.default_hostname}"
}

output "webapp_default_hostname" {
  description = "Default hostname of the Azure Web App"
  value       = azurerm_linux_web_app.webapp.default_hostname
}
