import React from "react";
import { SiApple } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gradient-to-b from-black via-[#050816] to-black px-6 md:px-16 lg:px-24 py-12 text-white shadow-md pt-20">
        
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: About Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:w-1/2">
          <div className="flex items-center gap-2 text-gray-900">
            <SiApple className="text-4xl md:text-5xl text-black" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              iCloud
            </h1>
          </div>

          <p className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed">
            The trusted destination for authentic Apple products and premium
            accessories. Experience innovation, design, and unmatched quality —
            the Apple way.
          </p>

          <button
            className="mt-3 bg-black text-white px-5 py-2.5 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/prdctpage")}
          >
            Explore Products
          </button>
        </div>

        {/* Right: Contact Info + Map */}
        <div className="md:w-1/2 w-full flex flex-col items-center md:items-start text-center md:text-left space-y-4 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900">📍 Contact Us</h2>

          <div className="space-y-2 text-base md:text-lg">
            <p>
              <span className="font-semibold">Our Stores:</span> Tirur • Calicut • Ernakulam
            </p>
            <p>
              <span className="font-semibold">Phone:</span> +91 98765 43210
            </p>
            <p>
              <span className="font-semibold">Email:</span> info@icloudstore.in
            </p>
            <p>
              <span className="font-semibold">Hours:</span> Mon - Sat, 10:00 AM - 8:00 PM
            </p>
          </div>

          {/* Embedded Google Map */}
          <div className="w-full mt-4">
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.6066043671825!2d75.9219735142884!3d10.916437059215142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee0b0f1fba77%3A0x7f51b2e44755b7c3!2sTirur!5e0!3m2!1sen!2sin!4v1707482095426!5m2!1sen!2sin"
              width="100%"
              height="280"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="shadow-md"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
