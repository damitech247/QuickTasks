module "ecs_cluster" {
  source = "../../modules/ecs"

  environment = "prod"
  aws_region  = "us-east-1"

  vpc_cidr        = "10.100.0.0/16"
  azs             = ["us-east-1a", "us-east-1b"]
  public_subnets  = ["10.100.1.0/24", "10.100.2.0/24"]
  private_subnets = ["10.100.101.0/24", "10.100.102.0/24"]
}

# module "static_site" {
#   source = "../../modules/cloudfront"

#   bucket_name         = "damitech.xyz"
#   alternate_domains   = ["damitech.xyz", "tasks.damitech.xyz"]
#   acm_certificate_arn = "arn:aws:acm:us-east-1:025016447278:certificate/616641f1-e099-45ea-8c3f-1ad18b73573d"
#   route53_zone_id     = "Z06089602C4ABO4ANTMWK"

#   tags = {
#     Environment = "prod"
#     App         = "DamiTech Website"
#   }
# }
