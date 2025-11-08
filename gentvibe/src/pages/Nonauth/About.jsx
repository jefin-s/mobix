import React from "react";
import { SiApple } from "react-icons/si";
import aboutpic from "/src/assets/aboutpic.png";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate=useNavigate()
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-linear-to-b from-white to-gray-100 px-8 md:px-16 lg:px-24 py-12">
      {/* Left content */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:w-1/2">
        <div className="flex items-center gap-3 text-gray-900">
          <SiApple className="text-6xl md:text-7xl text-black" />
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
            iCloud
          </h1>
        </div>

        <p className="text-lg md:text-xl text-gray-600 max-w-md leading-relaxed">
          The trusted destination for authentic Apple products and premium
          accessories. Experience innovation, design, and unmatched quality — 
          the Apple way.
        </p>

        <h2 className="text-gray-800 font-semibold text-lg">
          📍 TIRUR • CALICUT • ERNAKULAM
        </h2>

        <button className="mt-4 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 hover:scale-105" onClick={()=>navigate('/prdctpage')}>
          Explore Products
        </button>
      </div>

     
      <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src={aboutpic}
          alt="Apple Product Showcase"
          className="h-[300px] md:h-[550px] lg:h-[650px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </div>
    </section>
  );
};

export default About;
