"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import profilePic from "../../public/assets/image/withayuxh.jpg";
import LoadingOverlay from "./CommonCompo/LoadingOverlay";

export default function Home() {
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 2000);
  return () => clearTimeout(timer);
 }, []);

 return (
  <div className="relative w-full h-screen bg-black text-white overflow-hidden">
   <LoadingOverlay isLoading={loading} />

   {!loading && (
    <>
     {/* Background AYUSH */}
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none px-4 w-full text-center">
      <h1
       style={{ fontFamily: "MyCustomFont2" }}
       className="font-bold opacity-[0.05] select-none leading-none text-[220px] md:text-[280px] whitespace-nowrap md:whitespace-nowrap"
      >
       <span className="hidden max-md:inline">
        Ay
        <br />
        ush
       </span>
       <span className="max-md:hidden">Ayush</span>
      </h1>
     </div>

     {/* Foreground Content */}
     <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      {/* i'm ayush */}
      <div className="flex items-center gap-2 text-[90px] sm:text-[70px] md:text-[160px] font-extralight leading-none flex-wrap justify-center">
       <span>i'm</span>
       <Image
        src={profilePic}
        alt="Profile"
        width={150}
        unoptimized
        className="object-cover"
        style={{ borderRadius: '6px' }} // ya '10px', '1rem' etc.
       />



       <span>ayush</span>
      </div>

      {/* subtitle */}
      <h2 className="text-[100px] sm:text-[50px] md:text-[110px] font-bold tracking-tight leading-none mt-[-10px]">
       Bringing Ideas to Reality
      </h2>
     </div>
    </>
   )}
  </div>
 );
}
