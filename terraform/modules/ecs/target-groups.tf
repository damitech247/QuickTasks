# Target Group for QuickTasks
resource "aws_lb_target_group" "quicktasks" {
  name        = "${var.environment}-quicktasks-tg"
  port        = 8080
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = module.vpc.vpc_id

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }
  
  tags = {
    Environment = var.environment
  }
}