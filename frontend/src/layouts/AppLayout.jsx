import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Store,
  Users,
  LockKeyhole,
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const items =
    user?.role === "ADMIN"
      ? [
          ["/admin", LayoutDashboard, "Dashboard"],
          ["/admin/users", Users, "Users"],
          ["/admin/stores", Store, "Stores"],
        ]
      : user?.role === "OWNER"
      ? [
          ["/owner", LayoutDashboard, "Dashboard"],
          ["/owner/password", LockKeyhole, "Password"],
        ]
      : [
          ["/user", Store, "Stores"],
          ["/user/password", LockKeyhole, "Password"],
        ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app">
      <aside>
        <div className="brand">
          <ShieldCheck size={26} />
          <span>RateHub</span>
        </div>

        <div className="role">
          {user?.role === "ADMIN"
            ? "SYSTEM ADMIN"
            : user?.role === "OWNER"
            ? "STORE OWNER"
            : "NORMAL USER"}
        </div>

        <nav>
          {items.map(([to, Icon, label]) => (
            <NavLink
              key={to}
              to={to}
              end={
                to !== "/admin/users" &&
                to !== "/admin/stores"
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          className="logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main>
        <header>
          <div>
            <div className="eyebrow">
              Store rating platform
            </div>

            <h1>{user?.name}</h1>
          </div>

          <div className="avatar">
            {user?.name?.charAt(0)}
          </div>
        </header>

        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}