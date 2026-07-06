"use client";

import { useState } from "react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="w-full max-w-md bg-slate-900 rounded-xl p-8 border border-slate-800">

        <h1 className="text-3xl font-bold text-white text-center">
          Employee Signup
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Create your workspace account
        </p>

        <div className="space-y-4 mt-8">

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
          />

          <input
            type="email"
            placeholder="Company Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3"
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
}