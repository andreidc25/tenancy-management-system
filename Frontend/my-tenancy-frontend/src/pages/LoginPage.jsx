import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center"
      >
        <div className="flex flex-col items-center mb-6">
          <Lock className="w-10 h-10 text-gray-700 mb-2" />
          <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Please sign in to your account</p>
        </div>

        <form className="space-y-4 text-left">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-gray-700 transition"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

<h1 className="text-4xl text-blue-500 font-bold">Tailwind Works!</h1>


export default LoginPage;
