import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";

const SESSION_KEY = "sw-pack-session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      window.investorPack.validateSession(stored).then((res) => {
        if (res.ok && res.email) {
          setToken(stored);
          setEmail(res.email);
          setFullName(res.fullName || null);
        } else {
          sessionStorage.removeItem(SESSION_KEY);
        }
        setReady(true);
      });
    } else {
      setReady(true);
    }
  }, []);

  const login = useCallback(async (emailInput: string, password: string) => {
    const res = await window.investorPack.login(emailInput, password);
    if (res.ok && res.token && res.email) {
      sessionStorage.setItem(SESSION_KEY, res.token);
      setToken(res.token);
      setEmail(res.email);
      setFullName(res.fullName || null);
      return res.token;
    }
    return null;
  }, []);

  const logout = useCallback(async () => {
    if (token) await window.investorPack.logout(token);
    sessionStorage.removeItem(SESSION_KEY);
    setToken(null);
    setEmail(null);
    setFullName(null);
  }, [token]);

  const value = useMemo(
    () => ({ token, email, fullName, login, logout }),
    [token, email, fullName, login, logout]
  );

  if (!ready) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
