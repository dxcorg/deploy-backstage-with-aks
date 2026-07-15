# ${{ values.name }}

${{ values.description }}

## ⚠️ SETUP REQUIRED BEFORE DEPLOYMENT

Before you can deploy this application to Azure, you **MUST** configure Azure credentials as GitHub Secrets.

### 📋 Required GitHub Secrets

Add these secrets to your repository at: [Settings → Secrets → Actions](${{ values.destination.owner }}/${{ values.destination.repo }}/settings/secrets/actions)

| Secret Name | Description |
|-------------|-------------|
| `AZURE_CLIENT_ID` | Your Azure Service Principal Client ID |
| `AZURE_CLIENT_SECRET` | Your Azure Service Principal Secret |
| `AZURE_TENANT_ID` | Your Azure AD Tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Your Azure Subscription ID |

### 🔑 How to Add Secrets

1. **Go to Repository Settings:**
   - Click on **Settings** tab (top right)
   - Navigate to **Secrets and variables** → **Actions**
   - Click **New repository secret**

2. **Add Each Secret:**
   - Name: `AZURE_CLIENT_ID`
   - Value: `<paste your client ID>`
   - Click **Add secret**
   - Repeat for the other 3 secrets

3. **Verify:**
   - You should see all 4 secrets listed (values are hidden)

### 🚀 Deploy Your Application

Once secrets are configured:

1. **Go to Actions tab:** [${{ values.destination.owner }}/${{ values.destination.repo }}/actions](${{ values.destination.owner }}/${{ values.destination.repo }}/actions)
2. Select **Deploy Infrastructure & App to Azure**
3. Click **Run workflow** → **Run workflow**
4. Wait for deployment to complete (~5-10 minutes)
5. Your app will be live at: `https://${{ values.webAppName }}.azurewebsites.net`

---

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── terraform-deploy.yaml    # Automated CI/CD pipeline
├── src/                             # Angular application source
│   ├── angular.json
│   ├── package.json
│   └── app/
├── terraform/                       # Infrastructure as Code
│   ├── main.tf                      # Azure App Service resources
│   ├── providers.tf                 # Terraform & Azure provider
│   ├── variables.tf                 # Configuration variables
│   └── outputs.tf                   # Deployment outputs
└── catalog-info.yaml                # Backstage catalog metadata
```

## 🏗️ What Gets Deployed

The automated workflow will create:

- **Resource Group:** `rg-${{ values.webAppName }}-${{ values.location }}`
- **App Service Plan:** `asp-${{ values.webAppName }}` (SKU: ${{ values.sku }})
- **Web App:** `${{ values.webAppName }}` (Runtime: ${{ values.runtime }})
- **Location:** ${{ values.location }}

## 🔄 Automated Deployment Process

Every push to `main` branch automatically:

1. **Provisions Infrastructure** (Terraform)
   - Creates/updates Azure resources
   - Outputs deployment information

2. **Builds Application** (Angular)
   - Installs dependencies
   - Creates production build

3. **Deploys to Azure**
   - Uploads application to Azure App Service
   - Application goes live automatically

## 💻 Local Development

### Run the Angular App Locally

```bash
cd src
npm install
npm start
# App available at http://localhost:4200
```

### Test Terraform Locally (Optional)

```bash
cd terraform

# Set environment variables
export ARM_CLIENT_ID="your-client-id"
export ARM_CLIENT_SECRET="your-client-secret"
export ARM_TENANT_ID="your-tenant-id"
export ARM_SUBSCRIPTION_ID="your-subscription-id"

# Run terraform
terraform init
terraform plan
terraform apply
```

## 🐛 Troubleshooting

### "No configuration files" Error

**Cause:** Terraform can't find configuration files.

**Fix:** The workflow runs from repository root. Ensure `terraform/` directory exists with `.tf` files.

### Authentication Errors

**Cause:** Missing or incorrect Azure secrets.

**Fix:**
1. Verify all 4 secrets are added to repository
2. Check secret values are correct (no extra spaces)
3. Ensure Service Principal has Contributor role on subscription

### Deployment Fails

**Check:**
1. GitHub Actions logs: [${{ values.destination.owner }}/${{ values.destination.repo }}/actions](${{ values.destination.owner }}/${{ values.destination.repo }}/actions)
2. Verify webapp name `${{ values.webAppName }}` is globally unique
3. Check Azure subscription has sufficient quota

### App Not Loading

**Troubleshooting:**
1. Check Azure Portal → App Service → Logs
2. Verify build completed successfully in Actions
3. Check deployment logs in GitHub Actions

## 📚 Documentation

- **Backstage Catalog:** View this component in Backstage Software Catalog
- **GitHub Actions:** [${{ values.destination.owner }}/${{ values.destination.repo }}/actions](${{ values.destination.owner }}/${{ values.destination.repo }}/actions)
- **Repository:** [${{ values.destination.owner }}/${{ values.destination.repo }}](${{ values.destination.owner }}/${{ values.destination.repo }})

## 🔗 Useful Links

- [Angular Documentation](https://angular.io/docs)
- [Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Created with:** Backstage Software Templates  
**Repository:** https://github.com/${{ values.destination.owner }}/${{ values.destination.repo }}  
**Organization:** ${{ values.destination.owner }}
