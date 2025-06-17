##################################################################
######## Root domain (cloudsecnetwork.com) pointing to the ALB ########
resource "aws_route53_record" "root_cloudsecnetwork" {
  zone_id = "Z062052210W4ASS8I4R7I"
  name    = "cloudsecnetwork.com"
  type    = "A"

  alias {
    name                   = aws_lb.ecs_alb.dns_name
    zone_id                = aws_lb.ecs_alb.zone_id
    evaluate_target_health = false
  }
}

# www.cloudsecnetwork.com pointing to cloudsecnetwork.com
resource "aws_route53_record" "www_cloudsecnetwork" {
  zone_id = "Z062052210W4ASS8I4R7I"
  name    = "www.cloudsecnetwork.com"
  type    = "A"

  alias {
    name                   = aws_route53_record.root_cloudsecnetwork.name
    zone_id                = aws_route53_record.root_cloudsecnetwork.zone_id
    evaluate_target_health = false
  }
}

# blog.cloudsecnetwork.com
resource "aws_route53_record" "blog_cloudsecnetwork" {
  zone_id = "Z062052210W4ASS8I4R7I"
  name    = "blog.cloudsecnetwork.com"
  type    = "A"

  alias {
    name                   = aws_lb.ecs_alb.dns_name
    zone_id                = aws_lb.ecs_alb.zone_id
    evaluate_target_health = false
  }
}

# learn.cloudsecnetwork.com
resource "aws_route53_record" "learn_cloudsecnetwork" {
  zone_id = "Z062052210W4ASS8I4R7I"
  name    = "learn.cloudsecnetwork.com"
  type    = "A"

  alias {
    name                   = aws_lb.ecs_alb.dns_name
    zone_id                = aws_lb.ecs_alb.zone_id
    evaluate_target_health = false
  }
}

# app.careermerge.com
resource "aws_route53_record" "app_careermerge" {
  zone_id = "Z03955905MXT7J82ZIS1"
  name    = "app.careermerge.com"
  type    = "A"

  alias {
    name                   = aws_lb.ecs_alb.dns_name
    zone_id                = aws_lb.ecs_alb.zone_id
    evaluate_target_health = false
  }
}


# ##################################################################
# ######## Root domain (phishintel.com) pointing to the ALB ########
# resource "aws_route53_record" "root_phishintel" {
#   zone_id = "Z017369234QTJM42EW437" 
#   name    = "phishintel.com"
#   type    = "A"

#   alias {
#     name                   = aws_lb.ecs_alb.dns_name
#     zone_id                = aws_lb.ecs_alb.zone_id
#     evaluate_target_health = false
#   }
# }

# # www.phishintel.com pointing to phishintel.com
# resource "aws_route53_record" "www_phishintel" {
#   zone_id = "Z017369234QTJM42EW437"
#   name    = "www.phishintel.com"
#   type    = "A"

#   alias {
#     name                   = aws_route53_record.root_phishintel.name
#     zone_id                = aws_route53_record.root_phishintel.zone_id
#     evaluate_target_health = false
#   }
# }

# # docs.phishintel.com
# resource "aws_route53_record" "docs_phishintel" {
#   zone_id = "Z017369234QTJM42EW437"
#   name    = "docs.phishintel.com"
#   type    = "A"

#   alias {
#     name                   = aws_lb.ecs_alb.dns_name
#     zone_id                = aws_lb.ecs_alb.zone_id
#     evaluate_target_health = false
#   }
# }
