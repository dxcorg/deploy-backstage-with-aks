# Copy to terraform.tfvars and customize. Never commit terraform.tfvars with secrets.

# ------------------------------------------------------------------------------
# Deployment mode: true = create new AKS, false = use existing AKS
# ------------------------------------------------------------------------------
deploy_aks = true

# ------------------------------------------------------------------------------
# New AKS (when deploy_aks = true)
# ------------------------------------------------------------------------------
resource_group_name = "rg-backstage-platform"
location            = "eastus"
aks_cluster_name    = "backstage-aks"
aks_node_count      = 2
aks_vm_size         = "Standard_D2s_v3"

# ------------------------------------------------------------------------------
# Existing AKS (when deploy_aks = false)
# ------------------------------------------------------------------------------
# existing_aks_name = "my-existing-cluster"
# existing_aks_rg   = "my-resource-group"

# ------------------------------------------------------------------------------
# Backstage
# ------------------------------------------------------------------------------
backstage_namespace     = "backstage"
backstage_release_name  = "backstage"
backstage_chart_version = "2.6.3"
# Custom image (leave empty to use chart default); CI passes these via -var=
# backstage_image_registry   = "ghcr.io"
# backstage_image_repository = "your-org/backstage-platform-engineering"
backstage_image_tag     = "latest"

# PostgreSQL - set via env: export TF_VAR_postgresql_password="your-secure-password"
# Or use empty for auto-generated (stored in Terraform state)
postgresql_enabled = true

# Ingress - enable for developer access via URL
backstage_ingress_enabled = false
backstage_ingress_host    = ""  # e.g., backstage.yourdomain.com

# When ingress disabled: use LoadBalancer (avoids port-forward), or ClusterIP + port-forward
backstage_service_loadbalancer = true

# GitHub OAuth sign-in (see docs/GITHUB_AUTH_SETUP.md)
github_auth_enabled               = true
github_client_id                  = "Ov23liPzZtYPg153TAQA"      # From GitHub OAuth App
github_client_secret              = "7dbde1abb959e772387a56d267e1947717837d95"  # From GitHub OAuth App
backstage_scaffolder_github_token = "ghp_G9lOMLeUVNvB1wiCmswe7H5yz6EqeI2g6L"   # GitHub PAT with repo+workflow scope
# When using LoadBalancer + GitHub auth: set after getting EXTERNAL-IP
# backstage_base_url_override = "http://<EXTERNAL-IP>:7007"

# ------------------------------------------------------------------------------
# Tags
# ------------------------------------------------------------------------------
tags = {
  Environment = "dev"
  Project     = "backstage-platform"
  ManagedBy   = "terraform"
}
