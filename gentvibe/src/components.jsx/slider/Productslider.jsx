import Slider from "react-slick";
import two from "/src/assets/2.jpg";
import three from '/src/assets/3.webp';
import four from "/src/assets/4.png";

const ProductSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-4 my-10">
      <Slider {...settings}>
        <img
          src={three}
          alt="Product"
          className="w-full h-48 sm:h-60 md:h-72 lg:h-80 xl:h-[450px] object-cover rounded"
        />
        <img
          src={two}
          alt="Product"
          className="w-full h-48 sm:h-60 md:h-72 lg:h-80 xl:h-[450px] object-cover rounded"
        />
        <img
          src={four}
          alt="Product"
          className="w-full h-48 sm:h-60 md:h-72 lg:h-80 xl:h-[450px] object-cover rounded"
        />
      </Slider>
    </div>
  );
};

export default ProductSlider;
