# modules/ecs-cluster/variables.tf

variable "environment" {}
variable "aws_region" {}
variable "vpc_cidr" {}
variable "azs" { type = list(string) }
variable "public_subnets" { type = list(string) }
variable "private_subnets" { type = list(string) }

variable "container_registry" {
  description = "Elastic Container Registry"
  type        = string
  default     = "025016447278.dkr.ecr.us-east-1.amazonaws.com"
}

variable "acm_arn" {
  description = "ACM Certificate ARN"
  type        = string
  default     = "arn:aws:acm:us-east-1:025016447278:certificate/616641f1-e099-45ea-8c3f-1ad18b73573d"
}

variable "zone_id" {
  default = "Z06089602C4ABO4ANTMWK"
}