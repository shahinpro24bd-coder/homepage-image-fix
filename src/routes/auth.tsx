import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ensureAdminAccount } from "@/lib/cms.functions";
import { usernameToEmail } from "@/lib/cms";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In | QMEP Electromechanical LLC" },
      { name: "description", content: "Sign in to manage the QMEP website content." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Sign In | QMEP" },
      { property: "og:description", content: "QMEP website admin panel sign in." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      if (username.trim().toLowerCase() === "admin") await ensureAdminAccount();
      const { error } = await supabase.auth.signInWithPassword({ email: usernameToEmail(username), password });
      if (error) throw error;
      nav({ to: "/admin", replace: true });
    } catch {
      setErr("Wrong username or password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "100vh", padding: 16 }}>
      <form onSubmit={submit} className="bg-white shadow p-5" style={{ width: "100%", maxWidth: 420, borderTop: "4px solid var(--primary)" }}>
        <h1 className="display-6 mb-1">QMEP Admin</h1>
        <p className="text-muted mb-4">Sign in to edit your website.</p>
        <label className="form-label">Username</label>
        <input className="form-control mb-3" style={{ height: 50 }} value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="username" />
        <label className="form-label">Password</label>
        <input type="password" className="form-control mb-3" style={{ height: 50 }} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        {err && <p className="text-danger">{err}</p>}
        <button className="btn btn-primary w-100 py-3" disabled={busy}>{busy ? "Signing in…" : "Sign In"}</button>
        <a href="/" className="d-block text-center mt-3">← Back to website</a>
      </form>
    </div>
  );
}
