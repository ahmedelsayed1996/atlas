"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import useCurrentLang from "../_hooks/useCurrentLang";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
  FacebookIcon,
  LinkedInIcon,
  XIcon,
  InstagramIcon,
} from "../_components/icons/SocialMedia";
import { usePathname } from "next/navigation";

type SocialLink = {
  href: string;
  label: string;
  Icon: React.FC;
};

type QuickLink = {
  href: string;
  label: string;
};

const SOCIAL_LINKS: SocialLink[] = [
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
const QUICK_LINKS: QuickLink[] = [
  {
    href: "faq",
    label: "Faq",
  },
  {
    href: "privacy-policy",
    label: "privacyPolicy",
  },
  {
    href: "terms-and-conditions",
    label: "termsConditions",
  },
  {
    href: "refund-policy",
    label: "refundPolicy",
  },
];



function NewFooter() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const t = useTranslations("footer");
  const language = useCurrentLang();
  const pathname = usePathname();
  const cleanPath = pathname.replace(/^\/(en|ar)/, "");
  const currentYear = new Date().getFullYear();

  const handleClickLang = () => {
    setShowLanguage(!showLanguage);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        throw new Error(errorData.message || "Failed to subscribe");
      }

      const postsData = await response.json();
      setLoading(false);
      toast.success(t("SubscribedSuccessfully"));
      setEmail("");
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Failed to subscribe");
    }
  };

  return (
    <div className="flex flex-col items-center px-5 lg:px-20 xl:px-28 pt-3 lg:pt-4 pb-4 w-full text-white bg-primary">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between pb-4 w-full border-b border-solid border-b-white  max-md:items-center flex-col lg:flex-row gap-2 max-sm:items-center"
      >
        <div className="flex lg:w-1/2 flex-col gap-3">
          <span className="text-base font-medium tracking-wide">
            {t("newsletter")}
          </span>
          <span className="text-2xl font-bold">{t("newsletterP")}</span>
        </div>

        <div className="flex lg:w-1/2 gap-5 items-center flex-row max-sm:gap-3">
          <div className="flex-1 md:flex-shrink">
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Example@example.com"
              className="px-5 py-2 md:py-2 lg:py-2 text-base font-medium bg-white  rounded-[47px] text-neutral-700 outline-none w-full"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-28 md:w-44 text-base font-medium text-white bg-amber-500 hover:bg-amber-600 py-2 md:py-2 lg:py-2 rounded-[91px] transition-all duration-300"
          >
            {loading ? `${t("Sending")}` : `${t("Button")}`}
          </button>
        </div>
      </form>
      <div className="flex justify-between px-0 py-2 md:py-4 w-full max-md:flex-col max-md:gap-6 max-md:items-center max-sm:flex-col max-sm:gap-3 max-sm:items-center">
        <div className="flex flex-col gap-6 w-3/5 max-md:w-full max-sm:w-full">
          <Link
            href={`/${language}`}
            className="md:flex md:items-center md:gap-12 cursor-pointer"
          >
            <Image
              src="/logo-secoundry.svg"
              alt="logo"
              width={90}
              height={80}
            />
          </Link>
          <span className="text-base font-medium leading-normal text-justify">
            {t("paragraph")}
          </span>
        </div>
        <div className="flex flex-col gap-2.5 w-[30%] max-md:w-full max-sm:w-full">
          <span className="text-xl font-bold -ms-1">{t("UsefulLinks")}</span>
          <ul className="p-0 ms-5 list-disc">
            {QUICK_LINKS.map((qui) => (
              <li key={qui.label} className="text-base font-medium leading-7 text-white hover:text-amber-500 transition-colors duration-300 hover:translate-x-2">
                <Link href={`/${language}/${qui.href}`}>{t(qui.label)} </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center pt-2 w-full border-t border-solid border-t-white flex-col gap-2 lg:flex-row max-md:gap-6 max-md:items-center  max-sm:gap-3 max-sm:items-center text-sm md:text-base">
        {/* first section */}
        <div className="">
          <span>
            {t("rightsSave")} {currentYear}
          </span>
        </div>
        {/* second section */}
        <div className="flex justify-between"></div>
        {/* third section */}
        <div className="flex items-center gap-5 justify-end">
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
          <div x-data="{ isActive: false }" className="items-center relative">
            <div className="inline-flex items-center overflow-hidden rounded-md  bg-white">
              <button
                onClick={handleClickLang}
                className=" text-black bg-secondColor hover:bg-gray-50 hover:text-gray-700 flex justify-center items-center py-1 px-1"
              >
                <Image
                  src={language === "en" ? "/images/uk.png" : "https://api.eduxa.com/upload/ar.png"}
                  alt={language === "en" ? "English" : "Arabic"}
                  width={32}
                  height={32}
                />
                {language === "en" ? "English" : "Arabic"}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
              className="absolute -top-[108px] mt-2 w-24 rounded-md border-gray-100 bg-white shadow-lg z-50"
              role="menu"
              x-show="isActive"
            >
              {showLanguage ? (
                <div className="p-2 ">
                  <div className="flex justify-start items-center">
                    <Link
                      href={`/ar/${cleanPath}`}
                      className="rounded-lg px-1 pe-2 py-2 text-sm text-black hover:bg-gray flex items-center"
                    >
                      <Image
                        src="https://api.eduxa.com/upload/ar.png"
                        alt="AR flag"
                        width={32}
                        height={32}
                        className="rounded-full mx-2"
                      />
                      AR
                    </Link>
                  </div>
                  <div className="flex justify-start items-center">
                    <Link
                      href={`/en/${cleanPath}`}
                      className="  rounded-lg px-1 pe-2 py-2 text-sm text-black hover:bg-gray flex items-center"
                    >
                      <Image
                        src="/images/uk.png"
                        alt="EN flag"
                        width={32}
                        height={32}
                        className="rounded-full mx-2"
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
      </div>
    </div>
  );
}

export default NewFooter;
