"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCleanPath from "../_hooks/useCleanPath";
import useCurrentLang from "../_hooks/useCurrentLang";
import { displayUser } from "../reduxTool-kit/slices/displayUserSlice";
import { AppDispatch, RootState } from "../store";
import { toast } from "react-toastify";
import { getAllNotifications } from "../reduxTool-kit/slices/notificationsSlice";
import { useNotifications } from "../_hooks/useNotifications";

type Notification = {
  id: number,
  is_read: boolean,
  message: string,
  target_id: number,
  target_type: string,
  title: string,
  user_id: number,
  branch_id: number,
  created_at: string,
}



const NAV_LINKS = [
  { key: "home", href: "" },
  { key: "Universities", href: "university" },
  { key: "institutes", href: "language-schools" },
  { key: "whoWeAre", href: "about" },
  { key: "contact", href: "contact" },
  { key: "Blogs", href: "blogs" },
];


const NewHeader: FC = () => {
  const [showUserData, setShowUserData] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const t = useTranslations("nav");
  const n = useTranslations("Setting");
  const { cleanPath } = useCleanPath();
  const router = useRouter();
  const pathname = usePathname();
  const { tokenMainSite } = parseCookies();
  const dispatch = useDispatch<AppDispatch>();
  const language = useCurrentLang();
  const profileRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname.includes(path);
  const { user } = useSelector((state: RootState) => state.displayUser);

  // New Work at Notification 
  const {
    notifications,
    isLoading,
    unreadCount,
    isOpen: isBellOpen,
    toggle,
    bellRef,
    markAllRead,
    markOneRead,
  } = useNotifications(language);


  const handleLogOut = () => {
    destroyCookie(null, "tokenMainSite", {
      path: "/",
    });
    window.location.reload();
  };

  const handleClickUser = () => {
    setShowUserData(!showUserData);
  };


  const timeAgo = (iso: string | number | Date): string => {
    const dt = new Date(iso);
    if (isNaN(dt.getTime())) return "";
    const s = Math.floor((Date.now() - dt.getTime()) / 1000);
    if (s < 60) return `${s}s ${t("ago")}`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ${t("ago")}`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ${t("ago")}`;
    const d = Math.floor(h / 24);
    if (d < 30) return `${d}d ${t("ago")}`;
    const mo = Math.floor(d / 30);
    if (mo < 12) return `${mo}mo ${t("ago")}`;
    const y = Math.floor(mo / 12);
    return `${y}y ${t("ago")}`;
  };





  useEffect(() => {
    const checkUserToken = async () => {
      if (!tokenMainSite) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const result = await dispatch(
          displayUser({ tokenMainSite, locale: language })
        ).unwrap();
        if (result && Object.keys(result).length > 0) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          console.log("No user data found. User not logged in.");
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Error fetching user data:", error);
      }
    };

    checkUserToken();
  }, [dispatch, tokenMainSite, language]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowUserData(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-white leading-10 sticky top-0 z-20">
      <nav className="relative bg-white shadow ">
        <div className="@container/main px-6 md:px-12 lg:px-20 py-2 xl:py-0 mx-auto">
          <div
            className={`xl:flex xl:items-center lg:justify-between xl:justify-center  xl:${language == "ar" ? "gap-0" : "gap-8"
              }`}
          >
            <div className="flex items-center justify-between ">
              <Link
                href={`/${language}`}
                className="md:flex md:items-center md:gap-12 cursor-pointer"
              >
                <Image
                  src="/logo.svg"
                  alt="eduxa logo"
                  width={90}
                  height={80}
                />
              </Link>

              {/* Mobile menu button */}
              <div className="flex xl:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-500  hover:text-gray-600  focus:outline-none focus:text-gray-600 "
                  aria-label="toggle menu"
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {/* Mobile Menu */}
            <div
              className={`absolute flex ${isLoggedIn ? "flex-row" : "flex-col md:flex-row"
                } justify-between z-20 w-[92%] transition-all duration-300 ease-in-out bg-neutral-100 rounded-lg xl:relative xl:bg-transparent xl:w-auto xl:opacity-100 xl:translate-x-0 xl:flex xl:items-center ${isOpen
                  ? "translate-x-0 md:translate-x-4 opacity-100 "
                  : "opacity-0 -translate-x-full hidden"
                }`}
            >
              {/* navigation page */}
              <div className="flex  xl:items-center ms-2 md:ms-6 lg:mx-8 lg:gap-5 ">
                <div className="flex gap-2 items-start max-md:gap-4 xl:gap-4 flex-col   xl:flex-row">
                  {NAV_LINKS.map(({ key, href }) => {
                    const fullPath = href === "" ? `/${language}` : `/${language}/${href}`;
                    const active = href === ""
                      ? pathname === `/${language}`
                      : pathname.startsWith(`/${language}/${href}`);
                    return (
                      <Link
                        key={key}
                        href={fullPath}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-2 text-base border-b
                  ${active ? "font-bold text-primary border-b-primary" :
                            "font-semibold text-black border-b-gray"
                          }`}
                      >
                        {t(key)}
                      </Link>
                    );
                  })}

                </div>
                {/* popup language */}
              </div>

              {/* popup profile */}
              <div className="me-1 md:mx-6 lg:mx-8 xl:mx-0 my-3 md:block">

                {isLoggedIn ? (
                  <div className="flex items-center" ref={burgerRef}>
                    {/* notifications bill */}
                    <div className="flex justify-end" ref={bellRef}>
                      <button
                        type="button"
                        onClick={toggle}
                        className="relative inline-flex h-8 w-8 items-end justify-center rounded-full hover:bg-zinc-100 mx-4 "
                        aria-haspopup="true"
                        aria-expanded={isBellOpen}
                        aria-label="Notifications"
                        aria-controls="notifications-menu"
                      >
                        {/* your SVGs */}
                        {unreadCount > 0 ?
                          (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9903 2.5C12.9108 2.5001 13.704 2.97412 14.1348 3.73633L14.212 3.87305L14.3546 3.94141C16.1781 4.81197 17.4405 6.67115 17.4405 8.82031V11.3496C17.4405 11.6164 17.4988 11.9419 17.5782 12.2354C17.638 12.4563 17.7168 12.6872 17.8087 12.8877L17.9053 13.0771L17.9122 13.0879L18.9122 14.748L18.9131 14.75C19.2234 15.2591 19.2776 15.8582 19.0723 16.4033C18.89 16.8871 18.5394 17.2677 18.085 17.4766L17.8839 17.5547L17.8809 17.5557C15.994 18.1879 14.0075 18.5 12.0196 18.5C10.156 18.5 8.29464 18.2259 6.51569 17.6631L6.16119 17.5469L6.16022 17.5459L5.93658 17.458C5.50806 17.2634 5.1846 16.9584 5.00104 16.5967L4.92096 16.4111L4.91901 16.4072L4.85944 16.209C4.74691 15.7403 4.8281 15.2335 5.11725 14.748L5.11823 14.749L6.12799 13.0791L6.1319 13.0723C6.2675 12.8398 6.3813 12.5284 6.461 12.2354C6.5406 11.9426 6.59967 11.6165 6.59967 11.3496V8.82031C6.59967 6.83191 7.68468 5.0887 9.29401 4.14551L9.62311 3.96777L9.7608 3.89844L9.836 3.76367C10.2689 2.98954 11.084 2.5 11.9903 2.5Z" fill="#365D8D" stroke="#365D8D" />
                            <path d="M10.2464 20.627V20.6279C10.8282 20.679 11.4229 20.71 12.0198 20.71C12.4604 20.71 12.8998 20.6924 13.3333 20.6621L13.764 20.6279H13.7679C13.8102 20.6239 13.8569 20.6192 13.9066 20.6152C13.4454 21.1563 12.7619 21.4999 12.0003 21.5C11.3414 21.5 10.6922 21.2318 10.2396 20.7627L10.222 20.7451L10.1302 20.6523C10.1183 20.6395 10.1076 20.6255 10.096 20.6123C10.146 20.6172 10.1961 20.6227 10.2464 20.627Z" stroke="#365D8D" />
                          </svg>)
                          : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 6.43945V9.76945" stroke="#365D8D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                              <path d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z" stroke="#365D8D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                              <path d="M15.33 18.8203C15.33 20.6503 13.83 22.1503 12 22.1503C11.09 22.1503 10.25 21.7703 9.64998 21.1703C9.04998 20.5703 8.66998 19.7303 8.66998 18.8203" stroke="#365D8D" strokeWidth="1.5" strokeMiterlimit="10" />
                            </svg>)}
                        {unreadCount > 0 && (
                          <span
                            className="absolute -top-1 -right-2.5 bg-[#e39535] text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center leading-none pointer-events-none"
                            aria-label={`${unreadCount} unread notifications`}
                          >
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </span>
                        )}
                      </button>

                      {/* Dropdown */}
                      <div
                        role="menu"
                        className={`absolute w-72 md:w-80 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-black/5 z-50 transition-transform  duration-700 ease-in-out
                            mt-10 md:mt-10 xl:mt-12
                          ${language === "en" ? "right-4 md:right-14 lg:right-20 xl:right-0" : "left-4 md:left-14 lg:left-20 xl:left-0 "}
                          ${isBellOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
                      >
                        {/* Header row */}
                        <div className="flex items-center justify-between px-4 pt-3 pb-2">
                          <div className="text-sm font-semibold">{t("notification")}</div>
                          <button
                            onClick={markAllRead}
                            className={`text-xs underline-offset-2 hover:underline ${unreadCount ? "text-primary" : "text-zinc-400 cursor-default"}`}
                            disabled={!unreadCount}
                          >
                            {t("makeAllRead")}
                          </button>
                        </div>

                        {/* Content area */}
                        <div className="max-h-80 overflow-y-auto">
                          {isLoading && (
                            <div className="px-4 py-6 text-sm text-zinc-500">Loading…</div>
                          )}

                          {!isLoading && !notifications && (
                            <div className="px-4 py-6 text-sm text-red-600">Failed to load notifications.</div>
                          )}

                          {!isLoading && notifications?.data.length === 0 && (
                            <div className="px-4 py-6 text-sm text-zinc-500">{n("noNotification")}</div>
                          )}

                          {/* list */}
                          <ul className="divide-y divide-zinc-100">
                            {notifications?.data?.map((n: Notification) => (
                              <li key={n.id} className={`px-4 ${n.is_read ? "bg-white" : "bg-blue-50"} hover:bg-white transition-all duration-300`}>
                                <div
                                  onClick={async () => {
                                    if (!n.is_read) {
                                      // makeNotificationRead(n);
                                      markOneRead(n)
                                    }
                                    if (n.target_type === "INSTITUTE") {
                                      router.push(`/${language}/language-schools/${n.target_id}/${n.branch_id}`);
                                    } else if (n.target_type === "UNIVERSITY") {
                                      router.push(`/${language}/university/${n.target_id}`);
                                    }
                                    // setIsBellOpen(false);

                                    setIsOpen(false);
                                  }}
                                  className="block border-b border-gray cursor-pointer"
                                  role="menuitem"
                                >
                                  <div className="flex gap-3 items-baseline">
                                    {/* dot for unread */}
                                    <span
                                      className={`mt-1 inline-block h-2 w-2 rounded-full flex-shrink-0 ${n.is_read ? "bg-transparent" : "bg-primary"
                                        }`}
                                      aria-hidden="true"
                                    />
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2">
                                        <p
                                          className={`text-sm ${n.is_read
                                            ? "font-medium text-zinc-800"
                                            : "font-semibold text-zinc-900"
                                            }`}
                                        >
                                          {n.title}
                                        </p>
                                        <span className="text-[11px] text-zinc-500">
                                          {timeAgo(n.created_at)}
                                        </span>
                                      </div>
                                      <p className="text-sm text-zinc-600 ">{n.message}</p>
                                      {/* <hr /> */}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Footer (optional link to all) */}
                        <div className="px-4 border-t border-zinc-100">
                          <Link
                            href={`/${language}/settings`}
                            onClick={() => {
                              setIsOpen(false);
                              toggle();
                            }}
                            className="text-sm text-primary hover:underline"
                          >
                            {t("viewAll")}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div
                      ref={profileRef}
                      onClick={handleClickUser}
                      aria-haspopup="menu"
                      className="flex items-center cursor-pointer gap-1 p-1 justify-between rounded-xl border-gray-300 border-gray border-[0.8px] max-w-[197px] hover:border-primary shrink bg-[#FAFAFA]"
                    >

                      {user?.avatar !== null ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                            }/${cleanPath(user?.avatar || "/images/avatar.png")}`}
                          width={80}
                          height={60}
                          alt={user?.name || "avatar"}
                          className="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[30px]"
                        />
                      ) : (
                        <Image
                          src="/images/avatar.png"
                          width={80}
                          height={60}
                          alt="avatar"
                          className="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[30px]"
                        />
                      )}

                      <div className="flex gap-1 items-center  text-start">
                        <div className="flex flex-col items-start self-stretch my-auto">
                          <div className="mt-1.5 mx-1 mb-1.5 text-sm text-zinc-500 line-clamp-1 capitalize">
                            {user?.first_name}{" "}
                            {user?.last_name}
                          </div>
                        </div>
                      </div>
                      <div x-data="{ isActive: false }" className="flex">
                        <div className="inline-flex items-center overflow-hidden rounded-md  bg-white">
                          <button className=" text-black  hover:bg-gray-50 hover:text-gray-700 flex justify-center items-center py-1 px-1">
                            <svg
                              className={`transition-transform duration-500 ease-in-out ${showUserData ? "rotate-180" : ""
                                }`}
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.6672 2H8.28717C4.64717 2 2.47717 4.17 2.47717 7.81V16.18C2.47717 19.83 4.64717 22 8.28717 22H16.6572C20.2972 22 22.4672 19.83 22.4672 16.19V7.81C22.4772 4.17 20.3072 2 16.6672 2ZM16.5372 11.17L13.0072 14.7C12.8572 14.85 12.6672 14.92 12.4772 14.92C12.2872 14.92 12.0972 14.85 11.9472 14.7L8.41717 11.17C8.12717 10.88 8.12717 10.4 8.41717 10.11C8.70717 9.82 9.18717 9.82 9.47717 10.11L12.4772 13.11L15.4772 10.11C15.7672 9.82 16.2472 9.82 16.5372 10.11C16.8272 10.4 16.8272 10.87 16.5372 11.17Z"
                                fill="#666666"
                              />
                            </svg>
                          </button>
                        </div>
                        <div
                          className={`absolute top-[3.5rem] md:top-[3.5rem] lg:top-[3.5rem] xl:top-[4rem] ${language == "ar"
                            ? "start-40 md:start-[30rem] lg:start-[44rem] xl:start-[45rem]"
                            : "start-28 md:start-[30rem] lg:start-[42rem] xl:start-[45rem]"
                            }  z-10 w-44 md:w-52 lg:w-60 rounded-md border-gray-100 bg-secondColor shadow-lg`}
                          role="menu"
                          x-show="isActive">

                          {showUserData ? (
                            <div className="flex overflow-hidden flex-col bg-white rounded border border-solid shadow-xl border-zinc-100 max-w-[256px]">
                              <div className="flex flex-col justify-center p-4 w-full">
                                <div className="flex flex-col w-56 max-w-full">
                                  <div className="flex flex-col items-center self-center">
                                    {user?.avatar !== null ? (
                                      <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                                          }/${cleanPath(user?.avatar || "/images/avatar.png")}`}
                                        width={100}
                                        height={80}
                                        alt={user?.name || "avatar"}
                                        className="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[80px]"
                                      />
                                    ) : (
                                      <div className="h-[80px] w-[80px] bg-white flex justify-center items-center text-3xl text-black rounded-full shadow-lg">
                                        <span>
                                          {user?.first_name
                                            ?.slice(0, 1)
                                            .toUpperCase()}
                                        </span>
                                      </div>
                                    )}

                                    <div className="mt-3 text-sm tracking-wide text-center text-black capitalize">
                                      {user?.first_name}{" "}
                                      {user?.last_name}
                                    </div>
                                  </div>
                                  <div className="flex flex-col mt-3.5 w-full text-sm tracking-wide">
                                    <Link
                                      href={`/${language}/profile`}
                                      onClick={() => setIsOpen(!isOpen)}
                                      className={`flex overflow-hidden gap-2 items-center p-2 w-full border-b-2
                                      ${isActive(`/profile`) ? "font-semibold text-primary border-b-primary" : "text-black border-b-gray"}`}
                                    >
                                      <div className="overflow-hidden flex-1 shrink self-stretch my-auto basis-0 text-zinc-900 hover:text-primary ">
                                        {t("myProfile")}
                                      </div>
                                      <svg
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M14.1666 18H5.83329C2.49996 18 1.66663 17.1667 1.66663 13.8333V7.16667C1.66663 3.83333 2.49996 3 5.83329 3H14.1666C17.5 3 18.3333 3.83333 18.3333 7.16667V13.8333C18.3333 17.1667 17.5 18 14.1666 18Z"
                                          stroke="black"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M11.6666 7.16667H15.8333"
                                          stroke="black"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M12.5 10.5H15.8333"
                                          stroke="black"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M14.1666 13.8333H15.8333"
                                          stroke="black"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M7.08328 9.90833C7.91631 9.90833 8.59162 9.23302 8.59162 8.4C8.59162 7.56697 7.91631 6.89166 7.08328 6.89166C6.25026 6.89166 5.57495 7.56697 5.57495 8.4C5.57495 9.23302 6.25026 9.90833 7.08328 9.90833Z"
                                          stroke="black"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M9.99996 14.1083C9.88329 12.9 8.92496 11.95 7.71663 11.8417C7.29996 11.8 6.87496 11.8 6.44996 11.8417C5.24163 11.9583 4.28329 12.9 4.16663 14.1083"
                                          stroke="black"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </Link>
                                    <Link
                                      href={`/${language}/my-requests`}
                                      onClick={() => setIsOpen(!isOpen)}
                                      className={`flex overflow-hidden gap-2 items-center p-2 w-full border-b-2
                                      ${isActive(`/my-requests`) ? "font-semibold text-primary border-b-primary" : "text-black border-b-gray"}`}
                                    >
                                      <div className="overflow-hidden flex-1 shrink self-stretch my-auto basis-0 text-zinc-900 hover:text-primary ">
                                        {t("myRequest")}
                                      </div>
                                      <svg
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8.33329 5.50001H11.6666C13.3333 5.50001 13.3333 4.66667 13.3333 3.83334C13.3333 2.16667 12.5 2.16667 11.6666 2.16667H8.33329C7.49996 2.16667 6.66663 2.16667 6.66663 3.83334C6.66663 5.50001 7.49996 5.50001 8.33329 5.50001Z"
                                          stroke="black"
                                          strokeWidth="1.5"
                                          strokeMiterlimit="10"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M13.3333 3.85001C16.1083 4.00001 17.5 5.02501 17.5 8.83334V13.8333C17.5 17.1667 16.6667 18.8333 12.5 18.8333H7.5C3.33333 18.8333 2.5 17.1667 2.5 13.8333V8.83334C2.5 5.03334 3.89167 4.00001 6.66667 3.85001"
                                          stroke="black"
                                          strokeWidth="1.5"
                                          strokeMiterlimit="10"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </Link>
                                    <Link
                                      href={`/${language}/my-favorite`}
                                      onClick={() => setIsOpen(!isOpen)}
                                      className={`flex overflow-hidden gap-2 items-center p-2 w-full border-b-2
                                      ${isActive(`/my-favorite`) ? "font-semibold text-primary border-b-primary" : "text-black border-b-gray"}`}
                                    >
                                      <div className="overflow-hidden flex-1 shrink self-stretch my-auto basis-0 text-zinc-900 hover:text-primary ">
                                        {t("myFavorites")}
                                      </div>
                                      <svg
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                          stroke="black"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </Link>
                                    <Link
                                      href={`/${language}/settings`}
                                      onClick={() => setIsOpen(!isOpen)}
                                      className={`flex overflow-hidden gap-2 items-center p-2 w-full border-b-2
                                      ${isActive(`/settings`) ? "font-semibold text-primary border-b-primary" : "text-black border-b-gray"}`}
                                    >
                                      <div className="overflow-hidden flex-1 shrink self-stretch my-auto basis-0 text-zinc-900 hover:text-primary ">
                                        {t("settings")}
                                      </div>
                                      <svg
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M10 13C11.3807 13 12.5 11.8807 12.5 10.5C12.5 9.11929 11.3807 8 10 8C8.61929 8 7.5 9.11929 7.5 10.5C7.5 11.8807 8.61929 13 10 13Z"
                                          stroke="black"
                                          strokeWidth="1.5"
                                          strokeMiterlimit="10"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M1.66663 11.2333V9.76666C1.66663 8.9 2.37496 8.18333 3.24996 8.18333C4.75829 8.18333 5.37496 7.11666 4.61663 5.80833C4.18329 5.05833 4.44163 4.08333 5.19996 3.65L6.64163 2.825C7.29996 2.43333 8.14996 2.66666 8.54163 3.325L8.63329 3.48333C9.38329 4.79166 10.6166 4.79166 11.375 3.48333L11.4666 3.325C11.8583 2.66666 12.7083 2.43333 13.3666 2.825L14.8083 3.65C15.5666 4.08333 15.825 5.05833 15.3916 5.80833C14.6333 7.11666 15.25 8.18333 16.7583 8.18333C17.625 8.18333 18.3416 8.89166 18.3416 9.76666V11.2333C18.3416 12.1 17.6333 12.8167 16.7583 12.8167C15.25 12.8167 14.6333 13.8833 15.3916 15.1917C15.825 15.95 15.5666 16.9167 14.8083 17.35L13.3666 18.175C12.7083 18.5667 11.8583 18.3333 11.4666 17.675L11.375 17.5167C10.625 16.2083 9.39163 16.2083 8.63329 17.5167L8.54163 17.675C8.14996 18.3333 7.29996 18.5667 6.64163 18.175L5.19996 17.35C4.44163 16.9167 4.18329 15.9417 4.61663 15.1917C5.37496 13.8833 4.75829 12.8167 3.24996 12.8167C2.37496 12.8167 1.66663 12.1 1.66663 11.2333Z"
                                          stroke="black"
                                          strokeWidth="1.5"
                                          strokeMiterlimit="10"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </Link>
                                    <div
                                      onClick={handleLogOut}
                                      className="flex overflow-hidden gap-2 justify-end py-2.5 w-full text-rose-700 bg-white"
                                    >
                                      <svg
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M4.84156 16.9991C4.4924 16.9991 4.1958 16.8771 3.95177 16.6331C3.70788 16.3892 3.58594 16.0927 3.58594 15.7435V5.34059C3.58594 4.99142 3.70788 4.69482 3.95177 4.45079C4.1958 4.20691 4.4924 4.08496 4.84156 4.08496H9.52823C9.66378 4.08496 9.78059 4.13357 9.87865 4.23079C9.9767 4.32802 10.0257 4.44378 10.0257 4.57809C10.0257 4.71517 9.9767 4.83378 9.87865 4.93392C9.78059 5.03406 9.66378 5.08413 9.52823 5.08413H4.84156C4.7774 5.08413 4.71858 5.11079 4.6651 5.16413C4.61177 5.2176 4.5851 5.27642 4.5851 5.34059V15.7435C4.5851 15.8077 4.61177 15.8664 4.6651 15.9198C4.71858 15.9732 4.7774 16 4.84156 16H9.52823C9.66378 16 9.78059 16.0486 9.87865 16.1458C9.9767 16.243 10.0257 16.3588 10.0257 16.4931C10.0257 16.6302 9.9767 16.7488 9.87865 16.8489C9.78059 16.9491 9.66378 16.9991 9.52823 16.9991H4.84156ZM14.4882 11.0416H8.6324C8.49434 11.0416 8.37635 10.993 8.27844 10.8958C8.18052 10.7986 8.13156 10.6814 8.13156 10.5443C8.13156 10.41 8.18052 10.2928 8.27844 10.1927C8.37635 10.0925 8.49434 10.0425 8.6324 10.0425H14.4882L13.2955 8.84996C13.1819 8.73899 13.1238 8.61461 13.1211 8.47684C13.1185 8.33906 13.1775 8.21822 13.2982 8.11434C13.4163 8.01031 13.5362 7.96135 13.658 7.96746C13.7798 7.97371 13.8952 8.02989 14.0041 8.136L15.9697 10.1018C16.1 10.2271 16.1651 10.3732 16.1651 10.5402C16.1651 10.7071 16.1002 10.8543 15.9705 10.9816L13.9984 12.9535C13.8916 13.0577 13.7782 13.1089 13.658 13.1073C13.5379 13.1057 13.4216 13.0529 13.3091 12.9487C13.195 12.8429 13.1356 12.726 13.1307 12.5981C13.126 12.4702 13.1822 12.3463 13.2993 12.2264L14.4882 11.0416Z"
                                          fill="#C30734"
                                        />
                                      </svg>

                                      <div className="overflow-hidden flex-1 shrink self-stretch text-rose-700 basis-0">
                                        {t("logout")}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>) :
                  (
                    <div className="flex gap-2 grow ms-4">
                      <Link
                        className="inline-flex items-center gap-2 rounded-3xl bg-primary  border hover:border-primary hover:text-primary hover:bg-white  duration-300  px-3 py-0 text-base font-medium text-white focus:relative transition ease-in-out delay-150"
                        onClick={() => setIsOpen(!isOpen)}
                        href={`/${language}/register`}
                      >
                        <svg
                          width="17"
                          height="18"
                          viewBox="0 0 19 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" fill-primary group-hover:fill-white"
                        >
                          <path
                            d="M9.49935 10.0007C11.6855 10.0007 13.4577 8.22844 13.4577 6.04232C13.4577 3.85619 11.6855 2.08398 9.49935 2.08398C7.31322 2.08398 5.54102 3.85619 5.54102 6.04232C5.54102 8.22844 7.31322 10.0007 9.49935 10.0007Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.3 17.9167C16.3 14.8529 13.2521 12.375 9.49963 12.375C5.74713 12.375 2.69922 14.8529 2.69922 17.9167"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        {t("createAccount")}
                      </Link>

                      <Link
                        href={`/${language}/login`}
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center gap-2 rounded-3xl bg-white px-3 py-2 text-base font-medium text-primary border border-primary hover:text-white hover:bg-primary transition-all duration-300 focus:relative"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" fill-primary group-hover:fill-white"
                        >
                          <path
                            d="M11.6673 11.8773V13.619C10.9131 13.3523 10.1059 13.2705 9.31349 13.3805C8.52109 13.4904 7.76665 13.7889 7.11351 14.2508C6.46037 14.7128 5.9276 15.3247 5.55995 16.0352C5.1923 16.7457 5.0005 17.534 5.00065 18.334L3.33398 18.3332C3.33373 17.3156 3.56642 16.3114 4.01423 15.3976C4.46205 14.4839 5.1131 13.6848 5.9175 13.0615C6.7219 12.4383 7.6583 12.0074 8.65495 11.802C9.65159 11.5966 10.682 11.6221 11.6673 11.8765V11.8773ZM10.0007 10.834C7.23815 10.834 5.00065 8.59648 5.00065 5.83398C5.00065 3.07148 7.23815 0.833984 10.0007 0.833984C12.7632 0.833984 15.0007 3.07148 15.0007 5.83398C15.0007 8.59648 12.7632 10.834 10.0007 10.834ZM10.0007 9.16732C11.8423 9.16732 13.334 7.67565 13.334 5.83398C13.334 3.99232 11.8423 2.50065 10.0007 2.50065C8.15898 2.50065 6.66732 3.99232 6.66732 5.83398C6.66732 7.67565 8.15898 9.16732 10.0007 9.16732ZM16.6673 14.1673H19.1673V15.834H16.6673V18.7507L12.5007 15.0007L16.6673 11.2507V14.1673Z"
                            className="fill-current"
                          />
                        </svg>

                        {t("Login")}
                      </Link>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Overlay when mobile menu is open */}
      {isOpen && (
        <button
          aria-label="Close menu overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-10 xl:hidden"
        />
      )}
    </header>
  );
};

export default NewHeader;
