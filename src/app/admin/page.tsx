"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function page() {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchApiData() {
    setIsLoading(true);
    const res = await fetch("/api/user/all-user");
    const result = await res.json();
    if (result.success === true) {
      setAllUsers(result.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(result.message);
    }
  }

  async function deleteUser(id: string) {
    const res = await fetch("/api/user/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id }),
    });

    const result = await res.json();
    if (result.success === true) {
      toast.success(result.message);
      fetchApiData();
    } else {
      toast.error(result.message);
    }
  }

  async function handleLogout() {
    const res = await fetch("/api/user/logout");
    const result = await res.json();
    if (result.success === true) {
      router.push("/login");
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <div className="bg-white flex items-center justify-between px-5 py-2">
        <h2 className="font-bold">Admin</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500  px-4 py-1 text-white rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="mt-9 w-[80%] m-auto">
        <table className="bg-white w-full ">
          <thead className="">
            <th className="border-[1px] border-gray-700 py-1">Name</th>
            <th className="border-[1px] border-gray-700">Email</th>
            <th className="border-[1px] border-gray-700">Button</th>
          </thead>
          <tbody className="border-[1px] border-gray-700 ">
            {isLoading ? (
              <div className="font-bold text-center my-2">Loading...</div>
            ) : (
              allUsers.map((user, i) => (
                <tr className="border-[1px] border-gray-700 " key={i}>
                  <td className="border-[1px] border-gray-700 px-3">
                    {user.name}
                  </td>
                  <td className="border-[1px] border-gray-700">{user.email}</td>
                  <td className="border-[1px] border-gray-700 text-center  py-1">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-600 px-4 rounded-lg py-1 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
