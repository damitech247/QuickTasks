resource "aws_ecs_cluster" "ecs_cluster" {
  name = "${var.environment}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Environment = var.environment
  }
}

resource "aws_cloudwatch_log_group" "quicktasks_logs" {
  name              = "/ecs/${var.environment}/quicktasks"
  retention_in_days = 7
}