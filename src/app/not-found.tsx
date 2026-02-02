"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useCurrentLang from "@/app/_hooks/useCurrentLang";

const i18n = {
  en: {
    backHome: "Back To Home",
    title: "Page Not Found",
    description: "The page you are looking for doesn’t exist or has been moved.",
  },
  ar: {
    backHome: "العودة إلى الرئيسية",
    title: "الصفحة غير موجودة",
    description: "الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها.",
  },
} as const;

function NotFound() {

  const language = useCurrentLang(); 
  
  const t = i18n[language as "en" | "ar"] ?? i18n.en;

  return (
    <div
      className="flex items-center gap-0 flex-col  "
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Back Nav */}
      <div className="flex gap-2 items-center self-start text-sm tracking-wide text-zinc-900 bg-slate-300 py-4 w-full">
        <Link
          href={`/${language}`}
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-600 bg-opacity-10 ms-5"
          aria-label={t.backHome}
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.38 13.104c.127 0 .254-.047.354-.147.193-.193.193-.513 0-.706L3.04 8.558l3.694-3.693c.193-.193.193-.513 0-.706-.193-.193-.513-.193-.706 0l-4.046 4.046c-.193.193-.193.513 0 .706l4.046 4.046c.1.1.226.147.353.147Z"
              fill="#365D8D"
            />
            <path
              d="M2.447 9.06h11.22c.273 0 .5-.227.5-.5s-.227-.5-.5-.5H2.447c-.274 0-.5.227-.5.5s.226.5.5.5Z"
              fill="#365D8D"
            />
          </svg>
        </Link>
        <div className="self-stretch my-auto">{t.backHome}</div>
      </div>

      {/* Responsive Image */}
      <div className="relative w-full max-w-5xl h-72  md:h-90 lg:h-[450px]">
        <Image
          src="/images/not-found404.png"
          alt={t.title}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Text under Image */}
      <div className="flex flex-col items-center text-center gap-2 sm:gap-3 md:gap-4">
        <h1 className="font-bold text-zinc-900
                 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
                 leading-tight tracking-tight">
          {t.title}
        </h1>

        <p className="text-zinc-600
                text-sm sm:text-base md:text-lg lg:text-xl
                leading-relaxed
                max-w-[42rem] px-4 sm:px-6">
          {t.description}
        </p>
      </div>

    </div>
  );
}

export default NotFound;
