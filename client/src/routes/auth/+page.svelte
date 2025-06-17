<script>
    import { goto } from "$app/navigation";

    const navigateToLogin = (type) => {
        if (type === "user") {
            goto("/auth/user");
        } else if (type === "admin") {
            goto("/auth/admin");
        }
    };
</script>

<svelte:head>
    <title>Sign In - Choose Your Access</title>
    <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
    />
</svelte:head>

<div
    class="min-h-[100vh] flex flex-col items-center justify-center px-4 bg-slate-50 font-sans"
>
    <div class="text-center mb-12">
        <h1 class="text-4xl font-light text-slate-800 mb-2">Welcome</h1>
        <p class="text-lg text-slate-500">Choose how you'd like to sign in</p>
    </div>

    <div class="flex flex-col gap-4 w-full max-w-md">
        <button
            class="flex items-center gap-4 p-6 bg-white border border-slate-200 rounded-xl cursor-pointer transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-500 text-left w-full shadow-sm"
            on:click={() => navigateToLogin("user")}
        >
            <div
                class="text-xl w-12 h-12 flex items-center justify-center bg-slate-100 rounded-md text-slate-500"
            >
                <i class="fas fa-user"></i>
            </div>
            <div>
                <h2 class="text-xl font-semibold text-slate-800 mb-1">
                    User Login
                </h2>
                <p class="text-sm text-slate-500">
                    Access your personal account
                </p>
            </div>
        </button>

        <button
            class="flex items-center gap-4 p-6 bg-white border border-slate-200 rounded-xl cursor-pointer transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-500 text-left w-full shadow-sm"
            on:click={() => navigateToLogin("admin")}
        >
            <div
                class="text-xl w-12 h-12 flex items-center justify-center bg-slate-100 rounded-md text-slate-500"
            >
                <i class="fas fa-shield-alt"></i>
            </div>
            <div>
                <h2 class="text-xl font-semibold text-slate-800 mb-1">
                    Admin Login
                </h2>
                <p class="text-sm text-slate-500">Administrative access</p>
            </div>
        </button>
    </div>
</div>
