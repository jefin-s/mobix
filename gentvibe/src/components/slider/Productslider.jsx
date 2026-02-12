import Slider from "react-slick";
import two from "/src/assets/acc.jpeg";
import three from "/src/assets/iphone.jpg";
import four from "/src/assets/ipad.jpg";
import five from "/src/assets/17 air.webp"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





const ProductSlider = () => {
  return (
    <div className="
    min-h-screen 
    bg-gradient-to-b from-black via-[#050816] to-black 
    text-white 
    flex items-center
    ">

      {/* CENTER CONTAINER */}
      <div className="
      max-w-7xl mx-auto w-full 
      px-4 sm:px-6 md:px-8
      flex flex-col md:flex-row 
      items-center justify-between
      gap-10
      ">

        {/* LEFT TEXT */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
          font-bold leading-tight
          ">
            Discover the Best Apple Gadgets
          </h1>

          <p className="
          text-gray-400 
          mt-4 sm:mt-6 
          text-sm sm:text-base md:text-lg
          ">
            Explore the latest iPhones, iPads, MacBooks, AirPods, and more.
          </p>

          {/* BUTTONS */}
          <div className="
          flex flex-col sm:flex-row 
          gap-4 sm:gap-5 
          mt-6 sm:mt-8 
          justify-center md:justify-start
          ">
            <button className="
            bg-blue-600 hover:bg-blue-700 
            px-6 sm:px-8 
            py-2.5 sm:py-3 
            rounded-full 
            font-semibold shadow-lg transition
            ">
              Shop Now
            </button>

            <button className="
            border border-gray-600 hover:border-white 
            px-6 sm:px-8 
            py-2.5 sm:py-3 
            rounded-full font-semibold transition
            ">
              Browse Products
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE — NOW VISIBLE ON MOBILE */}
        <div className="
        flex justify-center items-center 
        w-full md:w-auto
        ">

          <img
            src="/bannner.png"
            alt="Product"
            className="
            w-[260px] 
            sm:w-[340px] 
            md:w-[420px] 
            lg:w-[520px]
            object-contain 
            drop-shadow-2xl
            "
          />
        </div>

      </div>
    </div>
  );
};


export default ProductSlider;
