<!-- client\src\components\Navbar.svelte -->
<script>
    export let currentUser;

    let showUserMenu = false;
    let showProfileModal = false;
    let showPasswordModal = false;

    function toggleUserMenu() {
        showUserMenu = !showUserMenu;
    }

    function closeUserMenu() {
        showUserMenu = false;
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href =
            currentUser.role === "admin" ? "/auth/admin" : "/auth/user";
    }
</script>

<nav
    class="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-lg border-b border-slate-700/50 py-3 relative z-50"
>
    <div
        class="max-w-screen-xl mx-auto px-4 md:px-8 flex items-center justify-between"
    >
        <!-- Logo/Brand Section -->
        <div class="flex items-center gap-3">
            <!-- <div
                class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg"
            >
                <svg
                    class="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                    />
                </svg>
            </div> -->
            <div
                class="text-xl font-bold text-white bg-clip-text text-transparent"
            >
                Quick Tasks
            </div>
        </div>

        <!-- User Section -->
        <div class="relative">
            <button
                on:click={toggleUserMenu}
                class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 group"
                aria-label="Toggle user menu"
            >
                <span
                    class="text-slate-200 font-medium text-sm group-hover:text-white transition-colors"
                >
                    {currentUser.firstName}
                </span>
                <div class="relative">
                    <div
                        class="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg ring-2 ring-slate-600/20"
                    >
                        <svg
                            class="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <div
                        class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"
                    ></div>
                </div>
                <svg
                    class="w-4 h-4 text-slate-400 transition-transform duration-200 transform {showUserMenu
                        ? 'rotate-180'
                        : ''}"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            <!-- Dropdown Menu -->
            {#if showUserMenu}
                <div
                    class="absolute right-0 top-full mt-2 w-56 bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-600/30 shadow-2xl shadow-black/20 py-2 animate-in slide-in-from-top-2 duration-200"
                    role="menu"
                    tabindex="-1"
                    on:click={closeUserMenu}
                    on:keydown={closeUserMenu}
                >
                    <div class="px-4 py-3 border-b border-slate-600/30">
                        <p class="text-sm font-medium text-slate-200">
                            {currentUser.firstName}
                            {currentUser.lastName || ""}
                        </p>
                        <p class="text-xs text-slate-400 mt-1">
                            {currentUser.email || "user@example.com"}
                        </p>
                    </div>

                    <div class="py-1">
                        <button
                            class="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors flex items-center gap-3"
                            role="menuitem"
                            on:click={() => (showProfileModal = true)}
                        >
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            View Profile
                        </button>
                        <button
                            class="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors flex items-center gap-3"
                            role="menuitem"
                            on:click={() => (showPasswordModal = true)}
                        >
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            Update Password
                        </button>
                    </div>

                    <div class="border-t border-slate-600/30 mt-2 pt-2">
                        <button
                            class="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-3"
                            role="menuitem"
                            on:click={logout}
                        >
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            Sign Out
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</nav>

{#if showUserMenu}
    <div
        class="fixed inset-0 z-40"
        role="button"
        tabindex="0"
        on:click={closeUserMenu}
        on:keydown={closeUserMenu}
    ></div>
{/if}

{#if showProfileModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 class="text-lg font-semibold mb-4">Profile Details</h2>
            <div class="text-sm text-gray-800">
                <p>
                    <strong>Name:</strong>
                    {currentUser.firstName}
                    {currentUser.lastName}
                </p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Role:</strong> {currentUser.role}</p>
            </div>
            <div class="flex justify-end mt-6">
                <button
                    on:click={() => (showProfileModal = false)}
                    class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
{/if}

{#if showPasswordModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 class="text-lg font-semibold mb-4">Update Password</h2>
            <form>
                <div class="mb-4">
                    <label
                        for="currentPassword"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Current Password</label
                    >
                    <input
                        id="currentPassword"
                        type="password"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="newPassword"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >New Password</label
                    >
                    <input
                        id="newPassword"
                        type="password"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="confirmPassword"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Confirm New Password</label
                    >
                    <input
                        id="confirmPassword"
                        type="password"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
                <div class="flex justify-end gap-3">
                    <button
                        type="button"
                        on:click={() => (showPasswordModal = false)}
                        class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}

<style>
    @keyframes slide-in-from-top-2 {
        from {
            opacity: 0;
            transform: translateY(-8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-in {
        animation-fill-mode: both;
    }

    .slide-in-from-top-2 {
        animation-name: slide-in-from-top-2;
    }

    .duration-200 {
        animation-duration: 200ms;
    }
</style>
