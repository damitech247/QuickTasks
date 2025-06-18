<!-- client\src\routes\+page.svelte -->
<script>
    import { onMount } from "svelte";
    import Navbar from "../components/Navbar.svelte";

    let currentUser = {
        firstName: "Admin",
        lastName: "",
        email: "admin@damitech.xyz",
        role: "Admin",
    };

    onMount(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (!token || !user) {
            window.location.href = "/auth";
            return;
        }

        currentUser = JSON.parse(user);
    });

    let tasks = []

    // let tasks = [
    //     {
    //         id: 1,
    //         title: "Design user interface mockups",
    //         description:
    //             "Create wireframes and high-fidelity mockups for the new dashboard interface including user flows and interaction patterns",
    //         status: "pending",
    //         priority: "high",
    //         deadline: "2025-06-20",
    //         assignee: "Alice Johnson",
    //     },
    //     {
    //         id: 2,
    //         title: "Implement user authentication",
    //         description:
    //             "Set up JWT-based authentication system with login, logout, and password reset functionality",
    //         status: "in-progress",
    //         priority: "high",
    //         deadline: "2025-06-18",
    //         assignee: "Bob Smith",
    //     },
    //     {
    //         id: 3,
    //         title: "Write unit tests",
    //         description:
    //             "Create comprehensive unit tests for the user management module",
    //         status: "pending",
    //         priority: "medium",
    //         deadline: null,
    //         assignee: "Carla Nguyen",
    //     },
    //     {
    //         id: 4,
    //         title: "Deploy to staging",
    //         description:
    //             "Deploy the latest build to staging environment for QA testing",
    //         status: "completed",
    //         priority: "low",
    //         deadline: "2025-06-15",
    //         assignee: "John Doe",
    //     },
    //     {
    //         id: 5,
    //         title: "Database optimization",
    //         description:
    //             "Optimize database queries and add proper indexing to improve performance",
    //         status: "in-progress",
    //         priority: "medium",
    //         deadline: "2025-06-25",
    //         assignee: "Alice Johnson",
    //     },
    // ];

    let showAddModal = false;
    let showEditModal = false;
    let showDeleteModal = false;
    let selectedTask = null;
    let draggedTask = null;

    // Form data for new/edit task
    let formData = {
        title: "",
        description: "",
        priority: "medium",
        deadline: "",
        assignee: "",
    };

    const columns = [
        { id: "pending", title: "🟡 Pending", status: "pending" },
        { id: "in-progress", title: "🔵 In Progress", status: "in-progress" },
        { id: "completed", title: "✅ Completed", status: "completed" },
    ];

    const priorityColors = {
        low: "bg-gray-100 text-gray-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-red-100 text-red-800",
    };

    function getTasksByStatus(status) {
        return tasks.filter((task) => task.status === status);
    }

    function truncateText(text, maxLength = 100) {
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    }

    function formatDate(dateString) {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }

    function isOverdue(deadline) {
        if (!deadline) return false;
        return new Date(deadline) < new Date();
    }

    function openAddModal() {
        formData = {
            title: "",
            description: "",
            priority: "medium",
            deadline: "",
            assignee: "",
        };
        showAddModal = true;
    }

    function openEditModal(task) {
        selectedTask = task;
        formData = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline || "",
            assignee: task.assignee,
        };
        showEditModal = true;
    }

    function openDeleteModal(task) {
        selectedTask = task;
        showDeleteModal = true;
    }

    function closeModals() {
        showAddModal = showEditModal = showDeleteModal = false;
        selectedTask = null;
        formData = {
            title: "",
            description: "",
            priority: "medium",
            deadline: "",
            assignee: "",
        };
    }

    function handleAddTask(event) {
        event.preventDefault();
        const newTask = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            status: "pending",
            priority: formData.priority,
            deadline: formData.deadline || null,
            assignee: formData.assignee,
        };
        tasks = [...tasks, newTask];
        closeModals();
    }

    function handleEditTask(event) {
        event.preventDefault();
        tasks = tasks.map((task) =>
            task.id === selectedTask.id
                ? {
                      ...task,
                      title: formData.title,
                      description: formData.description,
                      priority: formData.priority,
                      deadline: formData.deadline || null,
                      assignee: formData.assignee,
                  }
                : task,
        );
        closeModals();
    }

    function handleDeleteTask() {
        tasks = tasks.filter((task) => task.id !== selectedTask.id);
        closeModals();
    }

    function moveTask(taskId, newStatus) {
        tasks = tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task,
        );
    }

    // Drag and drop handlers
    function handleDragStart(event, task) {
        draggedTask = task;
        event.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    function handleDrop(event, newStatus) {
        event.preventDefault();
        if (draggedTask && draggedTask.status !== newStatus) {
            moveTask(draggedTask.id, newStatus);
        }
        draggedTask = null;
    }
</script>

<Navbar {currentUser} />

<section class="max-w-screen-xl mx-auto px-4 md:px-8 py-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Task Management</h1>
        <button
            on:click={openAddModal}
            class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg shadow transition"
        >
            + Add Task
        </button>
    </div>

    <!-- Kanban Board -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each columns as column}
            <div class="bg-gray-50 rounded-lg p-4 min-h-96">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="font-semibold text-gray-700">{column.title}</h2>
                    <span
                        class="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full"
                    >
                        {getTasksByStatus(column.status).length}
                    </span>
                </div>

                <div
                    class="space-y-3 min-h-80"
                    on:dragover={handleDragOver}
                    on:drop={(e) => handleDrop(e, column.status)}
                    role="list"
                >
                    {#each getTasksByStatus(column.status) as task}
                        <div
                            class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-move"
                            draggable="true"
                            on:dragstart={(e) => handleDragStart(e, task)}
                            role="listitem"
                        >
                            <!-- Task Header -->
                            <div class="flex justify-between items-start mb-2">
                                <h3
                                    class="font-medium text-gray-900 text-sm leading-tight"
                                >
                                    {task.title}
                                </h3>
                                <div class="flex gap-1 ml-2">
                                    <button
                                        on:click={() => openEditModal(task)}
                                        class="text-gray-400 hover:text-blue-600 p-1"
                                        title="Edit task"
                                        aria-label="Edit task"
                                    >
                                        <svg
                                            class="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            ></path>
                                        </svg>
                                    </button>
                                    <button
                                        on:click={() => openDeleteModal(task)}
                                        class="text-gray-400 hover:text-red-600 p-1"
                                        title="Delete task"
                                        aria-label="Edit task"
                                    >
                                        <svg
                                            class="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Task Description -->
                            <p class="text-xs text-gray-600 mb-3">
                                {truncateText(task.description)}
                            </p>

                            <!-- Priority Badge -->
                            <div class="flex items-center justify-between">
                                <span
                                    class="px-2 py-1 rounded-full text-xs font-medium {priorityColors[
                                        task.priority
                                    ]}"
                                >
                                    {task.priority.charAt(0).toUpperCase() +
                                        task.priority.slice(1)}
                                </span>

                                <!-- Deadline -->
                                {#if task.deadline}
                                    <span
                                        class="text-xs {isOverdue(task.deadline)
                                            ? 'text-red-600 font-medium'
                                            : 'text-gray-500'}"
                                    >
                                        {formatDate(task.deadline)}
                                    </span>
                                {/if}
                            </div>

                            <!-- Assignee -->
                            {#if task.assignee}
                                <div class="mt-2 pt-2 border-t border-gray-100">
                                    <span class="text-xs text-gray-500">
                                        Assigned to: <span class="font-medium"
                                            >{task.assignee}</span
                                        >
                                    </span>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</section>

<!-- Add Task Modal -->
{#if showAddModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div
            class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative max-h-96 overflow-y-auto"
        >
            <h2 class="text-lg font-semibold mb-4">Add New Task</h2>
            <form on:submit={handleAddTask}>
                <div class="mb-4">
                    <label
                        for="title"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Title *
                    </label>
                    <input
                        id="title"
                        type="text"
                        bind:value={formData.title}
                        required
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>

                <div class="mb-4">
                    <label
                        for="description"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Description *
                    </label>
                    <textarea
                        id="description"
                        bind:value={formData.description}
                        required
                        rows="3"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    ></textarea>
                </div>

                <div class="mb-4">
                    <label
                        for="priority"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Priority
                    </label>
                    <select
                        id="priority"
                        bind:value={formData.priority}
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label
                        for="deadline"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Deadline
                    </label>
                    <input
                        id="deadline"
                        type="date"
                        bind:value={formData.deadline}
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>

                <div class="mb-4">
                    <label
                        for="assignee"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Assignee
                    </label>
                    <input
                        id="assignee"
                        type="text"
                        bind:value={formData.assignee}
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>

                <div class="flex justify-end gap-3">
                    <button
                        type="button"
                        on:click={closeModals}
                        class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded"
                    >
                        Add Task
                    </button>
                </div>
            </form>
            <button
                class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                on:click={closeModals}
                aria-label="Close modal"
            >
                &times;
            </button>
        </div>
    </div>
{/if}

<!-- Edit Task Modal -->
{#if showEditModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div
            class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative max-h-96 overflow-y-auto"
        >
            <h2 class="text-lg font-semibold mb-4">Edit Task</h2>
            <form on:submit={handleEditTask}>
                <div class="mb-4">
                    <label
                        for="editTitle"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Title *
                    </label>
                    <input
                        id="editTitle"
                        type="text"
                        bind:value={formData.title}
                        required
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>

                <div class="mb-4">
                    <label
                        for="editDescription"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Description *
                    </label>
                    <textarea
                        id="editDescription"
                        bind:value={formData.description}
                        required
                        rows="3"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    ></textarea>
                </div>

                <div class="mb-4">
                    <label
                        for="editPriority"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Priority
                    </label>
                    <select
                        id="editPriority"
                        bind:value={formData.priority}
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label
                        for="editDeadline"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Deadline
                    </label>
                    <input
                        id="editDeadline"
                        type="date"
                        bind:value={formData.deadline}
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>

                <div class="mb-4">
                    <label
                        for="editAssignee"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Assignee
                    </label>
                    <input
                        id="editAssignee"
                        type="text"
                        bind:value={formData.assignee}
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>

                <div class="flex justify-end gap-3">
                    <button
                        type="button"
                        on:click={closeModals}
                        class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded"
                    >
                        Update Task
                    </button>
                </div>
            </form>
            <button
                class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                on:click={closeModals}
                aria-label="Close modal"
            >
                &times;
            </button>
        </div>
    </div>
{/if}

<!-- Delete Task Modal -->
{#if showDeleteModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 class="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p class="mb-6">
                Are you sure you want to delete the task <strong
                    >"{selectedTask.title}"</strong
                >?
            </p>
            <div class="flex justify-end gap-3">
                <button
                    type="button"
                    on:click={closeModals}
                    class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    on:click={handleDeleteTask}
                    class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded"
                >
                    Delete
                </button>
            </div>
            <button
                class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                on:click={closeModals}
                aria-label="Close modal"
            >
                &times;
            </button>
        </div>
    </div>
{/if}
