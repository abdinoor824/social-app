'use client';


import React, { useState } from 'react'
import styles from './register.module.css'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation';
const register = () => {

  const [username,setName] = useState("")
   const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
const router = useRouter();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", { username, email, password });
      router.push("/login");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };




  return (
     <div className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
      <form className={styles.form} >
      <input type="text" placeholder="username" name="username" value={username}     onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="email" name="email"  value={email}   onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="password" name="password"     onChange={(e) => setPassword(e.target.value)} />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />
      <button>Register</button>
      {/* {state?.error} */}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
    </div>
       </div>

  )
}

export default register
