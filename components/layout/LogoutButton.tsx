"use client";

import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // 1. Manual backup: Delete the cookie by setting it to expire
          document.cookie =
            "better-auth.session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          document.cookie =
            "__Secure-better-auth.session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

          // 2. Clear Next.js cache and Hard Redirect
          window.location.href = "/login";
        },
      },
    });
  };

  return (
    <button onClick={handleLogout} className="...">
      Logout
    </button>
  );
}
