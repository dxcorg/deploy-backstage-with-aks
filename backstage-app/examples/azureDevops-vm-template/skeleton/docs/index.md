# ${{ values.name }}

## Overview

${{ values.description }}

This is an Angular web application deployed to Azure App Service using automated Terraform infrastructure provisioning.

## Architecture

- **Frontend**: Angular application
- **Hosting**: Azure Linux App Service
- **Runtime**: ${{ values.runtime }}
- **Region**: ${{ values.location }}
- **SKU**: ${{ values.sku }}

## Quick Links

- [GitHub Repository](https://github.com/${{ values.destination.owner }}/${{ values.destination.repo }})
- [Setup Guide](https://github.com/${{ values.destination.owner }}/${{ values.destination.repo }}/blob/main/README.md)
- [Deployment Actions](https://github.com/${{ values.destination.owner }}/${{ values.destination.repo }}/actions)

## Getting Started

### Prerequisites

Before deploying this application, you need:

1. **Azure Subscription** with appropriate permissions
2. **Azure Service Principal** with Contributor role
3. **GitHub Repository Secrets** configured (see setup guide below)

### Required GitHub Secrets

The following secrets must be added to your repository for automated deployment:

| Secret Name | Description |
|-------------|-------------|
| `AZURE_CLIENT_ID` | Azure Service Principal Client ID |
| `AZURE_CLIENT_SECRET` | Azure Service Principal Secret |
| `AZURE_TENANT_ID` | Azure AD Tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Azure Subscription ID |

**📖 Setup Instructions**: [Add Secrets Now](https://github.com/${{ values.destination.owner }}/${{ values.destination.repo }}/settings/secrets/actions)

### Deployment

Once secrets are configured:

1. Go to [Actions](https://github.com/${{ values.destination.owner }}/${{ values.destination.repo }}/actions)
2. Select **"Deploy Infrastructure & App to Azure"**
3. Click **Run workflow**
4. Wait for deployment to complete (~5-10 minutes)

Your application will be available at: `https://${{ values.webAppName }}.azurewebsites.net`

## Project Structure

```
.
├── .github/workflows/     # CI/CD automation
├── src/                   # Angular application
├── terraform/             # Infrastructure as Code
│   ├── main.tf           # Azure resources
│   ├── providers.tf      # Provider configuration
│   ├── variables.tf      # Input variables
│   └── outputs.tf        # Output values
├── docs/                  # Documentation
└── catalog-info.yaml     # Backstage metadata
```

## Infrastructure

The Terraform configuration provisions:

- **Resource Group**: `rg-${{ values.webAppName }}-${{ values.location }}`
- **App Service Plan**: `asp-${{ values.webAppName }}`
- **Web App**: `${{ values.webAppName }}`

## Development

### Local Development

```bash
# Install dependencies
cd src
npm install

# Start development server
npm start

# Application runs at http://localhost:4200
```

### Build Production

```bash
cd src
npm run build -- --configuration production

# Output in dist/ directory
```

## CI/CD Pipeline

The GitHub Actions workflow automatically:

1. **Provisions Infrastructure** using Terraform
2. **Builds Angular Application** for production
3. **Deploys to Azure App Service**

Triggered on:
- Push to `main` branch
- Manual workflow dispatch

## Monitoring

- **Azure Portal**: Monitor application performance and logs
- **GitHub Actions**: View deployment history and status
- **Application Insights**: (Optional) Enable for detailed telemetry

## Troubleshooting

### Common Issues

**Deployment Fails: Authentication Error**
- Verify all 4 Azure secrets are correctly set in repository settings
- Ensure Service Principal has Contributor role on the subscription

**Terraform Validation Error**
- Check that webapp name is globally unique
- Verify runtime version is supported by Azure

**Application Not Loading**
- Check Azure App Service logs in Azure Portal
- Verify build completed successfully in GitHub Actions
- Check deployment package was uploaded correctly

### Support

- Check the [README](https://github.com/${{ values.destination.owner }}/${{ values.destination.repo }}/blob/main/README.md) for detailed instructions
- Review [GitHub Actions logs](https://github.com/${{ values.destination.owner }}/${{ values.destination.repo }}/actions) for errors
- Consult [Azure App Service documentation](https://learn.microsoft.com/en-us/azure/app-service/)

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Owner**: ${{ values.destination.owner }}  
**Repository**: https://github.com/${{ values.destination.owner }}/${{ values.destination.repo }}  
**Generated**: {{"{{"}} now | date('YYYY-MM-DD') {{"}}"}}
