variable "bucket_name" {
  description = "Name of the S3 bucket for CDN content"
  type        = string
}

variable "alternate_domains" {
  description = "Alternate domain names (e.g., cdn.example.com)"
  type        = list(string)
  default     = []
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN (must be in us-east-1 for CloudFront)"
  type        = string
}

variable "route53_zone_id" {
  description = "Route 53 Hosted Zone ID"
  type        = string
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
