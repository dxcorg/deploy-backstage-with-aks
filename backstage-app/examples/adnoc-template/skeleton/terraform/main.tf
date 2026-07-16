resource "azurerm_resource_group" "rg" {
  name     = "rg-${{ values.webAppName }}-${{ values.location }}"
  location = "${{ values.location }}"
}

resource "azurerm_service_plan" "asp" {
  name                = "asp-${{ values.webAppName }}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "${{ values.sku }}"
}

resource "azurerm_linux_web_app" "webapp" {
  name                = "${{ values.webAppName }}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.asp.id

  site_config {
    # always_on requires Basic tier or higher (not compatible with Free/F1)
    always_on = "${{ values.sku }}" != "F1" ? true : false
    
    # Startup command for Node.js apps
    app_command_line = "npm start"
    
    application_stack {
      # Dynamically sets runtime based on template selection (Node.js or .NET)
      node_version = split("|", "${{ values.runtime }}")[0] == "node" ? split("|", "${{ values.runtime }}")[1] : null
      dotnet_version = split("|", "${{ values.runtime }}")[0] == "dotnet" ? split("|", "${{ values.runtime }}")[1] : null
    }
  }

  app_settings = {
    "WEBSITE_NODE_DEFAULT_VERSION" = split("|", "${{ values.runtime }}")[0] == "node" ? "~${split("-", split("|", "${{ values.runtime }}")[1])[0]}" : null
    "NODE_ENV"                     = "production"
  }
}
