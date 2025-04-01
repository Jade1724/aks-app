#!/bin/bash

# Exit immediately if a command fails
set -e

# Load environment variables from .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Ensure a tag is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <tag>"
  exit 1
fi

TAG=$1


az login --tenant $AZURE_TENANT_ID

az acr login --name azuresalesforceconn


docker buildx build --platform linux/amd64 -t azuresalesforceconn.azurecr.io/aks-azure-salesforce/azure-salesforce-connect-frontend:$TAG .
docker push azuresalesforceconn.azurecr.io/aks-azure-salesforce/azure-salesforce-connect-frontend:$TAG

