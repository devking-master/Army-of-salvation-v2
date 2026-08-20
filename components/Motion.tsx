"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
export function Reveal({ children, delay=0, className="" }: {children:ReactNode; delay?:number; className?:string}) {
 return <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:.2}} transition={{duration:.65, delay}} className={className}>{children}</motion.div>
}
export function HoverCard({ children, className="" }: {children:ReactNode; className?:string}) {
 return <motion.div whileHover={{ y:-8, scale:1.015 }} transition={{type:"spring", stiffness:260, damping:18}} className={className}>{children}</motion.div>
}
