"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

function ForgetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  async function handleForgetPassword(e: any) {
    e.preventDefault();
    // setisLoading(true);
    const token = searchParams.get("token");

    if (formData.password !== formData.confirmPassword) {
      toast.error("password and confirm password not must be same");
    } else {
      const res = await fetch("/api/user/forgetpassword", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password: formData.password }),
      });

      const result = await res.json();

      if (result.success == true) {
        toast.success(result.message);
        setisLoading(false);
        router.push("/login");
        setFormData({ confirmPassword: "", password: "" });
      } else {
        toast.error(result.message);
        setisLoading(false);
        router.push("/login");
      }
    }
  }

  useEffect(() => {
    if (formData.password.length >= 4 && formData.confirmPassword.length >= 4) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData]);

  return (
    <div className="w-full h-screen bg-blue-400 flex items-center justify-center">
      <form className="bg-white rounded-md p-5 flex flex-col gap-4">
        <h2 className=" font-bold ">
          {isLoading ? "Processing..." : "Create New Password"}
        </h2>

        <div className="flex flex-col ">
          <label htmlFor="email">Password</label>
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
        <div className="flex flex-col ">
          <label htmlFor="password">Confirm Password</label>
          <input
            className="border-2 border-gray-300 rounded-sm px-2 py-1 outline-none"
            type="cPassword"
            id="cPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
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
            onClick={handleForgetPassword}
          >
            Create New Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;
