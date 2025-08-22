"use client";
import { useState } from "react";
import { apiLink } from "@/lib/utils";
const forgotPassword = () => {
  const [message, setMessage] = useState("");
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const response = await fetch(apiLink.teacher.forgotPassword, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setMessage(data.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleForgotPassword} className="space-y-5">
        <div>
          <p className="text-green-300 text-center text-[16px] my-4">
            {message && message}
          </p>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="teacher@example.com"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer my-hove w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Forgot Password
        </button>
      </form>
    </div>
  );
};

export default forgotPassword;
