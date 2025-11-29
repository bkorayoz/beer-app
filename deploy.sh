#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Configuration
AWS_REGION="eu-central-1"
ECR_REGISTRY="274684729462.dkr.ecr.eu-central-1.amazonaws.com"
IMAGE_NAME="bkorayoz/beer/app"
IMAGE_TAG="latest"

echo "Logging into AWS ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY

echo "Building Docker image..."
docker build -t $ECR_REGISTRY/$IMAGE_NAME:$IMAGE_TAG .

echo "Pushing image to ECR..."
docker push $ECR_REGISTRY/$IMAGE_NAME:$IMAGE_TAG

echo "Deployment to ECR complete!"
