"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-dark-lighter border border-white/10 p-8 rounded-sm shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-light mb-2">Admin Access</h1>
          <p className="text-sm text-light-muted">Please enter the administrative password to manage reservations.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full bg-dark border border-white/10 rounded-sm p-3 text-center text-light focus:border-primary focus:outline-none transition-colors"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm justify-center bg-red-500/10 p-3 rounded-sm border border-red-500/20">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold tracking-wider uppercase flex items-center justify-center gap-2 rounded-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] ${
              loading ? "bg-primary-dark text-dark cursor-wait" : "bg-primary text-dark hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            }`}
          >
            {loading ? "Authenticating..." : (
              <>
                Login <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
        <div className="mt-6 text-center text-xs text-white/30">
          KSAR AYED Lounge Internal System
        </div>
      </motion.div>
    </div>
  );
}
