#!/usr/bin/env bash

function show_help() {
    echo "This script allows to connect to an interactive IEX session on a running ECS task using Execute command"
    echo "Usage: bash scripts/remote.sh CLUSTER_NAME SERVICE_NAME CONTAINER_NAME AWS_PROFILE"
    echo "Arguments:"
    echo "  CLUSTER_NAME      Name of the cluster where the task is running, example: graasp-dev or graasp-prod"
    echo "  SERVICE_NAME      Name of the service where the task is running, example: admin"
    echo "  CONTAINER_NAME    Name of the container where the task is running, example: admin"
    echo "  AWS_PROFILE       Name of the AWS profile to use, example: dev or prod"
}

# Check if no arguments are provided
if [ "$#" -eq 0 ]; then
    show_help
    exit 1
fi

# Get inputs from command line
if [ -z "$1" ]; then
  echo "Missing required CLUSTER_NAME argument"
  exit 1
fi
cluster_name=$1

# Get inputs from command line
if [ -z "$2" ]; then
  echo "Missing required SERVICE_NAME argument"
  exit 1
fi
service_name=$2

# Get inputs from command line
if [ -z "$3" ]; then
  echo "Missing required CONTAINER_NAME argument"
  exit 1
fi
container_name=$3

# Get inputs from command line
if [ -z "$4" ]; then
  echo "Missing required AWS_PROFILE argument"
  exit 1
fi
aws_profile=$4

# Check if the aws cli is authenticated
aws_identity=$(aws sts get-caller-identity --profile $aws_profile)
if [ $? -eq 0 ]; then
  echo -e "Using AWS identity:\n$aws_identity"
else
  echo "AWS CLI is not authenticated, please ensure you are using a valid profile name";
  exit 1
fi

# Get the task ARN
task_arn=$(aws ecs list-tasks --cluster $cluster_name --service $service_name --output text --query 'taskArns[0]' --profile $aws_profile)

if [ -z $task_arn ]; then
  echo "No task was found for the provided values:"
  echo "    Cluster: $cluster_name"
  echo "    Service: $service_name"
  echo "    Container: $container_name"
  echo "Please check that the cluster name, service name, and container name are correct"
  exit 1
fi

# Enter an interactive IEX session using ECS Execute command
aws ecs execute-command --cluster $cluster_name --task $task_arn --container $container_name --command "/app/bin/admin remote" --interactive --profile $aws_profile
