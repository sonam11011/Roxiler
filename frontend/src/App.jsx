import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./layouts/AppLayout.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminUsers from "./pages/admin/Users.jsx";
import AdminStores from "./pages/admin/Stores.jsx";

import UserStores from "./pages/user/Stores.jsx";
import Password from "./pages/user/Password.jsx";

import OwnerDashboard from "./pages/owner/Dashboard.jsx";

import "./styles.css";

function Home() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  if (user.role === "OWNER") {
    return <Navigate to="/owner" replace />;
  }

  return <Navigate to="/user" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Authenticated Routes */}
          <Route
            element={
              <ProtectedRoute roles={["ADMIN", "USER", "OWNER"]} />
            }
          >
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />

              {/* Admin Routes */}
              <Route
                element={<ProtectedRoute roles={["ADMIN"]} />}
              >
                <Route
                  path="/admin"
                  element={<AdminDashboard />}
                />

                <Route
                  path="/admin/users"
                  element={<AdminUsers />}
                />

                <Route
                  path="/admin/stores"
                  element={<AdminStores />}
                />
              </Route>

              {/* Normal User Routes */}
              <Route
                element={<ProtectedRoute roles={["USER"]} />}
              >
                <Route
                  path="/user"
                  element={<UserStores />}
                />

                <Route
                  path="/user/password"
                  element={<Password />}
                />
              </Route>

              {/* Store Owner Routes */}
              <Route
                element={<ProtectedRoute roles={["OWNER"]} />}
              >
                <Route
                  path="/owner"
                  element={<OwnerDashboard />}
                />

                <Route
                  path="/owner/password"
                  element={<Password />}
                />
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}