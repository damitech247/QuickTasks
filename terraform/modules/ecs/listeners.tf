# HTTP Listener (Redirects to HTTPS)
resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      protocol    = "HTTPS"
      port        = "443"
      status_code = "HTTP_301"
    }
  }
}

# HTTPS Listener (Handles Secure Traffic)
resource "aws_lb_listener" "https_listener" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  certificate_arn = var.acm_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.quicktasks.arn
  }
}
