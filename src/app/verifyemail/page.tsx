"use client";

import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyToken({}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  async function handleClick() {
    const token = searchParams.get("token");

    const res = await fetch("/api/user/verify-email", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const result = await res.json();
    if (result.success) {
      toast.success(result.message);
      router.push("/");
    } else {
      toast.error(result.message);
      router.push("/");
    }
    console.log("hello this is result", result);
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div>
        <p>Verify your email address by clicking the below button</p>
        <div className="text-center">
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-5 py-2 font-bold rounded-md mt-4"
          >
            Verify email
          </button>
        </div>
      </div>
    </div>
  );
}
