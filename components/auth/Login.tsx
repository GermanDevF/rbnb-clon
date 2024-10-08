"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ButtonLoader from "../layout/ButtonLoader";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      router.replace("/");
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h1 className="mb-3">Login</h1>
          <div className="mb-3">
            <label className="form-label" htmlFor="email_field">
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link href="/password/forgot" className="float-end mt-2">
            Forgot Password?
          </Link>

          <button
            id="login_button"
            type="submit"
            disabled={loading}
            className="btn form-btn w-100 py-2">
            {loading ? <ButtonLoader /> : "Login"}
          </button>

          <div className="mt-3 mb-4">
            <a href="/register" className="float-end">
              {" "}
              New User? Register Here{" "}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
