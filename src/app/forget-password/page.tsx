"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

function forgetPassword() {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setisLoading(true);

    const res = await fetch("/api/user/find-by-email", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const user = await res.json();

    if (user.success) {
      const emailRes = await fetch("/api/user/send-email", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.data.email,
          emailType: "RESET",
          userId: user.data._id,
        }),
      });

      const emailResult = await emailRes.json();

      if (emailResult.success == true) {
        toast.success(emailResult.message);
        setisLoading(false);
        router.push("/");
        setEmail("");
      } else {
        toast.error(emailResult.message);
        setisLoading(false);
      }
    } else {
      toast.error(user.message);
      setisLoading(false);
      setEmail("");
    }
  }

  useEffect(() => {
    if (email.length > 8) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email]);

  return (
    <div className="w-full h-screen bg-blue-400 flex items-center justify-center">
      <form className="bg-white rounded-md p-5 flex flex-col gap-4">
        <h2 className=" font-bold ">
          {isLoading ? "Processing..." : "Forget Password"}
        </h2>

        <div className="flex flex-col ">
          <label htmlFor="email">Email</label>
          <input
            className="border-2 border-gray-300 rounded-sm px-2 py-1 outline-none"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleSubmit}
          >
            Forget Password
          </button>
        </div>
        <div className="flex gap-1">
          <p>Go to</p>
          <Link className="text-blue-400 font-bold" href="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default forgetPassword;
