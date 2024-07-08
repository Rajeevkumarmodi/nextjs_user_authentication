"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
function page() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (
      formData.name.length > 1 &&
      formData.email.length > 8 &&
      formData.password.length > 4
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData]);

  function handleSignup(e: any) {
    e.preventDefault();

    console.log(formData);
  }

  return (
    <div className="w-full h-screen bg-blue-400 flex items-center justify-center">
      <form className="bg-white rounded-md p-5 flex flex-col gap-4">
        <h2 className=" font-bold ">Signup</h2>
        <div className="flex flex-col ">
          <label htmlFor="name">Name*</label>
          <input
            className="border-2 border-gray-300 rounded-sm px-2 py-1 outline-none"
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
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
            isDisabled ? "bg-gray-400" : "bg-red-600"
          } py-2 rounded-md text-center text-white font-bold`}
        >
          <button disabled={isDisabled} onClick={handleSignup}>
            Signup
          </button>
        </div>
        <div className="flex gap-1">
          <p>Already have an account? </p>
          <Link className="text-blue-400 font-bold" href="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default page;
