import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await window.auth.getSession();
      if (session?.loggedIn) {
        setIsAuth(true);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono">
        Loading...
      </div>
    );
  }

  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
