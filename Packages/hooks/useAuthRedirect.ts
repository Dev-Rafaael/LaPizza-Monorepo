
import { useState, useEffect } from "react";
import {useUserStore} from "../store/useUserStore";

export function useAuthRedirect(navigate?: (path: string) => void) {
  const { user } = useUserStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(
    () => localStorage.getItem("nextPath") // 🔹 recupera ao iniciar
  );

  const requireAuth = (next: string) => {
    if (!user || !user.nome || !user.telefone) {
      // 🔹 salva no estado e no localStorage
      setNextPath(next);
      localStorage.setItem("nextPath", next);
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const handleLoginSuccess = () => {
    if (!navigate) return;
    const savedPath = localStorage.getItem("nextPath");

    if (savedPath) {
      navigate(savedPath);
      localStorage.removeItem("nextPath"); 
      setNextPath(null);
    } else {
      navigate("/Perfil");
    }
  };

  useEffect(() => {
    if (!user) localStorage.removeItem("nextPath");
  }, [user]);

  return { user, requireAuth, showAuthModal, setShowAuthModal, nextPath, handleLoginSuccess };
}
