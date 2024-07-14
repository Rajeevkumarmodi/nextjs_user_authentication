"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [userDetail, setUserDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const router = useRouter();

  async function handleLogout() {
    const res = await fetch("/api/user/logout");
    const result = await res.json();
    if (result.success === true) {
      router.push("/login");
    } else {
      toast.error(result.message);
    }
  }

  async function fetchSingleUserData() {
    setIsLoading(true);
    const res = await fetch("/api/user/me");
    const result = await res.json();

    if (result.success === true) {
      setUserDetail(result.data);
      setIsLoading(false);
    } else {
      toast.error(result.message);
      setIsLoading(false);
    }
  }

  async function handleVarify() {
    setButtonLoading(true);
    const res = await fetch("/api/user/send-email", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userDetail.email,
        emailType: "VERIFY",
        userId: userDetail._id,
      }),
    });

    const result = await res.json();
    if (result.success) {
      setButtonLoading(false);
      toast.success(result.message);
    } else {
      setButtonLoading(false);
      toast.error(result.message);
    }
  }

  useEffect(() => {
    fetchSingleUserData();
  }, []);

  return (
    <div className="bg-blue-400 w-full h-screen">
      <div className="bg-white w-[80%] m-auto rounded-lg flex justify-between px-3 py-2 relative top-10">
        <h2 className="font-bold">NextAuth</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className=" flex justify-center items-center h-[70%]">
        <div className="bg-white p-6 rounded-lg ">
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <p className="font-bold mb-3">Welcome {userDetail.name}</p>
              <div className="flex flex-col gap-2">
                <p>Name : {userDetail.name}</p>
                <p>Email : {userDetail.email}</p>
              </div>

              <div>
                {userDetail.isVarified ? (
                  <p className="mt-4 text-green-400">varified</p>
                ) : (
                  <button
                    disabled={buttonLoading}
                    onClick={handleVarify}
                    className={`px-5 py-2 ${
                      buttonLoading ? "bg-gray-400" : "bg-blue-500"
                    } mt-4 text-white rounded-md`}
                  >
                    {buttonLoading ? "Processing..." : " varify email"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
