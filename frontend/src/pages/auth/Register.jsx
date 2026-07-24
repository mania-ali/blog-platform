import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";
import AuthForm from "../../components/auth/AuthForm";

const inputClass =
  "w-full bg-gray-50 border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:border-transparent transition";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!username.trim()) return "Username is required.";
    if (username.trim().length < 3) return "Username must be at least 3 characters.";
    if (!email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
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
      const data = await registerUser({ username, email, password });
      login(data.token, { username, email });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const validationMsg = err.response?.data?.errors?.[0]?.msg;
      const generalMsg = err.response?.data?.message;
      setError(validationMsg || generalMsg || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] pt-4">
      <div className="max-w-md mx-auto px-4 pt-4">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-[#1877f2] transition"
        >
          ← Home
        </button>
      </div>

      <AuthForm
        title="Create account"
        subtitle="It's quick and easy"
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
        fields={
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
        }
        footer={
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-[#1877f2] hover:underline font-semibold">
              Log in
            </Link>
          </>
        }
      />
    </div>
  );
}