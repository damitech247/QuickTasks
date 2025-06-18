# Target Group for QuickTasks
resource "aws_lb_target_group" "quicktasks_api" {
  name        = "${var.environment}-quicktasks-api-tg"
  port        = 8080
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = module.vpc.vpc_id

  health_check {
    path                = "/health" # or your API's health endpoint
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

  tags = {
    Name        = "QuickTasks API Target Group"
    Environment = var.environment
  }
}

resource "aws_lb_target_group" "quicktasks_frontend" {
  name        = "${var.environment}-quicktasks-frontend-tg"
  port        = 3000
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
    Name        = "QuickTasks Frontend Target Group"
    Environment = var.environment
  }
}
