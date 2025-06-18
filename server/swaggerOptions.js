const swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "QuickTasks API",
        version: "1.0.0",
        description: "API documentation for QuickTasks - Admin user management endpoints.",
    },
    servers: [
        {
            url: "https://api.damitech.xyz",
        },
        {
            url: "http://localhost:8080",
        },
    ],
    paths: {
        "/api/admin/users": {
            get: {
                tags: ["Admin"],
                summary: "List all users",
                responses: {
                    200: {
                        description: "Returns a list of all users",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/User" },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ["Admin"],
                summary: "Create a new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UserInput" },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "User successfully created",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/User" },
                            },
                        },
                    },
                    422: {
                        description: "Validation failed",
                    },
                },
            },
        },
        "/api/admin/users/{id}": {
            get: {
                tags: ["Admin"],
                summary: "Get user by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "Returns the user details",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/User" },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                    },
                },
            },
            put: {
                tags: ["Admin"],
                summary: "Update user by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UserInput" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "User successfully updated",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/User" },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                    },
                },
            },
            delete: {
                tags: ["Admin"],
                summary: "Delete user by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "User successfully deleted",
                    },
                    404: {
                        description: "User not found",
                    },
                },
            },
        },
        "/api/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login to obtain access token",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "password"],
                                properties: {
                                    email: { type: "string", format: "email", example: "user@example.com" },
                                    password: { type: "string", example: "password123" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Login successful - returns access token",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR..." },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Invalid credentials",
                    },
                    422: {
                        description: "Validation failed",
                    },
                },
            },
        },
        "/api/task": {
            get: {
                tags: ["Task"],
                summary: "Get all tasks for the authenticated user",
                responses: {
                    200: {
                        description: "Returns an array of tasks",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Task" },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ["Task"],
                summary: "Create a new task",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/TaskInput" },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Task created successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Task" },
                            },
                        },
                    },
                    422: {
                        description: "Validation error",
                    },
                },
            },
        },

        "/api/task/{id}": {
            get: {
                tags: ["Task"],
                summary: "Get a task by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "Returns the task",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Task" },
                            },
                        },
                    },
                    404: {
                        description: "Task not found",
                    },
                },
            },
            put: {
                tags: ["Task"],
                summary: "Update a task by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/TaskInput" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Task updated successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Task" },
                            },
                        },
                    },
                    404: {
                        description: "Task not found",
                    },
                },
            },
            delete: {
                tags: ["Task"],
                summary: "Delete a task by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "Task deleted successfully",
                    },
                    404: {
                        description: "Task not found",
                    },
                },
            },
        },
        "/api/profile/password": {
            put: {
                tags: ["Profile"],
                summary: "Update your own password",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["currentPassword", "newPassword"],
                                properties: {
                                    currentPassword: {
                                        type: "string",
                                        example: "oldPass123",
                                    },
                                    newPassword: {
                                        type: "string",
                                        example: "newPass456",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Password updated successfully",
                    },
                    401: {
                        description: "Unauthorized - Invalid current password or token",
                    },
                    422: {
                        description: "Validation error",
                    },
                },
            },
        },

    },
    components: {
        schemas: {
            // For Admin User routes
            User: {
                type: "object",
                properties: {
                    id: { type: "string", example: "123" },
                    firstName: { type: "string", example: "John" },
                    lastName: { type: "string", example: "Doe" },
                    email: { type: "string", format: "email", example: "john.doe@example.com" },
                    role: { type: "string", example: "admin" },
                    department: { type: "string", example: "Engineering" },
                    accountLocked: { type: "boolean", example: false },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            UserInput: {
                type: "object",
                required: ["firstName", "email", "password"],
                properties: {
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    email: { type: "string", format: "email" },
                    password: { type: "string" },
                    role: { type: "string" },
                    department: { type: "string" },
                },
            },

            // For /api/task routes
            Task: {
                type: "object",
                properties: {
                    id: { type: "string", example: "task_001" },
                    title: { type: "string", example: "Finish documentation" },
                    description: { type: "string", example: "Complete all OpenAPI docs" },
                    status: {
                        type: "string",
                        enum: ["pending", "in-progress", "completed"],
                        example: "pending",
                    },
                    userId: { type: "string", example: "user_123" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            TaskInput: {
                type: "object",
                required: ["title"],
                properties: {
                    title: { type: "string", example: "Finish documentation" },
                    description: { type: "string", example: "Complete all OpenAPI docs" },
                    status: {
                        type: "string",
                        enum: ["pending", "in-progress", "completed"],
                        example: "pending",
                    },
                },
            },

            // For login response
            AuthToken: {
                type: "object",
                properties: {
                    token: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIsInR...",
                    },
                },
            },
        },
    }

};

module.exports = swaggerSpec;
