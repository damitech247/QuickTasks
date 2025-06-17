<!-- client\src\routes\auth\admin\+page.svelte -->
<script>
    let email = "";
    let password = "";
    let error = "";
    let isLoading = false;
    let showPassword = false;

    const handleSubmit = async () => {
        error = "";
        isLoading = true;

        try {
            const baseUrl =
                typeof window !== "undefined" &&
                window.location.hostname === "localhost"
                    ? "http://localhost:8080"
                    : "";

            const res = await fetch(`${baseUrl}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role: "admin" }),
            });

            if (res.ok) {
                window.location.href = "/console";
            } else {
                error = "Login failed. Please check your credentials.";
            }
        } catch (err) {
            error = "Network error. Please try again.";
        } finally {
            isLoading = false;
        }
    };

    const togglePassword = () => {
        showPassword = !showPassword;
    };
</script>

<svelte:head>
    <title>Admin Login</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
    />
</svelte:head>

<div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-50 relative overflow-hidden font-sans"
>
    <!-- Background Shapes -->
    <div
        class="absolute w-72 h-72 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full top-[-140px] right-[-140px] opacity-10 blur-3xl animate-pulse"
    ></div>
    <div
        class="absolute w-80 h-80 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full bottom-[-160px] left-[-160px] opacity-10 blur-3xl animate-pulse delay-300"
    ></div>
    <div
        class="absolute w-44 h-44 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 opacity-10 blur-3xl animate-pulse delay-500"
    ></div>

    <!-- Login Card -->
    <div
        class="w-full max-w-md bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-8"
    >
        <div class="text-center mb-6">
            <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto flex items-center justify-center shadow-md mb-4"
            >
                <i
                    class="fas fa-shield-alt text-white text-xl"
                    aria-hidden="true"
                ></i>
            </div>
            <h1 class="text-2xl font-bold text-slate-800">Admin Portal</h1>
            <p class="text-sm text-slate-500">
                Secure Access to Management Interface
            </p>
        </div>

        {#if error}
            <div
                class="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4 flex items-center gap-2 text-sm font-medium animate-shake"
            >
                <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                <span>{error}</span>
            </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit} class="space-y-5">
            <!-- Email field -->
            <div>
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                    >Email Address</label
                >
                <div class="relative mt-1">
                    <input
                        id="email"
                        type="email"
                        bind:value={email}
                        required
                        placeholder="admin@example.com"
                        class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <i
                        class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                    ></i>
                </div>
            </div>

            <!-- Password field -->
            <div>
                <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >Password</label
                >
                <div class="relative mt-1">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        bind:value={password}
                        required
                        placeholder="Enter your password"
                        class="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <i
                        class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                    ></i>
                    <button
                        type="button"
                        on:click={togglePassword}
                        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                        aria-label={showPassword
                            ? "Hide password"
                            : "Show password"}
                    >
                        <i
                            class={showPassword
                                ? "fas fa-eye-slash"
                                : "fas fa-eye"}
                        ></i>
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                class="w-full flex items-center justify-center gap-2 py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-lg font-semibold transition"
            >
                {#if isLoading}
                    <div
                        class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                        aria-hidden="true"
                    ></div>
                    <span>Signing In...</span>
                {:else}
                    <span>Sign In</span>
                {/if}
            </button>
        </form>

        <div class="text-center mt-6 text-sm text-gray-500">
            <a href="/auth/user" class="hover:underline">Back to User Login</a>
        </div>
    </div>
</div>
