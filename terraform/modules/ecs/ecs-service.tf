# ECS Service for QuickTasks
resource "aws_ecs_service" "quicktasks" {
  name            = "${var.environment}-quicktasks-api"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.quicktasks.arn
  launch_type     = "FARGATE"
  desired_count   = 2

  network_configuration {
    subnets          = module.vpc.private_subnets
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.quicktasks_api.arn
    container_name   = "quicktasks-api"
    container_port   = 8080
  }
  
  lifecycle {
    ignore_changes = [desired_count]
  }
}

resource "aws_ecs_service" "quicktasks_frontend" {
  name            = "${var.environment}-quicktasks-frontend"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.quicktasks_frontend.arn
  launch_type     = "FARGATE"
  desired_count   = 2

  network_configuration {
    subnets          = module.vpc.private_subnets
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.quicktasks_frontend.arn
    container_name   = "quicktasks-frontend" 
    container_port   = 3000
  }

  lifecycle {
    ignore_changes = [desired_count]
  }

  depends_on = [aws_lb_listener.https_listener] 
}
