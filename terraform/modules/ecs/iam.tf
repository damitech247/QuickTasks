# ECS Task Execution Role
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.environment}-ecsTaskExecutionRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# ECS Task Execution Policy
resource "aws_iam_policy" "ecs_task_execution_policy" {
  name        = "${var.environment}-ECSFullAccessPolicy"
  description = "Provides full access to ECR, Secrets Manager, Logs, and ECS"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "ecr:*"
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = "secretsmanager:*"
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = "logs:*"
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = "ecs:*"
        Resource = "*"
      }
    ]
  })
}

# Attach Policy to Role
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.ecs_task_execution_policy.arn
}
