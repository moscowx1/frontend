import { useStore } from "effector-react";
import { $criticalError } from "./models/app";
import ErrorPage from "./ui/ErrorPage";
import RegisterForm from "./ui/RegisterForm";

function App() {
  const critErrors = useStore($criticalError);

  if (!critErrors.length) return <RegisterForm />;

  return <ErrorPage />;
}

export default App;
