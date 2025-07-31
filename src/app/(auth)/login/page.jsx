"use client";



import Link from "next/link";
import React from "react";
import styles from "./login.module.css";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn } from "next-auth/react";


const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();



  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    if (res.ok) {
      router.push("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Login Page</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" name="username" value={username} onChange={(e) =>setUsername(e.target.value)} />
          <input type="password" placeholder="Password" name="password"    onChange={(e) => setPassword(e.target.value)}
        value={password} />
          <button type="submit">Login</button>
          <Link href="/register">
            Don't have an account? <b>Register</b>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default login;
