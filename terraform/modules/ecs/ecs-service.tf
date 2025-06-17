# ECS Service for QuickTasks
resource "aws_ecs_service" "quicktasks" {
  name            = "${var.environment}-quicktasks-service"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.quicktasks.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = module.vpc.private_subnets
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.quicktasks.arn
    container_name   = "quicktasks"
    container_port   = 8080
  }
  
  lifecycle {
    ignore_changes = [desired_count]
  }
}