"use client";
// import { isValidEmailAddressFormat } from "../../lib/";
import { isValidEmailAddressFormat, apiLink } from "@/lib/utils";
import Link from "next/link";
import { ForgotPassword } from "@/components";
// import { isValidEmailAddressFormat } from "@/app/lib/utils";
import { useState } from "react";

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [actionType, setActionType] = useState("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log(
      "Login details:",
      { email, password },
      process.env.NEXT_PUBLIC_SERVER_URL,
      process.env.DATABASE_URL,
    );

    if (!isValidEmailAddressFormat(email)) {
      setError("invalid Email");
    }

    const response = await fetch(apiLink.teacher.login, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });

    // TODO: Call your backend API here
  };

  const links = [
    {
      type: "register",
      text: "Don’t have an account? ",
      linkText: "Register",
      color: "text-blue-600 hover:underline",
    },
    {
      type: "login",
      text: "Teacher Login",
      linkText: "Login",
      color: "text-green-500 hover:underline",
    },
    {
      type: "forgot-pass",
      text: "Reset Password",
      linkText: "Forgot Password",
      color: "text-red-400 hover:underline",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {links
          .filter((link) => link.type === actionType)
          .map((link) => (
            <h2
              key={link.type}
              className="mb-6 text-center text-2xl font-bold text-gray-800"
            >
              {link.text}
            </h2>
          ))}
        {actionType === "login" && (
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  id="email"
                  placeholder="teacher@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer my-hove w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                Login
              </button>
            </form>
          </div>
        )}

        {actionType === "register" && (
          <div>
            <h1 className="aaa">register</h1>
          </div>
        )}
        {actionType === "forgot-pass" && <ForgotPassword />}

        {links
          .filter((link) => link.type !== actionType)
          .map((link) => (
            <p
              key={link.type}
              className={`mt-4 text-center text-sm ${
                link.type === "register"
                  ? "text-gray-500"
                  : link.type === "login"
                    ? "text-green-500"
                    : "text-red-400"
              }`}
            >
              {/* link.text && link.text */}
              <Link
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setActionType(link.type);
                }}
                className={link.color}
              >
                {link.linkText}
              </Link>
            </p>
          ))}
        <p className="text-red-600 text-center text-[16px] my-4">
          {error && error}
        </p>
      </div>
    </div>
  );
}
