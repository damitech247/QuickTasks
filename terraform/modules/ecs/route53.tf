## Root Domain
resource "aws_route53_record" "root_damitech" {
  zone_id = var.zone_id
  name    = "damitech.xyz"
  type    = "A"

  alias {
    name                   = aws_lb.ecs_alb.dns_name
    zone_id                = aws_lb.ecs_alb.zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_damitech" {
  zone_id = var.zone_id
  name    = "tasks.damitech.xyz"
  type    = "A"

  alias {
    name                   = aws_route53_record.root_damitech.name
    zone_id                = aws_route53_record.root_damitech.zone_id
    evaluate_target_health = false
  }
}
