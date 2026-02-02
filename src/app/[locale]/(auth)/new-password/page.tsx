"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import Spinner from "../../../_components/Spinner";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { useTranslations } from "next-intl";
import CopyRights from "@/app/_components/CopyRights";
import SideSectionRegister from "@/app/_components/SideSectionRegister";
import { LeftArrow, RightArrow } from "@/app/_components/icons/Arrow";


function NewPassword() {

  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const language = useCurrentLang();
  const t = useTranslations("changePassword");
  const r = useTranslations("ResetPassword");
  const i = useTranslations("imageWords");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerify, setIsVerify] = useState(false);


  const handleSubmit = async () => {
    const newErrors: typeof errors = {};

    // Check if fields are empty
    if (!password) newErrors.password = `${r("FieldRequired")}`;
    if (!confirmPassword) newErrors.confirmPassword = `${r("FieldRequired")}`;

    // Check if passwords match
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = r("passwordNotMatch");
    }

    setErrors(newErrors);
    const code = localStorage.getItem("uniqueNumber");

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            "Accept-Language": language,
          },
          body: JSON.stringify({ "password": password, "code": code })
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message);
        }

        // Handle success (e.g., show a success message, redirect, etc.)
        const result = await response.json();
        toast.success(result.message);
        // router.push(`/${language}/login`);
        setIsVerify(true);
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="overflow-hidden py-5 bg-zinc-100">
      <div className="flex items-center gap-5 xl:gap-10 flex-col lg:flex-row px-2 md:px-10 xl:px-20">
        {isVerify ? (
          <div className="max-w-xl lg:max-w-3xl py-4 rounded-lg ">
            <div className=" rounded-xl py-5 md:py-16 px-5 md:px-10 flex justify-center items-center flex-col">
              <div
                className=" rounded-full flex justify-center items-center"
                style={{ width: "100px", height: "100px", padding: "10px" }}
              >
                <svg
                  width="64"
                  height="65"
                  viewBox="0 0 64 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd" 
                    clipRule="evenodd"
                    d="M63.6673 32.5006C63.6673 49.9897 49.4897 64.1673 32.0006 64.1673C14.5116 64.1673 0.333984 49.9897 0.333984 32.5006C0.333984 15.0116 14.5116 0.833984 32.0006 0.833984C49.4897 0.833984 63.6673 15.0116 63.6673 32.5006ZM44.7634 22.9046C45.6909 23.8321 45.6909 25.3359 44.7634 26.2634L28.93 42.0967C28.0025 43.0242 26.4988 43.0242 25.5713 42.0967L19.2379 35.7634C18.3104 34.8359 18.3104 33.3321 19.2379 32.4046C20.1654 31.4771 21.6692 31.4771 22.5967 32.4046L27.2506 37.0586L34.3276 29.9816L41.4046 22.9046C42.3321 21.9771 43.8359 21.9771 44.7634 22.9046Z"
                    fill="#28C76F"
                  />
                </svg>
              </div>
              <p className="text-2xl font-medium text-center mt-4 capitalize">
                {r("successMessage")}
              </p>
            </div>
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4  sm:col-span-6 text-center font-bold text-white">
              <Link
                href={`/${language}/login`}
                type="submit"
                className="flex overflow-hidden flex-wrap gap-1 justify-center items-center px-4 py-0 w-full bg-primary min-h-[58px] rounded-[64px] max-md:max-w-full"
              >
                <div className="self-stretch my-auto">
                {r("Login")}</div>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4299 6.82227L20.4999 12.8923L14.4299 18.9623"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 12.8926H20.33"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full lg:w-6/12 ">
            <div className="flex flex-col  w-full max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col  max-w-full justify-center items-center">
                <div className="flex flex-col w-full  max-w-[500px] max-md:max-w-full">
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
                  <div className="flex flex-col mt-8 w-full">
                    <div className="flex flex-col justify-center w-full max-md:max-w-full">
                      <div className="flex flex-col justify-center w-full max-md:max-w-full">
                        <div className="flex-1 shrink gap-1.5 self-stretch w-full text-3xl font-bold basis-0 text-zinc-800 max-md:max-w-full">
                          {r("massage1")}
                        </div>
                        <div className="mt-1.5 text-base tracking-wide leading-loose text-zinc-800 max-md:max-w-full">
                          {r("EnterPassword")}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-6 w-full max-md:max-w-full">
                      {/* Password Field */}
                      <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                        <label className="text-base font-medium text-zinc-900 mb-2">
                          {r("Password")} *
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`px-4 py-3 w-full bg-white rounded border ${errors.password
                              ? "border-rose-500"
                              : "border-zinc-300"
                              }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute top-1/2 end-3 transform -translate-y-1/2 text-zinc-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data--h-bstatus="0OBSERVED"
                              >
                                <path
                                  className="hs-password-active:hidden"
                                  d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                                  data--h-bstatus="0OBSERVED"
                                ></path>
                                <path
                                  className="hs-password-active:hidden"
                                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                                  data--h-bstatus="0OBSERVED"
                                ></path>
                                <path
                                  className="hs-password-active:hidden"
                                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                                  data--h-bstatus="0OBSERVED"
                                ></path>
                                <line
                                  className="hs-password-active:hidden"
                                  x1="2"
                                  x2="22"
                                  y1="2"
                                  y2="22"
                                  data--h-bstatus="0OBSERVED"
                                ></line>
                                <path
                                  className="hidden hs-password-active:block"
                                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                                  data--h-bstatus="0OBSERVED"
                                ></path>
                                <circle
                                  className="hidden hs-password-active:block"
                                  cx="12"
                                  cy="12"
                                  r="3"
                                  data--h-bstatus="0OBSERVED"
                                ></circle>
                              </svg>
                            ) : (
                              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.25 7.11914C15.25 8.11914 13.5 13.3691 8 13.3691C2.5 13.3691 0.75 8.11914 0.75 7.11914C0.75 6.11914 2.5 0.869141 8 0.869141C13.5 0.869141 15.25 6.11914 15.25 7.11914Z" stroke="#8A8AA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.25 7.11914C10.25 8.36178 9.24264 9.36914 8 9.36914C6.75736 9.36914 5.75 8.36178 5.75 7.11914C5.75 5.8765 6.75736 4.86914 8 4.86914C9.24264 4.86914 10.25 5.8765 10.25 7.11914Z" stroke="#8A8AA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>

                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-sm text-rose-500 mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      {/* Confirm Password Field */}
                      <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                        <label className="text-base font-medium text-zinc-900 mb-2">
                          {r("ConfirmPassword")} *
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className={`px-4 py-3 w-full bg-white rounded border ${errors.confirmPassword
                              ? "border-rose-500"
                              : "border-zinc-300"
                              }`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute top-1/2 end-3 transform -translate-y-1/2 text-zinc-500"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          >
                            {showConfirmPassword ? (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                data--h-bstatus="0OBSERVED"
                              >
                                <path
                                  className="hs-password-active:hidden"
                                  d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                                  data--h-bstatus="0OBSERVED"
                                ></path>
                                <path
                                  className="hs-password-active:hidden"
                                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                                  data--h-bstatus="0OBSERVED"
                                ></path>
                                <path
                                  className="hs-password-active:hidden"
                                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                                  data--h-bstatus="0OBSERVED"
                                ></path>
                                <line
                                  className="hs-password-active:hidden"
                                  x1="2"
                                  x2="22"
                                  y1="2"
                                  y2="22"
                                  data--h-bstatus="0OBSERVED"
                                ></line>
                                <path
                                  className="hidden hs-password-active:block"
                                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                                  data--h-bstatus="0OBSERVED"
                                ></path>
                                <circle
                                  className="hidden hs-password-active:block"
                                  cx="12"
                                  cy="12"
                                  r="3"
                                  data--h-bstatus="0OBSERVED"
                                ></circle>
                              </svg>
                            ) : (
                              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.25 7.11914C15.25 8.11914 13.5 13.3691 8 13.3691C2.5 13.3691 0.75 8.11914 0.75 7.11914C0.75 6.11914 2.5 0.869141 8 0.869141C13.5 0.869141 15.25 6.11914 15.25 7.11914Z" stroke="#8A8AA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.25 7.11914C10.25 8.36178 9.24264 9.36914 8 9.36914C6.75736 9.36914 5.75 8.36178 5.75 7.11914C5.75 5.8765 6.75736 4.86914 8 4.86914C9.24264 4.86914 10.25 5.8765 10.25 7.11914Z" stroke="#8A8AA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>

                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-rose-500 mt-1">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="flex flex-col mt-6 w-full text-lg font-bold text-white whitespace-nowrap max-md:max-w-full">
                        {isLoading ? (
                          <Spinner />
                        ) : (
                          <button
                            className="flex gap-2 justify-center items-center px-4 w-full bg-primary min-h-[58px] rounded-[64px]"
                            onClick={handleSubmit}
                          >
                            {r("Login")}
                            {language === "en" ?
                              <RightArrow />
                                              :
                                              <LeftArrow />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <SideSectionRegister />
      </div>
    </div>
  );
}

export default NewPassword