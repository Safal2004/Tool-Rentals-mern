import { useState } from "react";
import AuthForm from "../components/AuthForm";
import useLogin from "../hooks/auth/useLogin";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <AuthForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      name="Login"
      altMsg="Not registered?"
      altPath="register"
      loading={loading}
    />
  );
};

export default Login;
