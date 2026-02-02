// import React, { useRef, useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// import { Navigation, Pagination } from 'swiper/modules';
// import Link from 'next/link';
// import useCurrentLang from '../_hooks/useCurrentLang';
// import { useDispatch, useSelector } from 'react-redux';
// import Spinner from './Spinner';
// import Loader from './Loader';
// import Image from 'next/image';
// import useCleanPath from '../_hooks/useCleanPath';
// import { parseCookies } from 'nookies';
// import { toast } from "react-toastify";
// import { getAllUniversities } from '../reduxTool-kit/slices/universitiesSlice';
// import { useTranslations } from 'next-intl';
// import { LeftArrow, RightArrow } from './icons/Arrow';
// import { FillAlarm, SolidAlarm } from './icons/Alarm';


// export default function SwiperSliderUNI({ data }) {

//     const { cleanPath } = useCleanPath();
//     const { tokenMainSite } = parseCookies();
//     const { user } = useSelector((state) => state.displayUser);
//     const language = useCurrentLang();
//     const [loadingStates, setLoadingStates] = useState(new Map());
//     const [error, setError] = useState("");
//     const [universities, setUniversities] = useState([]);
//     const prevRef = useRef(null);
//     const nextRef = useRef(null);
//     const swiperRef = useRef(null);
//     const [isMounted, setIsMounted] = useState(false);
//     const Arrow = language === "en" ? RightArrow : LeftArrow;


//     const dispatch = useDispatch();
//     const t = useTranslations("UniversitiesCard");
//     const e = useTranslations("institutesCard");
//     const UN = useTranslations("Universities");
//     const n = useTranslations("newHome");

//     const subscribe = async (universityId) => {
//         setLoadingStates((prev) => new Map(prev).set(universityId, true));
//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/subscribe`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${tokenMainSite}`,
//                     "Accept-Language": language,
//                 },
//                 body: JSON.stringify({
//                     "userId": user.id,
//                     "targetId": universityId,
//                     "targetType": "UNIVERSITY"
//                 }),
//             });

//             if (!response.ok) {
//                 const result = await response.json();
//                 throw new Error(result.message);
//             }

//             const result = await response.json();
//             setUniversities(prev =>
//                 prev.map(u => u.id === universityId ? { ...u, is_notified: true } : u)
//             );
//             toast.success(t("addSubscribe"));
//         } catch (error) {
//             toast.error(error.message);
//             setError(error.message);
//         } finally {
//             setLoadingStates((prev) => new Map(prev).set(universityId, false));
//         }
//     }

//     const unSubscribe = async (universityId) => {
//         setLoadingStates((prev) => new Map(prev).set(universityId, true));
//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/unsubscribe`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${tokenMainSite}`,
//                     "Accept-Language": language,
//                 },
//                 body: JSON.stringify({
//                     "userId": user.id,
//                     "targetId": universityId,
//                     "targetType": "UNIVERSITY"
//                 }),
//             });

//             if (!response.ok) {
//                 const result = await response.json();
//                 throw new Error(result.message);
//             }

//             const result = await response.json();
//             setUniversities(prev =>
//                 prev.map(u => u.id === universityId ? { ...u, is_notified: false } : u)
//             );
//             toast.success(t("removeSubscribe"));
//         } catch (error) {
//             toast.error(error.message);
//             setError(error.message);
//         } finally {
//             setLoadingStates((prev) => new Map(prev).set(universityId, false));
//         }
//     }


//     const onSwiper = (swiper) => {
//         swiperRef.current = swiper;

//         setTimeout(() => {
//             if (prevRef.current && nextRef.current) {
//                 swiper.params.navigation.prevEl = prevRef.current;
//                 swiper.params.navigation.nextEl = nextRef.current;
//                 swiper.navigation.init();
//                 swiper.update();
//             }
//         }, 100);
//     };

//     useEffect(() => {
//         if (data?.universities?.data) {
//             setUniversities(data.universities.data);
//         }
//     }, [data]);



//     useEffect(() => {
//         setIsMounted(true);

//         return () => setIsMounted(false);
//     }, []);

//     useEffect(() => {
//         if (!isMounted || !prevRef.current || !nextRef.current) return;

//         const initSwiper = () => {
//             if (swiperRef.current) {
//                 swiperRef.current.params.navigation.prevEl = prevRef.current;
//                 swiperRef.current.params.navigation.nextEl = nextRef.current;

//                 swiperRef.current.navigation.destroy();
//                 swiperRef.current.navigation.init();
//                 swiperRef.current.navigation.update();

//                 swiperRef.current.update();
//             }
//         };

//         initSwiper();

//         // إعادة التهيئة عند تغير حجم النافذة (للتأكد من أن كل شيء يعمل بعد التغييرات)
//         const handleResize = () => {
//             initSwiper();
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, [isMounted, data.loading]);



//     return (
//         <div className="w-full py-10">
//             <div className="flex flex-col md:flex-row justify-between items-center max-sm:gap-5 px-5 md:px-12 lg:px-20 xl:py-10 xl:px-28">
//                 <div className="flex flex-col gap-2">
//                     <div className="ps-3.5 text-xl border-solid border-s-[5px] border-s-amber-500 text-zinc-900">
//                         {n("uniButton")}
//                     </div>
//                     <div className="flex flex-col gap-4">
//                         <div className="text-3xl font-bold text-zinc-900">
//                             {n("RecommendUNI")}
//                         </div>
//                         <div className="text-base tracking-normal leading-7 max-w-[388px] text-zinc-500">
//                             {n("uniRecomm")}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Desktop button (hidden on mobile) */}
//                 <Link
//                     href={`/${language}/university`}
//                     className="hidden md:flex gap-1 items-center px-4 py-0 h-12 text-base text-white cursor-pointer bg-primary rounded-[64px] mb-3"
//                 >
//                     <span>{n("viewallButton")}</span>
//                     <Arrow />
//                 </Link>
//             </div>
//             <div className="px-5 md:px-20 xl:px-28">
//                 <div className='relative'>
//                     <Swiper
//                         onSwiper={onSwiper}
//                         modules={[Navigation, Pagination]}
//                         slidesPerView={1}
//                         loop={true}
//                         pagination={{ clickable: true }}
//                         navigation={{
//                             prevEl: isMounted ? prevRef.current : undefined,
//                             nextEl: isMounted ? nextRef.current : undefined,
//                             disabledClass: 'swiper-button-disabled'
//                         }}
//                         grabCursor={true}
//                         breakpoints={{
//                             640: {
//                                 slidesPerView: 2,
//                                 spaceBetween: 20,
//                             },
//                             768: {
//                                 slidesPerView: 2,
//                                 spaceBetween: 20,
//                             },
//                             1024: {
//                                 slidesPerView: 3,
//                                 spaceBetween: 20,
//                             },
//                         }}
//                         className="mySwiper"
//                     >
//                         {data.loading ? (<Loader />) :
//                             (
//                                 universities?.map((uni) => {
//                                     return (
//                                         <SwiperSlide key={uni.id}>
//                                             <div className="p-4 lg:p-6 bg-white rounded-3xl border border-solid border-zinc-100">
//                                                 <div className='flex justify-start items-center gap-5'>
//                                                     <div className="flex justify-center items-center mb-4 rounded-lg border border-solid border-zinc-100 h-[130px] w-[145px] relative">
//                                                         <Image
//                                                             src={!uni.logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(uni.logo)}`}
//                                                             fill={true}
//                                                             alt={uni.name}
//                                                             sizes='33vw'
//                                                             className="object-contain rounded-lg size-full"
//                                                         />
//                                                     </div>
//                                                     <div className="flex flex-col gap-2 mb-4">
//                                                         <div className="flex gap-0.5 items-center relative">
//                                                             <Image
//                                                                 src={!uni.country_logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(uni.country_logo)}`}
//                                                                 width={20}
//                                                                 height={20}
//                                                                 // fill={true}
//                                                                 alt={uni.name}
//                                                                 className="rounded-xl h-[22px] w-[22px]"
//                                                             />
//                                                             <div className="text-sm text-zinc-900">{uni.country_name}</div>
//                                                         </div>
//                                                         <div className='flex gap-1'>
//                                                             <div>
//                                                                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                                     <path d="M12 3.93018C15.2468 3.93018 18.3854 5.77707 20.6152 9.09326L20.8281 9.41846C21.2659 10.1057 21.4999 11.0396 21.5 11.9985C21.5 12.8377 21.3208 13.6554 20.9834 14.3032L20.8291 14.5708L20.8281 14.5718C19.7039 16.3355 18.3361 17.7083 16.8281 18.644C15.3201 19.5698 13.6799 20.0601 12 20.0601C8.75267 20.0601 5.61408 18.2225 3.38477 14.8989L3.17188 14.5718L3.01758 14.3022C2.67958 13.6504 2.50006 12.8332 2.5 11.9956C2.5 11.1578 2.67949 10.3399 3.01758 9.68799L3.17188 9.41846C4.29652 7.65406 5.66517 6.28097 7.17383 5.34521L7.17285 5.34424C8.68046 4.4191 10.3207 3.93018 12 3.93018ZM12 7.46045C9.48305 7.46045 7.45996 9.49515 7.45996 12.0005C7.46013 14.5057 9.48316 16.5405 12 16.5405C14.5168 16.5405 16.5399 14.5057 16.54 12.0005C16.54 9.49515 14.5169 7.46045 12 7.46045Z" stroke="#F89A21" />
//                                                                     <path d="M11.9996 9.64014C13.2935 9.64014 14.36 10.7066 14.36 12.0005C14.3598 13.2919 13.2957 14.3501 11.9996 14.3501C10.7061 14.3499 9.65022 13.2941 9.65002 12.0005C9.65002 10.6956 10.7071 9.64035 11.9996 9.64014Z" stroke="#F89A21" />
//                                                                 </svg>
//                                                             </div>
//                                                             <span className='text-nowrap text-sm'> {uni.visites} {t("viewsLable1")}</span>
//                                                         </div>
//                                                         {uni.recommend && (
//                                                             <div
//                                                                 className={`flex items-center gap-2 rounded-lg text-sm ${language === "ar" ? "right-0" : "left-0"
//                                                                     } top-0`}
//                                                             >
//                                                                 <svg
//                                                                     width="18"
//                                                                     height="18"
//                                                                     viewBox="0 0 24 24"
//                                                                     fill="#FBCC90"
//                                                                     xmlns="http://www.w3.org/2000/svg"
//                                                                 >
//                                                                     <path d="M12 2L14.9 8.26L22 9.27L17 14.14L18.2 21.02L12 17.77L5.8 21.02L7 
//   14.14L2 9.27L9.1 8.26L12 2Z" />
//                                                                 </svg>

//                                                                 {UN("recommendFilter") || "Recommended"}
//                                                             </div>
//                                                         )}
//                                                         {/* rating */}
//                                                         {/* <div className="flex gap-2 items-center">
//                                                     <div className="text-sm text-zinc-900">{uni.rating}</div>
//                                                     <div className="flex gap-0.5">
//                                                         <div className="flex gap-[2px]">
//                                                             {Array.from({ length: 5 }, (_, index) =>
//                                                                 index < uni.rating ? <FillStar key={index} /> : <SolidStar key={index} />
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </div> */}

//                                                     </div>
//                                                 </div>
//                                                 <div className="mb-4">
//                                                     <div className="mb-1 line-clamp-1 text-2xl font-bold text-zinc-900">
//                                                         {uni.name}
//                                                     </div>
//                                                     <div className="text-base tracking-wide leading-6 text-zinc-900 line-clamp-2">
//                                                         {uni.description}
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex justify-between px-0 py-4 border-t border-solid border-t-zinc-100">
//                                                     <div className="flex gap-1.5 items-center">
//                                                         <div>
//                                                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                                 <path d="M4.25999 11.0199V15.9899C4.25999 17.8099 4.25999 17.8099 5.97999 18.9699L10.71 21.6999C11.42 22.1099 12.58 22.1099 13.29 21.6999L18.02 18.9699C19.74 17.8099 19.74 17.8099 19.74 15.9899V11.0199C19.74 9.19994 19.74 9.19994 18.02 8.03994L13.29 5.30994C12.58 4.89994 11.42 4.89994 10.71 5.30994L5.97999 8.03994C4.25999 9.19994 4.25999 9.19994 4.25999 11.0199Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                                                 <path d="M17.5 7.63V5C17.5 3 16.5 2 14.5 2H9.5C7.5 2 6.5 3 6.5 5V7.56" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                                                 <path d="M12.63 10.99L13.2 11.88C13.29 12.02 13.49 12.16 13.64 12.2L14.66 12.46C15.29 12.62 15.46 13.16 15.05 13.66L14.38 14.47C14.28 14.6 14.2 14.83 14.21 14.99L14.27 16.04C14.31 16.69 13.85 17.02 13.25 16.78L12.27 16.39C12.12 16.33 11.87 16.33 11.72 16.39L10.74 16.78C10.14 17.02 9.67999 16.68 9.71999 16.04L9.77999 14.99C9.78999 14.83 9.70999 14.59 9.60999 14.47L8.93999 13.66C8.52999 13.16 8.69999 12.62 9.32999 12.46L10.35 12.2C10.51 12.16 10.71 12.01 10.79 11.88L11.36 10.99C11.72 10.45 12.28 10.45 12.63 10.99Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                                             </svg>
//                                                         </div>
//                                                         <div className="text-sm text-slate-900">{uni.major_count} {t("cardFoterUni3")}</div>
//                                                     </div>
//                                                     <div className="flex gap-1.5 items-center">
//                                                         <div>
//                                                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                                 <path d="M21.66 10.44L20.68 14.62C19.84 18.23 18.18 19.69 15.06 19.39C14.56 19.35 14.02 19.26 13.44 19.12L11.76 18.72C7.59 17.73 6.3 15.67 7.28 11.49L8.26 7.30001C8.46 6.45001 8.7 5.71001 9 5.10001C10.17 2.68001 12.16 2.03001 15.5 2.82001L17.17 3.21001C21.36 4.19001 22.64 6.26001 21.66 10.44Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                                                 <path d="M15.06 19.3901C14.44 19.8101 13.66 20.1601 12.71 20.4701L11.13 20.9901C7.16001 22.2701 5.07001 21.2001 3.78001 17.2301L2.50001 13.2801C1.22001 9.3101 2.28001 7.2101 6.25001 5.9301L7.83001 5.4101C8.24001 5.2801 8.63001 5.1701 9.00001 5.1001C8.70001 5.7101 8.46001 6.4501 8.26001 7.3001L7.28001 11.4901C6.30001 15.6701 7.59001 17.7301 11.76 18.7201L13.44 19.1201C14.02 19.2601 14.56 19.3501 15.06 19.3901Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                                                 <path d="M12.64 8.53003L17.49 9.76003" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                                                 <path d="M11.66 12.3999L14.56 13.1399" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                                             </svg>

//                                                         </div>
//                                                         <div className="text-sm text-slate-900">{uni.program_count} {t("cardFoterUni4")}</div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex gap-2 items-center mt-4">
//                                                     {loadingStates.get(uni.id) ? <Spinner /> : <>
//                                                         <Link href={`/${language}/university/${uni.id}`} className="flex gap-1 items-center px-4  py-0 h-10 text-nowrap text-base text-white cursor-pointer
//                                                  bg-primary rounded-[64px] justify-center grow">
//                                                             <span>{t("cardButtonUni")}</span>
//                                                             <div>
//                                                                 {language === "en" ?
//                                                                     <RightArrow />
//                                                                     :
//                                                                     <LeftArrow />}
//                                                             </div>
//                                                         </Link>
//                                                         <div onClick={() => {
//                                                             if (tokenMainSite && user.id) {
//                                                                 // console.log("login");
//                                                                 if (uni.is_notified) {
//                                                                     unSubscribe(uni.id);
//                                                                 } else if (!uni.is_notified) {
//                                                                     subscribe(uni.id);[]
//                                                                 }
//                                                             } else {
//                                                                 toast.error(e("messageError"));
//                                                             }
//                                                         }}
//                                                             className="flex justify-center items-center cursor-pointer rounded-[64px]">
//                                                             <div>
//                                                                 {uni.is_notified ?
//                                                                     <FillAlarm />
//                                                                     : <SolidAlarm />
//                                                                 }
//                                                             </div>
//                                                         </div>
//                                                     </>
//                                                     }
//                                                 </div>

//                                             </div>
//                                         </SwiperSlide>
//                                     )
//                                 })
//                             )
//                         }

//                     </Swiper>
//                     <button ref={nextRef} className="custom-next absolute top-1/2 -left-20 -translate-y-1/2 p-2 rounded-full  transition hidden md:block">
//                         <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44Z" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M31 24H19" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M23 30L17 24L23 18" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     </button>
//                     <button ref={prevRef} className=" custom-prev absolute top-1/2 -right-20 -translate-y-1/2 p-2 rounded-full  transition hidden md:block">
//                         <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M17 24H29" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M25 30L31 24L25 18" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>

//                     </button>
//                 </div>
//                 <Link
//                     href={`/${language}/university`}
//                     className="flex md:hidden gap-1 items-center   py-0 h-12 text-base text-white cursor-pointer
//      bg-primary rounded-[64px] justify-center w-full mt-5"
//                 >
//                     <span>{n("viewallButton")}</span>
//                     <Arrow />
//                 </Link>
//             </div>
//         </div>
//     );
// }


import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import useCurrentLang from '../_hooks/useCurrentLang';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import Loader from './Loader';
import Image from 'next/image';
import useCleanPath from '../_hooks/useCleanPath';
import { parseCookies } from 'nookies';
import { toast } from "react-toastify";
import { getAllUniversities } from '../reduxTool-kit/slices/universitiesSlice';
import { useTranslations } from 'next-intl';
import { LeftArrow, RightArrow } from './icons/Arrow';
import { FillAlarm, SolidAlarm } from './icons/Alarm';
import { University } from '../types/university';
import { RootState } from '../store';
import type { Swiper as SwiperType } from "swiper";
import type { NavigationOptions } from "swiper/types";
import { FillStar } from './icons/Star';

interface SwiperSliderUNIProps {
    data: {
        universities?: {
            data: University[];
        };
        loading?: boolean;
    };
}

export default function SwiperSliderUNI({ data }: SwiperSliderUNIProps) {

    const { cleanPath } = useCleanPath();
    const { tokenMainSite } = parseCookies();
    const user = useSelector((state: RootState) => state.displayUser);
    const userId = user?.user?.id;
    const language = useCurrentLang();
    const [loadingStates, setLoadingStates] = useState(new Map());
    const [universities, setUniversities] = useState<University[]>([]);

    const swiperRef = useRef<SwiperType | null>(null);
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    const Arrow = language === "en" ? RightArrow : LeftArrow;


    const t = useTranslations("UniversitiesCard");
    const e = useTranslations("institutesCard");
    const UN = useTranslations("Universities");
    const n = useTranslations("newHome");
 

    const toggleSubscribe = async (
        universityId: number,
        isSubscribed: boolean
    ) => {
        setLoadingStates(prev => new Map(prev).set(universityId, true));

        try {
            const url = isSubscribed
                ? "/notifications/unsubscribe"
                : "/notifications/subscribe";

            const method = isSubscribed ? "DELETE" : "POST";

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenMainSite}`,
                    "Accept-Language": language,
                },
                body: JSON.stringify({
                    userId,
                    targetId: universityId,
                    targetType: "UNIVERSITY",
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            setUniversities(prev =>
                prev.map(u =>
                    u.id === universityId
                        ? { ...u, is_notified: !isSubscribed }
                        : u
                )
            );

            toast.success(
                isSubscribed ? t("removeSubscribe") : t("addSubscribe")
            );
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoadingStates(prev => new Map(prev).set(universityId, false));
        }
    };


    const onSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper;

        setTimeout(() => {
            if (prevRef.current && nextRef.current) {
                swiper.navigation.init();
                swiper.update();
            }
        }, 100);
    };

    useEffect(() => {
        if (data?.universities?.data) {
            setUniversities(data.universities.data);
        }
    }, [data]);


    return (
        <div className="w-full py-10">
            <div className="flex flex-col md:flex-row justify-between items-center max-sm:gap-5 px-5 md:px-12 lg:px-20 xl:py-10 xl:px-28">
                <div className="flex flex-col gap-2">
                    <div className="ps-3.5 text-xl border-solid border-s-[5px] border-s-amber-500 text-zinc-900">
                        {n("uniButton")}
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-3xl font-bold text-zinc-900">
                            {n("RecommendUNI")}
                        </div>
                        <div className="text-base tracking-normal leading-7 max-w-[388px] text-zinc-500">
                            {n("uniRecomm")}
                        </div>
                    </div>
                </div>

                {/* Desktop button (hidden on mobile) */}
                <Link
                    href={`/${language}/university`}
                    className="hidden md:flex gap-1 items-center px-4 py-0 h-12 text-base text-white cursor-pointer bg-primary rounded-[64px] mb-3"
                >
                    <span>{n("viewallButton")}</span>
                    <Arrow />
                </Link>
            </div>
            <div className="px-5 md:px-20 xl:px-28">
                <div className='relative'>
                    <Swiper
                        onSwiper={onSwiper}
                        modules={[Navigation, Pagination]}
                        slidesPerView={1}
                        loop={true}
                        pagination={{ clickable: true }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        grabCursor={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                        }}
                        className="mySwiper"
                    >
                        {data.loading ? (<Loader />) :
                            (
                                universities?.map((uni) => {
                                    return (
                                        <SwiperSlide key={uni.id}>
                                            <div className="p-4 lg:p-6 bg-white rounded-3xl border border-solid border-zinc-100">
                                                <div className='flex justify-start items-center gap-5'>
                                                    <div className="flex justify-center items-center mb-4 rounded-lg border border-solid border-zinc-100 h-[130px] w-[145px] relative">
                                                        <Image
                                                            src={!uni.logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(uni.logo)}`}
                                                            fill={true}
                                                            alt={uni.name}
                                                            sizes='33vw'
                                                            className="object-contain rounded-lg size-full"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2 mb-4">
                                                        <div className="flex gap-0.5 items-center relative">
                                                            <Image
                                                                src={!uni.country_logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(uni.country_logo)}`}
                                                                width={20}
                                                                height={20}
                                                                // fill={true}
                                                                alt={uni.name}
                                                                className="rounded-xl h-[22px] w-[22px]"
                                                            />
                                                            <div className="text-sm text-zinc-900">{uni.country_name}</div>
                                                        </div>
                                                        <div className='flex gap-1'>
                                                            <div>
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12 3.93018C15.2468 3.93018 18.3854 5.77707 20.6152 9.09326L20.8281 9.41846C21.2659 10.1057 21.4999 11.0396 21.5 11.9985C21.5 12.8377 21.3208 13.6554 20.9834 14.3032L20.8291 14.5708L20.8281 14.5718C19.7039 16.3355 18.3361 17.7083 16.8281 18.644C15.3201 19.5698 13.6799 20.0601 12 20.0601C8.75267 20.0601 5.61408 18.2225 3.38477 14.8989L3.17188 14.5718L3.01758 14.3022C2.67958 13.6504 2.50006 12.8332 2.5 11.9956C2.5 11.1578 2.67949 10.3399 3.01758 9.68799L3.17188 9.41846C4.29652 7.65406 5.66517 6.28097 7.17383 5.34521L7.17285 5.34424C8.68046 4.4191 10.3207 3.93018 12 3.93018ZM12 7.46045C9.48305 7.46045 7.45996 9.49515 7.45996 12.0005C7.46013 14.5057 9.48316 16.5405 12 16.5405C14.5168 16.5405 16.5399 14.5057 16.54 12.0005C16.54 9.49515 14.5169 7.46045 12 7.46045Z" stroke="#F89A21" />
                                                                    <path d="M11.9996 9.64014C13.2935 9.64014 14.36 10.7066 14.36 12.0005C14.3598 13.2919 13.2957 14.3501 11.9996 14.3501C10.7061 14.3499 9.65022 13.2941 9.65002 12.0005C9.65002 10.6956 10.7071 9.64035 11.9996 9.64014Z" stroke="#F89A21" />
                                                                </svg>
                                                            </div>
                                                            <span className='text-nowrap text-sm'> {uni.visites} {t("viewsLable1")}</span>
                                                        </div>
                                                        {uni.recommend && (
                                                            <div
                                                                className={`flex items-center gap-2 rounded-lg text-sm ${language === "ar" ? "right-0" : "left-0"
                                                                    } top-0`}
                                                            >
                                                                {/* <svg
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="#FBCC90"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path d="M12 2L14.9 8.26L22 9.27L17 14.14L18.2 21.02L12 17.77L5.8 21.02L7 
  14.14L2 9.27L9.1 8.26L12 2Z" />
                                                                </svg> */}
                                                                <FillStar />

                                                                {UN("recommendFilter") || "Recommended"}
                                                            </div>
                                                        )}
                                                        {/* rating */}
                                                        {/* <div className="flex gap-2 items-center">
                                                    <div className="text-sm text-zinc-900">{uni.rating}</div>
                                                    <div className="flex gap-0.5">
                                                        <div className="flex gap-[2px]">
                                                            {Array.from({ length: 5 }, (_, index) =>
                                                                index < uni.rating ? <FillStar key={index} /> : <SolidStar key={index} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div> */}

                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="mb-1 line-clamp-1 text-2xl font-bold text-zinc-900">
                                                        {uni.name}
                                                    </div>
                                                    <div className="text-base tracking-wide leading-6 text-zinc-900 line-clamp-2">
                                                        {uni.description}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between px-0 py-4 border-t border-solid border-t-zinc-100">
                                                    <div className="flex gap-1.5 items-center">
                                                        <div>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4.25999 11.0199V15.9899C4.25999 17.8099 4.25999 17.8099 5.97999 18.9699L10.71 21.6999C11.42 22.1099 12.58 22.1099 13.29 21.6999L18.02 18.9699C19.74 17.8099 19.74 17.8099 19.74 15.9899V11.0199C19.74 9.19994 19.74 9.19994 18.02 8.03994L13.29 5.30994C12.58 4.89994 11.42 4.89994 10.71 5.30994L5.97999 8.03994C4.25999 9.19994 4.25999 9.19994 4.25999 11.0199Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M17.5 7.63V5C17.5 3 16.5 2 14.5 2H9.5C7.5 2 6.5 3 6.5 5V7.56" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M12.63 10.99L13.2 11.88C13.29 12.02 13.49 12.16 13.64 12.2L14.66 12.46C15.29 12.62 15.46 13.16 15.05 13.66L14.38 14.47C14.28 14.6 14.2 14.83 14.21 14.99L14.27 16.04C14.31 16.69 13.85 17.02 13.25 16.78L12.27 16.39C12.12 16.33 11.87 16.33 11.72 16.39L10.74 16.78C10.14 17.02 9.67999 16.68 9.71999 16.04L9.77999 14.99C9.78999 14.83 9.70999 14.59 9.60999 14.47L8.93999 13.66C8.52999 13.16 8.69999 12.62 9.32999 12.46L10.35 12.2C10.51 12.16 10.71 12.01 10.79 11.88L11.36 10.99C11.72 10.45 12.28 10.45 12.63 10.99Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <div className="text-sm text-slate-900">{uni.major_count} {t("cardFoterUni3")}</div>
                                                    </div>
                                                    <div className="flex gap-1.5 items-center">
                                                        <div>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M21.66 10.44L20.68 14.62C19.84 18.23 18.18 19.69 15.06 19.39C14.56 19.35 14.02 19.26 13.44 19.12L11.76 18.72C7.59 17.73 6.3 15.67 7.28 11.49L8.26 7.30001C8.46 6.45001 8.7 5.71001 9 5.10001C10.17 2.68001 12.16 2.03001 15.5 2.82001L17.17 3.21001C21.36 4.19001 22.64 6.26001 21.66 10.44Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M15.06 19.3901C14.44 19.8101 13.66 20.1601 12.71 20.4701L11.13 20.9901C7.16001 22.2701 5.07001 21.2001 3.78001 17.2301L2.50001 13.2801C1.22001 9.3101 2.28001 7.2101 6.25001 5.9301L7.83001 5.4101C8.24001 5.2801 8.63001 5.1701 9.00001 5.1001C8.70001 5.7101 8.46001 6.4501 8.26001 7.3001L7.28001 11.4901C6.30001 15.6701 7.59001 17.7301 11.76 18.7201L13.44 19.1201C14.02 19.2601 14.56 19.3501 15.06 19.3901Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M12.64 8.53003L17.49 9.76003" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M11.66 12.3999L14.56 13.1399" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>

                                                        </div>
                                                        <div className="text-sm text-slate-900">{uni.program_count} {t("cardFoterUni4")}</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 items-center mt-4">
                                                    {loadingStates.get(uni.id) ? <Spinner /> : <>
                                                        <Link href={`/${language}/university/${uni.id}`} className="flex gap-1 items-center px-4  py-0 h-10 text-nowrap text-base text-white cursor-pointer
                                                 bg-primary rounded-[64px] justify-center grow">
                                                            <span>{t("cardButtonUni")}</span>
                                                            <div>
                                                                {language === "en" ?
                                                                    <RightArrow />
                                                                    :
                                                                    <LeftArrow />}
                                                            </div>
                                                        </Link>
                                                        <div
                                                            //</>onClick={() => {
                                                            // if (tokenMainSite && userId) {
                                                            //     // console.log("login");
                                                            //     if (uni.is_notified) {
                                                            //         unSubscribe(uni.id);
                                                            //     } else if (!uni.is_notified) {
                                                            //         subscribe(uni.id);[]
                                                            //     }
                                                            // } else {
                                                            //     toast.error(e("messageError"));
                                                            // }
                                                            // }}
                                                            onClick={() => {
                                                                if (!tokenMainSite || !userId) {
                                                                    toast.error(e("messageError"));
                                                                    return;
                                                                }

                                                                toggleSubscribe(uni.id, uni.is_notified);
                                                            }}

                                                            className="flex justify-center items-center cursor-pointer rounded-[64px]">
                                                            <div>
                                                                {uni.is_notified ?
                                                                    <FillAlarm />
                                                                    : <SolidAlarm />
                                                                }
                                                            </div>
                                                        </div>
                                                    </>
                                                    }
                                                </div>

                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            )
                        }

                    </Swiper>
                    <button ref={nextRef} className="custom-next absolute top-1/2 -left-20 -translate-y-1/2 p-2 rounded-full  transition hidden md:block">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44Z" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M31 24H19" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M23 30L17 24L23 18" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button ref={prevRef} className=" custom-prev absolute top-1/2 -right-20 -translate-y-1/2 p-2 rounded-full  transition hidden md:block">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 24H29" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M25 30L31 24L25 18" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </button>
                </div>
                <Link
                    href={`/${language}/university`}
                    className="flex md:hidden gap-1 items-center   py-0 h-12 text-base text-white cursor-pointer
     bg-primary rounded-[64px] justify-center w-full mt-5"
                >
                    <span>{n("viewallButton")}</span>
                    <Arrow />
                </Link>
            </div>
        </div>
    );
}


