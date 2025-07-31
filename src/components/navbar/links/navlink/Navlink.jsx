"use client";

import Link from 'next/link'
import React from 'react'
import Styles from './navlink.module.css';
import { usePathname } from 'next/navigation';


const Navlink = ({item}) => {
    const pathname = usePathname();
  return (

       <Link  href={item.path} className={`${Styles.container} ${pathname === item.path && Styles.active}`}>
  {item.title}</Link> 
  
  )
}

export default Navlink
