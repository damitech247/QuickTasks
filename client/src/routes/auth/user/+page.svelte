<!-- client\src\routes\auth\user\+page.svelte -->
<script>
    let email = "";
    let password = "";
    let error = "";
    let isLoading = false;
    let showPassword = false;
    let rememberMe = false;

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
                body: JSON.stringify({
                    email,
                    password,
                    role: "user",
                    rememberMe,
                }),
            });

            if (res.ok) {
                window.location.href = "/dashboard";
            } else {
                error = "Invalid email or password. Please try again.";
            }
        } catch (err) {
            error =
                "Connection error. Please check your internet and try again.";
        } finally {
            isLoading = false;
        }
    };

    const togglePassword = () => {
        showPassword = !showPassword;
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };
</script>

<svelte:head>
    <title>Sign In - Welcome Back</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
    />
</svelte:head>

<div class="flex flex-col md:flex-row min-h-screen font-sans">
    <!-- Branding Panel -->
    <div
        class="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center p-12 relative overflow-hidden"
    >
        <div class="text-center max-w-md z-10">
            <!-- <div class="mb-10">
                <div
                    class="w-16 h-16 rounded-xl bg-white/20 border border-white/30 backdrop-blur flex items-center justify-center"
                >
                    <i class="fas fa-bolt text-2xl text-white mx-auto"></i>
                </div>
            </div> -->
            <h2 class="text-4xl font-light leading-tight mb-6">
                Task Management!
            </h2>
            <p class="text-lg opacity-90">
                Stay organized and focused. Easily manage, track, and prioritize
                your tasks in one place.
            </p>
        </div>
        <!-- Decorative Circles -->
        <div
            class="absolute w-32 h-32 rounded-full bg-white/10 top-10 right-16 animate-pulse"
        ></div>
        <div
            class="absolute w-20 h-20 rounded-full bg-white/10 bottom-20 right-28 animate-pulse delay-500"
        ></div>
        <div
            class="absolute w-40 h-40 rounded-full bg-white/10 top-2/3 left-10 animate-pulse delay-1000"
        ></div>
    </div>

    <!-- Login Form Panel -->
    <div class="flex-1 bg-gray-50 flex items-center justify-center p-8">
        <div class="w-full max-w-md">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-semibold text-gray-800 mb-1">
                    Sign in to your Account
                </h2>
                <p class="text-gray-500">
                    Enter your credentials to manage your tasks
                </p>
            </div>

            {#if error}
                <div
                    class="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6"
                >
                    <div class="flex gap-2">
                        <i class="fas fa-exclamation-circle mt-1"></i>
                        <div>
                            <strong class="block">Oops!</strong>
                            <p class="text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            {/if}

            <form on:submit|preventDefault={handleSubmit} class="space-y-5">
                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >Email address</label
                    >
                    <div class="relative mt-1">
                        <input
                            id="email"
                            type="email"
                            bind:value={email}
                            placeholder="you@example.com"
                            required
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-indigo-300"
                            on:keypress={handleKeyPress}
                        />
                        <i
                            class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                    </div>
                </div>

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
                            placeholder="Enter your password"
                            required
                            class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-indigo-300"
                            on:keypress={handleKeyPress}
                        />
                        <i
                            class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <button
                            type="button"
                            on:click={togglePassword}
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-500"
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

                <div class="flex items-center gap-2">
                    <input
                        type="checkbox"
                        bind:checked={rememberMe}
                        id="remember"
                        class="accent-indigo-500"
                    />
                    <label for="remember" class="text-sm text-gray-600"
                        >Remember me</label
                    >
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !email || !password}
                    class="w-full py-3 px-4 text-white font-semibold rounded-xl transition bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {#if isLoading}
                        <div
                            class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                            aria-hidden="true"
                        ></div>
                        <span>Signing in...</span>
                    {:else}
                        <span>Sign In</span>
                        <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    {/if}
                </button>
            </form>

            <div class="text-center text-sm text-gray-500 mt-6 border-t pt-4">
                <p>
                    Are you an Administrator?
                    <a
                        href="/auth/admin"
                        class="text-indigo-600 hover:underline font-medium"
                        >Click Here</a
                    >
                </p>
            </div>
        </div>
    </div>
</div>
