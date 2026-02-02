// "use client"
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Spinner from "../../../_components/Spinner";
// import { toast  } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import { useTranslations } from "next-intl";
// import useCurrentLang from "@/app/_hooks/useCurrentLang";

// function ForgetPassword() {

// const t = useTranslations("changePassword");
// const f = useTranslations("footer");
// const i = useTranslations("imageWords");
// const s = useTranslations("signIn");
// const language = useCurrentLang();

//     const [email, setEmail] = useState("");
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const router = useRouter();


//     const verifyMail = async (eve: React.FormEvent) => {
//         eve.preventDefault();
//         setIsLoading(true);
//         setError("");

//         if (!email) {
//             setError(s("error"));
//             setIsLoading(false);
//             return;
//         }
//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/forget-password`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ "email" : email }),
//             });

//             if (!response.ok) {
//                 const result = await response.json();
//                 setIsLoading(false);
//                 throw new Error(result.message);
//             }

//             const result = await response.json();
//             setIsLoading(false);
//             console.log(result);

//             toast.success(result.message);
//             router.push(`/${language}/verify-password`);
//         } catch (error : any) {
//             setIsLoading(false);
//             setError(error.message);
//         }
//     }
//     return (
//       <section className="md:bg-secondColor md:p-7 sm:bg-white">
//         <div className="lg:grid  lg:grid-cols-12 bg-white">
//           <main className="flex items-center justify-center md:px-8 md:py-3 sm:px-12 lg:col-span-7 lg:px-6 lg:pt-12 xl:col-span-6 bg-secondColor ">
//             <div className="max-w-xl lg:max-w-3xl bg-white p-4 rounded-2xl">
//               <div className="flex justify-center items-center">
//                 <Image src="/logo.svg" width={80} height={80} alt="Logo" />
//               </div>

//               <p className="text-[#141522] text-xl mt-3"> {t("massage")} </p>
//               <p className="text-[#6C7278] text-sm mt-1">{t("label")}</p>

//               <form
//                 onSubmit={verifyMail}
//                 className="mt-8 grid grid-cols-6 gap-6"
//               >
//                 {error && (
//                   <p className="col-span-6 text-red-500 text-start">{error}</p>
//                 )}
//                 <div className="col-span-6 sm:col-span-6">
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-semibold text-black"
//                   >
//                     {t("email")}
//                   </label>
//                   <div className="relative mt-2">
//                     <input
//                       id="email"
//                       name="email"

//                       type="email"
//                       className="w-full rounded-lg  p-2 pe-12 text-md px-10 border border-gray focus:outline-none"
//                       placeholder="example@ex.com"
//                       onChange={(e) => setEmail(e.target.value)}
//                     />

//                     <span className="absolute inset-y-4 start-0 grid place-content-center px-4">
//                       <Image
//                         src="/icons/message.svg"
//                         width={20}
//                         height={20}
//                         alt="user"
//                       />
//                     </span>
//                   </div>
//                 </div>

//                 <div className="col-span-6 sm:flex sm:items-center sm:gap-4  sm:col-span-6 text-center">
//                   {/* <button
//                                     type="submit"
//                                     className=" items-center gap-2 rounded-md bg-primary hover:bg-sky-700  px-5 py-2.5 text-sm font-medium text-white shadow focus:relative transition ease-in-out delay-150 w-full "
//                                 >
//                                     ارسل الكود
//                                 </button> */}
//                   {isLoading ? (
//                     <Spinner />
//                   ) : (
//                     <button
//                       type="submit"
//                       className=" items-center gap-2 rounded-md bg-primary hover:bg-sky-700  px-5 py-2.5 text-sm font-medium text-white shadow focus:relative transition ease-in-out delay-150 w-full "
//                     >
//                       {t("button")}
//                     </button>
//                   )}
//                 </div>
//               </form>

//               <div className="col-span-6 sm:col-span-6 mt-9 mb-2 text-center">
//                 <span className="shrink-0 px-6 text-[#6C7278]">
//                   {f("rightsSave")}
//                   <a href="#" className="text-primary ">
//                     {" "}
//                     {f("privacyPolicy")}{" "}
//                   </a>{" "}
//                   |{" "}
//                   <a href="#" className="text-primary ">
//                     {" "}
//                     {f("termsConditions")}{" "}
//                   </a>
//                 </span>
//               </div>
//             </div>
//           </main>

//           <section className="hidden md:block relative items-end  lg:col-span-5  xl:col-span-6">
//             <Image
//               width={800}
//               height={300}
//               alt="Login Banner"
//               src="/images/login-banner.png"
//               className="md:rounded-lg object-cover"
//             />
//             <div className="bg-primary md:rounded-lg  pb-16">
//               <div className="lg:p-16 md:p-8">
//                 <p className="lg:text-2xl pt-4 md:text-lg font-semibold text-white lg:px-16 md:px-5 md:leading-10 text-center">
//                   {i("paragraph")}
//                 </p>
//                 <p className="text-gray lg:px-16 md:px-5 mt-3 text-center">
//                   {i("title")}
//                 </p>
//               </div>
//             </div>
//           </section>
//         </div>
//       </section>
//     );
// }

// export default ForgetPassword


"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../../../_components/Spinner";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useTranslations } from "next-intl";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import SideSectionRegister from "@/app/_components/SideSectionRegister";
import { LeftArrow, RightArrow } from "@/app/_components/icons/Arrow";

function ForgetPassword() {

  const t = useTranslations("changePassword");
  const f = useTranslations("footer");
  const i = useTranslations("imageWords");
  const s = useTranslations("signIn");
  const r = useTranslations("ResetPassword");
  const language = useCurrentLang();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<{ email?: string; }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const verifyMail = async (eve: React.FormEvent) => {
    eve.preventDefault();
    setIsLoading(true);

    if (!email) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({ "email": email }),
      });

      if (!response.ok) {
        const result = await response.json();
        setIsLoading(false);
        throw new Error(result.message);
      }

      const result = await response.json();
      setIsLoading(false);
      console.log(result);

      toast.success(result.message);
      router.push(`/${language}/verify-password`);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  }
  return (
    <div className="overflow-hidden py-5 bg-zinc-100">
      <div className="flex items-center gap-5 xl:gap-10 flex-col lg:flex-row px-2 md:px-10 xl:px-20">
        <div className="flex flex-col lg:w-6/12 px-0 max-md:px-3">
          <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col self-center w-full">
              <div className="flex flex-col">
                <div className="flex gap-2 justify-center items-center self-start text-sm tracking-wide text-zinc-900">
                  <Link
                    href={`/${language}/login`}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-600 bg-opacity-10"
                  >
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.38057 13.1044C6.50724 13.1044 6.63391 13.0577 6.73391 12.9577C6.92724 12.7644 6.92724 12.4444 6.73391 12.251L3.04057 8.55769L6.73391 4.86436C6.92724 4.67103 6.92724 4.35103 6.73391 4.1577C6.54057 3.96436 6.22057 3.96436 6.02724 4.1577L1.98057 8.20436C1.78724 8.3977 1.78724 8.71769 1.98057 8.91103L6.02724 12.9577C6.12724 13.0577 6.25391 13.1044 6.38057 13.1044Z"
                        fill="#365D8D"
                      />
                      <path
                        d="M2.44667 9.05957H13.6667C13.94 9.05957 14.1667 8.8329 14.1667 8.55957C14.1667 8.28624 13.94 8.05957 13.6667 8.05957H2.44667C2.17334 8.05957 1.94667 8.28624 1.94667 8.55957C1.94667 8.8329 2.17334 9.05957 2.44667 9.05957Z"
                        fill="#365D8D"
                      />
                    </svg>
                  </Link>
                  <div className="self-stretch my-auto">{r("Nav")}</div>
                </div>
                <div className="flex flex-col mt-8 w-full max-md:max-w-full">
                  <div className="flex flex-col justify-center w-full max-md:max-w-full">
                    <div className="flex flex-col justify-center w-full max-md:max-w-full">
                      <div className="flex-1 shrink gap-1.5 self-stretch w-full text-3xl font-bold basis-0 text-zinc-900 max-md:max-w-full">
                        {r("massage1")}
                      </div>
                      <div className="mt-1.5 text-base font-medium tracking-wide text-zinc-800 max-md:max-w-full">
                        {r("label")}
                      </div>
                    </div>
                  </div>
                  <form onSubmit={verifyMail}>
                    <div className="flex flex-col mt-6 w-full max-md:max-w-full">
                      <div className="flex flex-col w-full max-md:max-w-full">
                        <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                          <div className="flex flex-wrap gap-1 items-center p-0 w-full text-right max-md:max-w-full">
                            <div className="text-base font-medium tracking-wide text-zinc-900">
                              {r("Input")}
                            </div>
                            <div className="text-sm leading-6 text-rose-500">
                              *
                            </div>
                          </div>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            placeholder="Example@Example.com"
                            className={`px-4 py-3 mt-2 w-full text-sm bg-white border rounded text-zinc-600 focus:outline-none ${error.email ? "border-red-500" : "border-gray"
                              }`}
                          />
                          {error.email && (
                            <span className="text-red-500 text-sm mt-1">
                              {error.email}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 shrink gap-1 self-stretch p-0 mt-2 w-full text-xs font-medium tracking-wide basis-0 text-zinc-900 max-md:max-w-full">
                          {r("massage2")}
                        </div>
                      </div>
                      <div className="flex flex-col mt-4 w-full text-lg font-bold text-white whitespace-nowrap max-md:max-w-full">
                        {isLoading ? (
                          <Spinner />
                        ) : (
                          <button
                            type="submit"
                            className="flex overflow-hidden flex-wrap gap-1 justify-center items-center px-4 py-0 w-full bg-primary min-h-[58px] rounded-[64px] max-md:max-w-full"
                          >
                            <div className="self-stretch my-auto">
                              {" "}
                              {r("button")}
                            </div>
                            {language === "en" ?
                              <RightArrow />
                                              :
                                              <LeftArrow />}
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                  <div className="flex   self-center mt-6   text-sm tracking-wide">
                    <div className="flex gap-1 items-center">
                      <div className="self-stretch my-auto text-zinc-800">
                        {r("label2")}{" "}
                        <Link
                          href={`/${language}/login`}
                          className="self-stretch my-auto font-medium text-primary"
                        >
                          {r("Login")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SideSectionRegister />
      </div>
    </div>
  );
}

export default ForgetPassword
