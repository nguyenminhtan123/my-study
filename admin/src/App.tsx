import { Session } from "@supabase/supabase-js";
import { FormEvent, useEffect, useState } from "react";

import EditPage from "./pages/Edit";
import GuestsPage from "./pages/Guests";
import ListPage from "./pages/List";
import RsvpsPage from "./pages/Rsvps";
import { supabase } from "./supabase";

// Simple hash routes: #/ list, #/new, #/edit/<code>, #/guests/<code>, #/rsvps/<code>
const useRoute = () => {
  const [hash, setHash] = useState(location.hash);
  useEffect(() => {
    const on = () => setHash(location.hash);
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  const [, page = "", code = ""] = hash.replace(/^#/, "").split("/");
  return { page, code: decodeURIComponent(code) };
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (error) setError("Sai email hoặc mật khẩu.");
  };
  return (
    <form className="login card" onSubmit={submit}>
      <h1>Quản lý thiệp cưới</h1>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Mật khẩu
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button className="primary" disabled={busy}>
        {busy ? "Đang đăng nhập…" : "Đăng nhập"}
      </button>
    </form>
  );
};

const App = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [admin, setAdmin] = useState<boolean | null>(null);
  const route = useRoute();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return setAdmin(null);
    supabase.rpc("is_admin").then(({ data }) => setAdmin(data === true));
  }, [session]);

  if (session === undefined) return <p className="center muted">Đang tải…</p>;
  if (!session) return <Login />;
  if (admin === null)
    return <p className="center muted">Đang kiểm tra quyền…</p>;
  if (!admin)
    return (
      <div className="login card">
        <h1>Không có quyền</h1>
        <p>Tài khoản {session.user.email} chưa được cấp quyền quản lý.</p>
        <button onClick={() => supabase.auth.signOut()}>Đăng xuất</button>
      </div>
    );

  return (
    <div className="shell">
      <header className="top">
        <a href="#/" className="brand">
          Thiệp cưới · Quản lý
        </a>
        <span className="muted small">{session.user.email}</span>
        <button className="link" onClick={() => supabase.auth.signOut()}>
          Đăng xuất
        </button>
      </header>
      <main>
        {route.page === "new" && <EditPage />}
        {route.page === "edit" && <EditPage code={route.code} />}
        {route.page === "guests" && <GuestsPage code={route.code} />}
        {route.page === "rsvps" && <RsvpsPage code={route.code} />}
        {!["new", "edit", "guests", "rsvps"].includes(route.page) && (
          <ListPage />
        )}
      </main>
    </div>
  );
};

export default App;
