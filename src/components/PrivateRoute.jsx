import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="text-center py-20 text-black">Yükleniyor...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
