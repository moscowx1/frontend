import { useStore } from "effector-react";
import LoginForm from "./ui/LoginForm";
import { $criticalError } from "./models/app";
import ErrorPage from "./ui/ErrorPage";

function App() {
  const critErrors = useStore($criticalError);

  if (!critErrors.length) return <LoginForm></LoginForm>;

  return <ErrorPage />;
}

export default App;
