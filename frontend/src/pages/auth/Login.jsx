import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";
import AuthForm from "../../components/auth/AuthForm";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address.";
    if (!password) return "Password is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      login(data.token, { email });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-sm mx-auto pt-6 px-4">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      <AuthForm
        title="Log in"
        subtitle="Welcome back"
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
        fields={
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClass}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={inputClass}
            />
          </>
        }
        footer={
          <>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </>
        }
      />
    </>
  );
}