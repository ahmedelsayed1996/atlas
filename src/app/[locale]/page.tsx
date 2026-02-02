
"use client";
import SwiperSliderLogo from "@/app/_components/SwiperSliderLogo";
// import SwiperSliderUNI from "@/app/_components/SwiperSliderUNI";
// import SwiperSliderINS from "@/app/_components/SwiperSliderINS";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import React, { useEffect, useState } from "react";
import NewHero from "../_components/NewHero";
import NewSearch from "../_components/NewSearch";
import NewAbout from "../_components/NewAbout";
import DistinguishesEduxa from "../_components/DistinguishesEduxa";
import StudentsFeedback from "../_components/StudentsFeedback";
import NewFQA from "../_components/NewFQA";
import NewContact from "../_components/NewContact";
import { useHomeData } from "../_hooks/useHomeData";
import SwiperSliderUNI from "../_components/SwiperSliderUNI";
import SwiperSliderINS from "../_components/SwiperSliderINS";
import Image from "next/image";

function NewHome() {
  const imageUrl: string[] = ["/images/hero.png", "/images/hero2.png", "/images/hero3.png", "/images/hero2.png"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageUrl.length);
    }, 3000); // 2000ms = 2 ثانية
    return () => clearInterval(interval);
  }, [imageUrl.length]);

  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <div className="flex relative flex-col pb-4 pl-20 w-full  max-md:pl-5 max-md:max-w-full">
        {imageUrl.map((url, index) => (
          <div
            key={url}
            className={`${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }
              }`}
          >
            <Image src={url} alt={`Hero image ${index}`} fill className="object-cover" />
          </div>
        ))}
        <div className="flex gap-2 justify-center absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
          {imageUrl.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${index === currentIndex ? "bg-primary" : "bg-stone-300"
                }`}
            />
          ))}
        </div>

        
        {/* start hero section */}
        <div className="flex relative z-50 flex-col mt-12 max-w-full w-[726px] max-md:mt-10">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div className="flex gap-2 items-center self-start text-lg font-medium text-orange-400">
              <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.2775 11.6117H21.1109C20.7534 11.61 20.4352 11.9128 20.3169 12.3652L18.1294 20.7257L12.8525 0.994653C12.7315 0.547496 12.416 0.25 12.0611 0.25C11.7022 0.255281 11.3841 0.565122 11.271 1.02106L8.50771 11.3866H4.13271C3.66866 11.3866 3.29137 11.8919 3.29137 12.5133C3.29137 13.1347 3.66866 13.64 4.13271 13.64H9.10069C9.45564 13.64 9.77245 13.3407 9.89078 12.8918L12.0651 4.73049L17.3457 24.4827C17.4654 24.9299 17.7822 25.2274 18.1358 25.2274C18.4973 25.2256 18.8168 24.9158 18.9299 24.4563L21.7063 13.8654H26.2772C26.7412 13.8654 27.1185 13.3602 27.1185 12.7387C27.1185 12.1173 26.7415 11.6117 26.2775 11.6117Z" fill="#ED932B" />
                <path d="M8.50771 11.3866L11.271 1.02106C11.3841 0.565122 11.7022 0.255281 12.0611 0.25C12.416 0.25 12.7315 0.547496 12.8525 0.994653L18.1294 20.7257L20.3169 12.3652C20.4352 11.9128 20.7534 11.61 21.1109 11.6117H26.2775C26.7415 11.6117 27.1185 12.1173 27.1185 12.7387C27.1185 13.3602 26.7412 13.8654 26.2772 13.8654H21.7063L18.9299 24.4563C18.8168 24.9158 18.4973 25.2256 18.1358 25.2274C17.7822 25.2274 17.4654 24.9299 17.3457 24.4827L12.0651 4.73049L9.89078 12.8918C9.77245 13.3407 9.45564 13.64 9.10069 13.64M8.50771 11.3866H4.13271M8.50771 11.3866H2.64428M4.13271 11.3866C3.66866 11.3866 3.29137 11.8919 3.29137 12.5133M4.13271 11.3866C3.66866 11.3866 0.25 11.7438 0.25 12.3652M4.13271 11.3866C3.66866 11.3866 1.1219 11.7438 1.1219 12.3652M4.13271 11.3866C3.66866 11.3866 1.62682 11.7438 1.62682 12.3652M4.13271 11.3866C3.66866 11.3866 0.649103 11.7438 0.649103 12.3652M4.13271 11.3866C3.66866 11.3866 2.10392 11.7438 2.10392 12.3652M4.13271 11.3866C3.66866 11.3866 2.56115 11.8532 2.56115 12.4747M4.13271 11.3866C3.66866 11.3866 2.96642 11.8532 2.96642 12.4747M3.29137 12.5133C3.29137 13.1347 3.66866 13.64 4.13271 13.64M3.29137 12.5133C3.29137 13.1347 2.18023 13.64 2.64428 13.64M3.29137 12.5133C3.29137 11.8919 2.18023 11.3866 2.64428 11.3866M4.13271 13.64H9.10069M4.13271 13.64C3.66866 13.64 0.25 12.9867 0.25 12.3652M4.13271 13.64C3.66866 13.64 1.1219 12.9867 1.1219 12.3652M4.13271 13.64C3.66866 13.64 1.62682 12.9867 1.62682 12.3652M4.13271 13.64C3.66866 13.64 0.649103 12.9867 0.649103 12.3652M4.13271 13.64C3.66866 13.64 2.10392 12.9867 2.10392 12.3652M4.13271 13.64C3.66866 13.64 2.56115 13.0961 2.56115 12.4747M4.13271 13.64C3.66866 13.64 2.96642 13.0961 2.96642 12.4747M9.10069 13.64H2.64428M0.25 12.3652C0.25 12.9867 2.18023 13.64 2.64428 13.64M0.25 12.3652C0.25 11.7438 2.18023 11.3866 2.64428 11.3866M1.1219 12.3652C1.1219 12.9867 2.18023 13.64 2.64428 13.64M1.1219 12.3652C1.1219 11.7438 2.18023 11.3866 2.64428 11.3866M1.62682 12.3652C1.62682 12.9867 2.18023 13.64 2.64428 13.64M1.62682 12.3652C1.62682 11.7438 2.18023 11.3866 2.64428 11.3866M0.649103 12.3652C0.649103 12.9867 2.18023 13.64 2.64428 13.64M0.649103 12.3652C0.649103 11.7438 2.18023 11.3866 2.64428 11.3866M2.10392 12.3652C2.10392 12.9867 2.18023 13.64 2.64428 13.64M2.10392 12.3652C2.10392 11.7438 2.18023 11.3866 2.64428 11.3866M2.56115 12.4747C2.56115 13.0961 2.18023 13.64 2.64428 13.64M2.56115 12.4747C2.56115 11.8532 2.18023 11.3866 2.64428 11.3866M2.96642 12.4747C2.96642 13.0961 2.18023 13.64 2.64428 13.64M2.96642 12.4747C2.96642 11.8532 2.18023 11.3866 2.64428 11.3866" stroke="#ED932B" strokeWidth="0.5" />
              </svg>
              <div className="self-stretch my-auto">
                Atlas International Medical Complex
              </div>
            </div>
            <div className="mt-1 text-5xl font-semibold tracking-wide leading-[54px] text-zinc-100 max-md:max-w-full max-md:text-4xl max-md:leading-10">
              Trusted, Professional and High Quality Medical Care for You.
            </div>
          </div>
          <div className="mt-3 text-lg leading-6 text-zinc-300 max-md:max-w-full">
            Experience world-class healthcare with our team of internationally
            trained specialists and state the art facilities
          </div>
        </div>
        <div className="flex relative z-50 gap-4 items-center self-start mt-11 text-base font-semibold text-white leading-[58px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-2.5 justify-center items-center self-stretch px-6 my-auto bg-secondColor rounded-[60px] max-md:px-5">
            <div className="self-stretch my-auto">Book an Appointment</div>
          </div>
          <div className="flex gap-2.5 justify-center items-center self-stretch px-6 my-auto bg-primary rounded-[60px] max-md:px-5">
            <div className="self-stretch my-auto">Request a Home Visit</div>
          </div>
        </div>
        {/* End hero section */}

      </div>
      
    </div>
  );
}

export default NewHome;

