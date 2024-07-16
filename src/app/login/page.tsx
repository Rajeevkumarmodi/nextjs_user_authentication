"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function Login() {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(e: any) {
    e.preventDefault();
    setisLoading(true);
    const res = await fetch("/api/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (result.success == true) {
      toast.success(result.message);
      setisLoading(false);
      router.push("/");
      setFormData({ email: "", password: "" });
    } else {
      toast.error(result.message);
      setisLoading(false);
    }
  }

  useEffect(() => {
    if (formData.email.length > 8 && formData.password.length >= 4) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData]);

  return (
    <div className="w-full h-screen bg-blue-400 flex items-center justify-center">
      <form className="bg-white rounded-md p-5 flex flex-col gap-4">
        <h2 className=" font-bold ">{isLoading ? "Processing..." : "Login"}</h2>

        <div className="flex flex-col ">
          <label htmlFor="email">Email*</label>
          <input
            className="border-2 border-gray-300 rounded-sm px-2 py-1 outline-none"
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="password">Password*</label>
          <input
            className="border-2 border-gray-300 rounded-sm px-2 py-1 outline-none"
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div
          className={`${
            isDisabled || isLoading ? "bg-gray-400" : "bg-red-600"
          } py-2 rounded-md text-center text-white font-bold`}
        >
          <button
            className="w-full"
            disabled={isDisabled || isLoading}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="text-center">
          <Link
            className="text-blue-500 hover:underline"
            href={"/forget-password"}
          >
            Forget password?
          </Link>
        </div>
        <div className="flex gap-1">
          <p>Do not have an account? </p>
          <Link className="text-blue-400 font-bold" href="/signup">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
