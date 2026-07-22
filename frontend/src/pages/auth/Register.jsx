import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";
import AuthForm from "../../components/auth/AuthForm";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await registerUser({ username, email, password });
      login(data.token, { username, email });
     navigate("/dashboard", { replace: true });
    } catch (err) {
      // express-validator errors come back as { errors: [{ msg, path }] }
      const validationMsg = err.response?.data?.errors?.[0]?.msg;
      const generalMsg = err.response?.data?.message;
      setError(validationMsg || generalMsg || "Registration failed. Please try again.");
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
        title="Sign up"
        subtitle="Create your account"
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
        fields={
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={inputClass}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className={inputClass}
            />
          </>
        }
        footer={
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Log in
            </Link>
          </>
        }
      />
    </>
  );
}