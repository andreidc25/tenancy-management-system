import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Building2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      console.log("Login response:", data);

      // Save tokens + user info
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("is_staff", data.is_staff);
      localStorage.setItem("username", data.username);

      // ✅ Convert is_staff to proper boolean (handles both string/bool cases)
      const isStaff = data.is_staff === true || data.is_staff === "true";

      // ✅ Redirect based on role
      if (isStaff) {
        navigate("/admin");
      } else {
        navigate("/tenant");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen p-4" style={{ fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(135deg, #0d1726 0%, #1a2942 50%, #0d1726 100%)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Logo - Top Left */}
      <div className="relative z-10 mb-8">
        <img 
          src="/landscape logo.svg" 
          className="h-15 cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => navigate("/login")}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          alt="Tenancy System"
          draggable="false"
        />
      </div>

      {/* Login Form - Centered */}
      <div className="relative z-10 w-full max-w-sm mx-auto" style={{ marginTop: '12vh' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl"
        >

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4 mx-auto shadow-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-1">Welcome Back</h2>
            <p className="text-gray-300 text-center text-sm">Sign in to access your dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-500/20 border border-red-400/30 text-red-200 rounded-xl text-sm flex items-center backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-white font-semibold mb-2 text-sm">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="w-full px-4 py-3 border-2 border-white/30 rounded-xl focus:ring-2 focus:border-white/60 transition duration-200 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 outline-none"
                style={{ '--tw-ring-color': 'rgba(255, 255, 255, 0.3)' }}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border-2 border-white/30 rounded-xl focus:ring-2 focus:border-white/60 transition duration-200 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 pr-12 outline-none"
                  style={{ '--tw-ring-color': 'rgba(255, 255, 255, 0.3)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition duration-300 mt-6 bg-white text-gray-900 hover:bg-gray-100"
            >
              Sign In
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;