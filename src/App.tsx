import { useContext, useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { UserContext } from "./store/UserContext";
import { checkUserAuth } from "./utils/login-api";
import { Loader } from "./components/UI/Loader";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    checkUserAuth(setUser).finally(() => setIsUserLoading(false));
  }, []);

  if (isUserLoading) return <Loader />;

  return <>{!user.username && !isUserLoading ? <LoginPage /> : <MainPage />}</>;
}

export default App;
