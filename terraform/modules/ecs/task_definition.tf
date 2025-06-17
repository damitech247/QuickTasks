resource "aws_cloudwatch_log_group" "quicktasks_logs" {
  name              = "/ecs/${var.environment}/quicktasks"
  retention_in_days = 7
}

resource "aws_ecs_task_definition" "quicktasks" {
  family                   = "${var.environment}-quicktasks"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name         = "quicktasks"
      image        = "${var.container_registry}/quicktasks-${var.environment}:latest"
      cpu          = 512
      memory       = 1024
      essential    = true
      portMappings = [{ containerPort = 8080 }]

      secrets = [
        {
          name      = "DB_PASSWORD"
          valueFrom = "arn:aws:secretsmanager:us-east-1:025016447278:secret:${var.environment}/ecs-DAQ9VL:DB_PASSWORD::"
        },
        {
          name      = "JWT_SECRET"
          valueFrom = "arn:aws:secretsmanager:us-east-1:025016447278:secret:${var.environment}/ecs-DAQ9VL:JWT_SECRET::"
        },
        {
          name      = "ROOT_ADMIN_PASSWORD"
          valueFrom = "arn:aws:secretsmanager:us-east-1:025016447278:secret:${var.environment}/ecs-DAQ9VL:ROOT_ADMIN_PASSWORD::"
        }
      ],
      environment = [
        {
          name  = "PORT"
          value = "8080"
        },
        {
          name  = "DB_NAME"
          value = "quicktasks"
        },
        {
          name  = "DB_USER"
          value = "quickuser"
        },
        {
          name  = "DB_HOST"
          value = "quicktasks.cwvwckk60a50.us-east-1.rds.amazonaws.com"
        },
        {
          name  = "ROOT_ADMIN_EMAIL"
          value = "admin@damitech.xyz"
        },
        {
          name  = "AWS_REGION"
          value = "us-east-1"
        },
        {
          name  = "NODE_ENV"
          value = "production"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.quicktasks_logs.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "quicktasks"
        }
      }
    }
  ])
}
