import Slider from "react-slick";
import two from "/src/assets/acc.jpeg";
import three from "/src/assets/iphone.jpg";
import four from "/src/assets/wathc.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Slider {...settings} className="h-screen">
        {/* Slide 1 */}
        <div className="relative h-screen">
          <img
            src={three}
            alt="iPhone"
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col items-start justify-center p-10 translate-y-16">
            <h2 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg mt-50">
              New iPhone Collection 📱
            </h2>
            <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-all mt-2">
              Shop Now
            </button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-screen">
          <img
            src={two}
            alt="Accessories"
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col items-start justify-center p-10 translate-y-16 ">
            <h2 className="text-black  text-4xl md:text-6xl font-bold mt-50 drop-shadow-lg">
              Premium Accessories 💼
            </h2>
            <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-all mt-2">
              Explore Now
            </button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-screen">
          <img
            src={four}
            alt="Smart Watch"
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col items-start justify-center p-10 translate-y-16">
            <h2 className="text-white text-4xl md:text-6xl font-bold mt-50 drop-shadow-lg">
              Smart Watches for Every Style ⌚
            </h2>
            <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-all mt-2">
              Discover Now
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default ProductSlider;
