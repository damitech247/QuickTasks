<!-- client\src\routes\console\+page.svelte -->
<script>
    import { onMount } from "svelte";
    import Navbar from "../../components/Navbar.svelte";

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

    import { redirect } from "@sveltejs/kit";

    export function load() {
        if (typeof localStorage !== "undefined") {
            const token = localStorage.getItem("token");
            if (!token) {
                throw redirect(302, "/auth");
            }
        }
    }

    let users = []

    // let users = [
    //     {
    //         id: 1,
    //         firstName: "Alice",
    //         lastName: "Johnson",
    //         email: "alice.johnson@example.com",
    //         role: "Admin",
    //         status: "Active",
    //     },
    //     {
    //         id: 2,
    //         firstName: "Bob",
    //         lastName: "Smith",
    //         email: "bob.smith@example.com",
    //         role: "User",
    //         status: "Inactive",
    //     },
    //     {
    //         id: 3,
    //         firstName: "Carla",
    //         lastName: "Nguyen",
    //         email: "carla.nguyen@example.com",
    //         role: "User",
    //         status: "Active",
    //     },
    // ];

    let showAddModal = false;
    let showEditModal = false;
    let showDeleteModal = false;
    let selectedUser = null;

    function openAddModal() {
        showAddModal = true;
    }

    function openEditModal(user) {
        selectedUser = user;
        showEditModal = true;
    }

    function openDeleteModal(user) {
        selectedUser = user;
        showDeleteModal = true;
    }

    function closeModals() {
        showAddModal = showEditModal = showDeleteModal = false;
        selectedUser = null;
    }
</script>

<Navbar {currentUser} />

<section class="max-w-screen-xl mx-auto px-4 md:px-8 py-6">
    <div class="flex justify-end mb-6">
        <button
            on:click={openAddModal}
            class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg shadow transition"
        >
            + Add User
        </button>
    </div>

    <div class="overflow-x-auto rounded-lg shadow border border-gray-300">
        <table class="min-w-full bg-white text-sm text-gray-800">
            <thead class="bg-gray-100 text-gray-600">
                <tr>
                    <th class="px-4 py-3 text-left">Name</th>
                    <th class="px-4 py-3 text-left">Email</th>
                    <th class="px-4 py-3 text-left">Role</th>
                    <th class="px-4 py-3 text-left">Status</th>
                    <th class="px-4 py-3 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each users as user}
                    <tr class="border-t border-gray-200">
                        <td class="px-4 py-3 whitespace-nowrap"
                            >{user.firstName} {user.lastName}</td
                        >
                        <td class="px-4 py-3">{user.email}</td>
                        <td class="px-4 py-3">{user.role}</td>
                        <td class="px-4 py-3">
                            <span
                                class="px-2 py-1 rounded-full text-xs font-semibold {user.status ===
                                'Active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'}"
                            >
                                {user.status}
                            </span>
                        </td>
                        <td class="px-4 py-3 flex gap-2">
                            <button
                                on:click={() => openEditModal(user)}
                                class="text-blue-600 hover:text-blue-800 text-xs"
                                >Edit</button
                            >
                            <button
                                on:click={() => openDeleteModal(user)}
                                class="text-red-600 hover:text-red-800 text-xs"
                                >Delete</button
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</section>

{#if showAddModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 class="text-lg font-semibold mb-4">Add User</h2>
            <form>
                <div class="mb-4">
                    <label
                        for="firstName"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >First Name</label
                    >
                    <input
                        id="firstName"
                        type="text"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="lastName"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Last Name</label
                    >
                    <input
                        id="lastName"
                        type="text"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Email</label
                    >
                    <input
                        id="email"
                        type="email"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="role"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Role</label
                    >
                    <select
                        id="role"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                        <option>User</option>
                        <option>Admin</option>
                    </select>
                </div>
                <div class="flex justify-end gap-3">
                    <button
                        type="button"
                        on:click={closeModals}
                        class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                        >Cancel</button
                    >
                    <button
                        type="submit"
                        class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded"
                        >Save</button
                    >
                </div>
            </form>
            <button
                class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                on:click={closeModals}
                aria-label="Close modal">&times;</button
            >
        </div>
    </div>
{/if}

{#if showEditModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 class="text-lg font-semibold mb-4">Edit User</h2>
            <form>
                <div class="mb-4">
                    <label
                        for="editFirstName"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >First Name</label
                    >
                    <input
                        id="editFirstName"
                        type="text"
                        value={selectedUser.firstName}
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="editLastName"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Last Name</label
                    >
                    <input
                        id="editLastName"
                        type="text"
                        value={selectedUser.lastName}
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="editEmail"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Email</label
                    >
                    <input
                        id="editEmail"
                        type="email"
                        value={selectedUser.email}
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="editRole"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Role</label
                    >
                    <select
                        id="editRole"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                        <option selected={selectedUser.role === "User"}
                            >User</option
                        >
                        <option selected={selectedUser.role === "Admin"}
                            >Admin</option
                        >
                    </select>
                </div>
                <div class="flex justify-end gap-3">
                    <button
                        type="button"
                        on:click={closeModals}
                        class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                        >Cancel</button
                    >
                    <button
                        type="submit"
                        class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded"
                        >Update</button
                    >
                </div>
            </form>
            <button
                class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                on:click={closeModals}
                aria-label="Close modal">&times;</button
            >
        </div>
    </div>
{/if}

{#if showDeleteModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 class="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p class="mb-6">
                Are you sure you want to delete <strong
                    >{selectedUser.firstName} {selectedUser.lastName}</strong
                >?
            </p>
            <div class="flex justify-end gap-3">
                <button
                    type="button"
                    on:click={closeModals}
                    class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >Cancel</button
                >
                <button
                    type="button"
                    class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded"
                    >Delete</button
                >
            </div>
            <button
                class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                on:click={closeModals}
                aria-label="Close modal">&times;</button
            >
        </div>
    </div>
{/if}
