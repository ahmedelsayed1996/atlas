"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useCurrentLang from "../_hooks/useCurrentLang";
import Countdown from "./Countdown";
import { usePathname } from "next/navigation";
import {
    FacebookIcon,
    LinkedInIcon,
    XIcon,
    InstagramIcon,
} from "../_components/icons/SocialMedia";

const SOCIAL_LINKS = [
    {
        href: "https://www.facebook.com/eduxa.study/",
        label: "Eduxa on Facebook",
        Icon: FacebookIcon,
    },
    {
        href: "https://www.linkedin.com/company/eduxa/",
        label: "Eduxa on LinkedIn",
        Icon: LinkedInIcon,
    },
    {
        href: "https://x.com/eduxaedu",
        label: "Eduxa on X",
        Icon: XIcon,
    },
    {
        href: "https://www.instagram.com/eduxa.study/",
        label: "Eduxa on Instagram",
        Icon: InstagramIcon,
    },
];


export default function Navbar() {
    const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
    const language = useCurrentLang();
    const pathname = usePathname();
    const cleanPath = pathname.replace(/^\/(en|ar)/, "");
    const languageSwitchRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                languageSwitchRef.current &&
                !languageSwitchRef.current.contains(event.target as Node)
            ) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav dir="ltr" aria-label="Top navigation bar" className=" flex justify-between items-center px-2 lg:px-6 xl:px-28 py-2 w-full h-12 bg-slate-100 top-[bar] max-md:py-2  max-sm:py-2 z-20 gap-1 ">
                <div className="flex gap-0.5  items-center">
                    <Link href={"#"} className="flex justify-center items-center  w-4 md:w-7 h-8  rounded">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.62 10.7496C17.19 10.7496 16.85 10.3996 16.85 9.97961C16.85 9.60961 16.48 8.83961 15.86 8.16961C15.25 7.51961 14.58 7.13961 14.02 7.13961C13.59 7.13961 13.25 6.78961 13.25 6.36961C13.25 5.94961 13.6 5.59961 14.02 5.59961C15.02 5.59961 16.07 6.13961 16.99 7.10961C17.85 8.01961 18.4 9.14961 18.4 9.96961C18.4 10.3996 18.05 10.7496 17.62 10.7496Z" fill="#365D8D" />
                            <path d="M21.2317 10.75C20.8017 10.75 20.4617 10.4 20.4617 9.98C20.4617 6.43 17.5717 3.55 14.0317 3.55C13.6017 3.55 13.2617 3.2 13.2617 2.78C13.2617 2.36 13.6017 2 14.0217 2C18.4217 2 22.0017 5.58 22.0017 9.98C22.0017 10.4 21.6517 10.75 21.2317 10.75Z" fill="#365D8D" />
                            <path d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.43 15.45 5.5 14.36 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95Z" fill="#365D8D" />
                            <path d="M21.9716 18.33C21.9716 18.61 21.9216 18.9 21.8216 19.18C21.7916 19.26 21.7616 19.34 21.7216 19.42C21.5516 19.78 21.3316 20.12 21.0416 20.44C20.5516 20.98 20.0116 21.37 19.4016 21.62C19.3916 21.62 19.3816 21.63 19.3716 21.63C18.7816 21.87 18.1416 22 17.4516 22C16.4316 22 15.3416 21.76 14.1916 21.27C13.0416 20.78 11.8916 20.12 10.7516 19.29C10.3616 19 9.97156 18.71 9.60156 18.4L12.8716 15.13C13.1516 15.34 13.4016 15.5 13.6116 15.61C13.6616 15.63 13.7216 15.66 13.7916 15.69C13.8716 15.72 13.9516 15.73 14.0416 15.73C14.2116 15.73 14.3416 15.67 14.4516 15.56L15.2116 14.81C15.4616 14.56 15.7016 14.37 15.9316 14.25C16.1616 14.11 16.3916 14.04 16.6416 14.04C16.8316 14.04 17.0316 14.08 17.2516 14.17C17.4716 14.26 17.7016 14.39 17.9516 14.56L21.2616 16.91C21.5216 17.09 21.7016 17.3 21.8116 17.55C21.9116 17.8 21.9716 18.05 21.9716 18.33Z" fill="#365D8D" />
                        </svg>

                    </Link>

                    <a
                        href="tel:+447575879770"
                        className="text-base font-medium text-zinc-900 max-sm:text-sm text-nowrap"
                    >
                        +44 7575 879770
                    </a>

                </div>
                <div className="flex items-center">
                    {/* media icons */}
                    <div className="flex gap-0.5 md:gap-2 md:pe-8 border-e border-white">
                        {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                aria-label={label}
                                className="text-zinc-900 hover:opacity-80 transition"
                            >
                                <Icon />
                            </Link>
                        ))}
                    </div>

                    {/* popup language */}
                    <div className="items-center md:ps-8 relative" ref={languageSwitchRef}>
                        <div className="inline-flex items-center overflow-hidden rounded-md  bg-white">
                            <button
                                // onClick={handleClickLang}
                                onClick={() => setIsLangOpen((p) => !p)}
                                aria-expanded={isLangOpen}
                                aria-haspopup="menu"
                                className="text-sm md:text-base text-black bg-secondColor hover:bg-gray-50 hover:text-gray-700 flex justify-center items-center py-1 px-1"
                            >
                                <Image
                                    src={language === "en" ? "/images/uk.png" : "/images/ar.png"}
                                    alt={language === "en" ? "English language" : "Arabic language"}
                                    width={32}
                                    height={32}
                                    className=" md:mx-1"
                                />
                                {language === "en" ? "English" : "Arabic"}

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 transition-transform duration-500 ease-in-out ${isLangOpen ? "rotate-180" : ""
                                        }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div
                            className="absolute start-0 md:start-10 mt-2 w-24 rounded-md border-gray-100 bg-white shadow-lg z-50"
                            role="menu"
                            x-show="isActive"
                        >
                            {isLangOpen ? (
                                <div className="p-2 ">
                                    <div className="flex justify-start items-center">
                                        <Link
                                            href={`/ar${cleanPath}`}
                                            // href={`/ar/${window.location.pathname.slice(4)}`}
                                            className="rounded-lg px-1 pe-2 py-2 text-sm text-gray-500 hover:bg-gray hover:text-gray-700 flex items-center"
                                            role="menuitem"
                                        >
                                            <Image
                                                // src="https://api.eduxa.com/upload/ar.png"
                                                src="/images/ar.png"
                                                alt="Arabic Language"
                                                width={32}
                                                height={32}
                                                className="rounded-full mx-1"
                                            />
                                            AR
                                        </Link>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <Link
                                            href={`/en${cleanPath}`}
                                            className="  rounded-lg px-1 pe-2 py-2 text-sm text-gray-500 hover:bg-gray hover:text-gray-700 flex items-center"
                                            role="menuitem"
                                        >
                                            <Image
                                                src="/images/uk.png"
                                                alt="English Language"
                                                width={32}
                                                height={32}
                                                className="rounded-full mx-1"
                                            />
                                            EN
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <Countdown />
        </>
    )
}
