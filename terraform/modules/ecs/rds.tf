resource "aws_db_subnet_group" "quicktasks" {
  name       = "${var.environment}-db-subnet-group"
  subnet_ids = module.vpc.private_subnets

  tags = {
    Name = "${var.environment}-db-subnet-group"
  }
}
