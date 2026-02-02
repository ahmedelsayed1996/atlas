"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//import modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useTranslations } from 'next-intl';

import { partnersLogos } from "@/app/_data/partnersLogos";
const SwiperSliderLogo = function () {
    const n = useTranslations("newHome");
    return (
        <div className=" py-10 -mt-44 md:-mt-14 bg-white">
            <div className="flex flex-col items-center px-0 pb-0.5 mx-auto my-0 w-full  ">
                <div className="relative mb-5 h-[23px] w-[624px] max-md:mx-auto max-md:mt-0 max-md:mb-5 max-md:w-[90%] max-sm:w-[95%]">
                    <div className="absolute top-3.5 h-px bg-zinc-300 w-[624px] max-md:w-full" />
                    <div className="absolute top-0 px-2.5 py-0 text-lg tracking-wide text-center bg-white h-[23px] left-[100px] text-primary w-[424px] max-md:w-4/5 max-md:left-[10%] max-sm:text-base max-sm:left-[5%] max-sm:w-[90%]">
                        {n("CenterLine")}
                    </div>
                </div>
            </div>

            <Swiper
                // slidesPerView={6}
                spaceBetween={5}

                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                    waitForTransition: false,
                }}
                grabCursor={true}
                loop={true}
                modules={[EffectFade, Autoplay, Pagination, Navigation]}
                className="mySwiper custom-swiper"
                breakpoints={{
                    320: { slidesPerView: 3 }, // الهواتف الصغيرة
                    480: { slidesPerView: 3 }, // الهواتف المتوسطة
                    768: { slidesPerView: 5 }, // التابلت
                    1024: { slidesPerView: 6 }, // اللابتوب والشاشات الكبيرة
                }}
            >
                {partnersLogos.map((logo, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex items-center justify-center">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={160}
                                height={70}
                                className="object-contain"
                                priority={index < 3}
                            />
                        </div>
                    </SwiperSlide>
                ))}
               
            </Swiper>
        </div>
    )
}
export default SwiperSliderLogo;