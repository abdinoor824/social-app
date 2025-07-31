"use client";

import Link from "next/link";
import React, { useState } from "react";
import Styles from "./links.module.css";
import Navlink from "./navlink/Navlink";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const Links = () => {
  const [open, setOpen ] = useState(false);
  const links = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" },
    // { title: 'Login', path: '/login' },
    // { title: 'Admin', path: '/admin' }
  ];

  const { data: session } = useSession();
  const isAdmin = false; // Replace with actual admin check logic

  return (
    <div>
      <div className={Styles.links}>
        {links.map((link) => (
          <Navlink item={link} key={link.title} />
        ))}

        {session ? (
          <>
            {isAdmin && <Navlink item={{ title: "Admin", path: "/admin" }} />}

            <button className={Styles.logout}  onClick={() => signOut()}>logout</button>
          </>
        ) : (
          <Navlink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      {/* <button className={Styles.menuButton} onClick={() => setOpen((prev) => !prev)}>meunu</button> */}
      <Image src="/menu.png" alt="" width={30} className={Styles.menuButton}  height={30} onClick={() => setOpen((prev) => !prev)} />
      {open && (
        <div  className={Styles.mobileLinks}>
          {links.map((link) => (
            <Navlink item={link} key={link.title} />
          ))}
           {session ? (
          <>
            {isAdmin && <Navlink item={{ title: "Admin", path: "/admin" }} />}

            <button className={Styles.logout}  onClick={() => signOut()}>logout</button>
          </>
        ) : (
          <Navlink item={{ title: "Login", path: "/login" }} />
        )}
        </div>
      )}
    </div>
  );
};
export default Links;
