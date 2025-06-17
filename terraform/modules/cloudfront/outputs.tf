output "cdn_bucket_name" {
  value       = aws_s3_bucket.cdn.id
  description = "Name of the S3 bucket used for CDN"
}

output "cloudfront_distribution_domain_name" {
  value       = aws_cloudfront_distribution.cdn.domain_name
  description = "CloudFront distribution domain name"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.cdn.id
  description = "CloudFront distribution ID"
}

output "route53_record_names" {
  value       = aws_route53_record.cdn_alias[*].name
  description = "The Route 53 alias record names"
}
