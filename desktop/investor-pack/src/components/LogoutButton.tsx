import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LogoutButton({ className = "" }: { className?: string }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <button
      type="button"
      className={`pill pill--ghost ${className}`.trim()}
      onClick={handleLogout}
    >
      Log out
    </button>
  );
}
