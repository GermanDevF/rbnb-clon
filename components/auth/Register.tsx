"use client";
import { useRegisterMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const router = useRouter();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      router.push("/login");
      toast.success("Account Register. You Can Login now.");
    }
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };

    register(userData);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Join Us</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                {" "}
                Full Name{" "}
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email_field">
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password_field">
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="btn form-btn w-100 py-2"
              disabled={isLoading}>
              {isLoading ? <ButtonLoader /> : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
