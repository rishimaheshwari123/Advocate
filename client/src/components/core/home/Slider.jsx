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
      headline: "EPF & ESIC Registration Made Easy",
      description:
        "We streamline EPF and ESIC registration processes, ensuring compliance with all legal requirements for your peace of mind.",
      buttonText: "REGISTER NOW",
      buttonLink: "/EPF-registration",
    },
    {
      id: 2,
      image: "https://etimg.etb2bimg.com/photo/115869083.cms",
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
      image: "https://etimg.etb2bimg.com/photo/115869083.cms",
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
    <div className="relative">
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
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        onSlideChange={handleSlideChange}
      >
        {work.map((item) => (
          <SwiperSlide key={item.id} className="relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[80vh] object-cover"
            />
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
                textVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-gradient-to-r from-[#000000a6] to-[#0000004d] text-white p-6 rounded-lg shadow-lg max-w-md w-full text-center transform transition-all duration-500 ease-in-out hover:scale-105">
                <p className="text-[#efcc41] text-xs font-semibold uppercase mb-2">
                  {item.title}
                </p>
                <h2 className="text-white text-2xl font-bold mb-3">
                  {item.headline}
                </h2>
                <p className="text-white text-sm mb-4">{item.description}</p>
                {item.buttonText && (
                  <Link
                    to={item.buttonLink || "#"}
                    className="bg-[#efcc41] text-[#62000f] px-5 py-2 rounded-full font-semibold hover:bg-[#ffc107] transition duration-300"
                  >
                    {item.buttonText}
                  </Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
