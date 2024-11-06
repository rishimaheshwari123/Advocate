import React, { useState, useEffect } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

const Slider = () => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const work = [
    {
      id: 1,
      image:
        "https://bl-i.thgim.com/public/incoming/hfreq1/article68733245.ece/alternates/FREE_1200/IMG_iStock-1323246008_2_1_MD9MCE1K.jpg",
      title: "Your Compliance, Our Commitment",
      headline: "EPS & ESIC Registration Made Easy",
      description:
        "We streamline EPS and ESIC registration processes, ensuring compliance with all legal requirements for your peace of mind.",
      buttonText: "REGISTER NOW",
      buttonLink: "/eps-registration",
    },
    {
      id: 2,
      image: "https://theleaflet.in/wp-content/uploads/2023/07/GST.png",
      title: "Efficient GST Solutions",
      headline: "Seamless GST Registration & Returns",
      description:
        "Our expert team manages GST registrations and returns, providing accurate, timely, and hassle-free service for your business.",
      buttonText: "LEARN MORE",
      buttonLink: "/gst-registration",
    },
    {
      id: 3,
      image:
        "https://bl-i.thgim.com/public/incoming/hfreq1/article68733245.ece/alternates/FREE_1200/IMG_iStock-1323246008_2_1_MD9MCE1K.jpg",
      title: "Reliable EPF Compliance",
      headline: "Monthly EPF & ESIC Compliance",
      description:
        "We assist businesses with EPF & ESIC compliance on a monthly basis, helping you stay updated and compliant with ease.",
      buttonText: "GET STARTED",
      buttonLink: "/epf-esic-monthly-compliance",
    },
    {
      id: 4,
      image:
        "https://bl-i.thgim.com/public/incoming/hfreq1/article68733245.ece/alternates/FREE_1200/IMG_iStock-1323246008_2_1_MD9MCE1K.jpg",
      title: "Swift EPF Withdrawal Assistance",
      headline: "Easy EPF Withdrawal",
      description:
        "Our team provides guidance for a smooth EPF withdrawal process, ensuring your benefits reach you efficiently.",
      buttonText: "APPLY NOW",
      buttonLink: "/epf-withdrawal",
    },
    {
      id: 5,
      image: "https://theleaflet.in/wp-content/uploads/2023/07/GST.png",
      title: "GST Return Filing",
      headline: "Accurate & Timely GST Return Filing",
      description:
        "We help businesses manage GST return filing, ensuring timely submissions to avoid penalties and ensure compliance.",
      buttonText: "FILE NOW",
      buttonLink: "/gst-return",
    },
  ];

  const handleSlideChange = () => {
    setTextVisible(false);
    setTimeout(() => setTextVisible(true), 500);
  };

  return (
    <div className="relative bg-[#62000f]">
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
          EffectFade,
        ]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
        onSlideChange={handleSlideChange}
      >
        {work.map((item) => (
          <SwiperSlide key={item.id} className="relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[80vh] sm:h-[60vh] md:h-[80vh] lg:h-[90vh] object-cover"
            />
            <div
              className={`absolute inset-0 p-8 z-10 flex flex-col justify-center transition-opacity duration-1000 ${
                textVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-[#62000f] bg-opacity-60 text-white p-5  sm:p-6 md:p-8 lg:p-12 max-w-full  md:max-w-lg ml-auto">
                <p className="text-[#efcc41] text-xs sm:text-sm md:text-base font-bold mb-2">
                  {item.title}
                </p>
                <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {item.headline}
                </h2>
                <p className="text-white text-sm sm:text-base md:text-lg mb-6">
                  {item.description}
                </p>
                {item.buttonText && (
                  <Link
                    to={item.buttonLink ? item.buttonLink : "#"}
                    className="bg-[#efcc41] text-[#62000f] px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-[#ffc107] transition duration-300"
                  >
                    {item.buttonText}
                  </Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Centered Advice Message */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-70 p-4 z-10">
        <p className="text-white text-base sm:text-lg font-semibold text-center max-w-xs sm:max-w-md mx-4 border border-white rounded-lg p-2 shadow-lg animate-blink">
          “Free” Advice is more Expensive than “Fee” Advice
        </p>
      </div>
    </div>
  );
};

export default Slider;
