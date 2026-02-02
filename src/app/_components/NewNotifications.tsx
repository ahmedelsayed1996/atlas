"use client";
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import useCurrentLang from '../_hooks/useCurrentLang';
import { AppDispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotifications } from '../reduxTool-kit/slices/notificationsSlice';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import Pagination from './Pagination';

type Notification = {
    id: number,
    is_read: boolean,
    message: string,
    target_id: number,
    target_type: string,
    title: string,
    user_id: number,
    created_at: string,
    branch_id: number
}

function NewNotifications() {

    const t = useTranslations("Setting");
    const n = useTranslations("nav");
    const u = useTranslations("Universities");
    const dispatch = useDispatch<AppDispatch>();
    const language = useCurrentLang();
    const router = useRouter();
    const { tokenMainSite } = parseCookies();
    const { pending, notifications } = useSelector((state: any) => state.notifications);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const [limit, setLimit] = useState<number>(10);

    const timeAgo = (iso: string | number | Date): string => {
        const dt = new Date(iso);
        if (isNaN(dt.getTime())) return "";
        const s = Math.floor((Date.now() - dt.getTime()) / 1000);
        if (s < 60) return `${s}s ${n("ago")}`;
        const m = Math.floor(s / 60);
        if (m < 60) return `${m}m ${n("ago")}`;
        const h = Math.floor(m / 60);
        if (h < 24) return `${h}h ${n("ago")}`;
        const d = Math.floor(h / 24);
        if (d < 30) return `${d}d ${n("ago")}`;
        const mo = Math.floor(d / 30);
        if (mo < 12) return `${mo}mo ${n("ago")}`;
        const y = Math.floor(mo / 12);
        return `${y}y ${n("ago")}`;
    };

    const makeNotificationRead = async (notification: Notification) => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/make-read/${notification.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${tokenMainSite}`
                },
                body: JSON.stringify({ is_read: true }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message);
            }
            dispatch(getAllNotifications({ page: 1, limit: 10, language }));
        } catch (error: any) {
            toast
                .error(error.message);
        }

    }

    const handlePageChange = (newPage: any) => {
        if (hasMoreData && newPage !== currentPage) {
            setCurrentPage(newPage);
            dispatch(getAllNotifications({ page: newPage, limit: limit, language }));
            // scrollToTop();
            // dispatch(getAllUniversities({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, majors: selectedMajors?.id, fields: selectedFields?.id, page: newPage, limit: limit, language, recommended }));
        }
    };

    useEffect(() => {
        if (!notifications) {
            dispatch(getAllNotifications({ page: currentPage, limit: limit, language }));
        }
    }, [])

    return (
        <div className="flex flex-col w-[71%] max-md:w-full">
            <div className="flex overflow-hidden flex-col grow pb-6 w-full tracking-wide bg-white rounded-lg border border-solid border-zinc-100 max-md:mt-9 max-md:max-w-full">
                <div className="flex overflow-hidden flex-col justify-center items-start px-6 py-3 w-full text-sm font-bold whitespace-nowrap border-b border-solid border-b-zinc-100 text-slate-600 max-md:px-5 max-md:max-w-full">
                    <div className="flex gap-2 items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9903 2.5C12.9108 2.5001 13.704 2.97412 14.1348 3.73633L14.212 3.87305L14.3546 3.94141C16.1781 4.81197 17.4405 6.67115 17.4405 8.82031V11.3496C17.4405 11.6164 17.4988 11.9419 17.5782 12.2354C17.638 12.4563 17.7168 12.6872 17.8087 12.8877L17.9053 13.0771L17.9122 13.0879L18.9122 14.748L18.9131 14.75C19.2234 15.2591 19.2776 15.8582 19.0723 16.4033C18.89 16.8871 18.5394 17.2677 18.085 17.4766L17.8839 17.5547L17.8809 17.5557C15.994 18.1879 14.0075 18.5 12.0196 18.5C10.156 18.5 8.29464 18.2259 6.51569 17.6631L6.16119 17.5469L6.16022 17.5459L5.93658 17.458C5.50806 17.2634 5.1846 16.9584 5.00104 16.5967L4.92096 16.4111L4.91901 16.4072L4.85944 16.209C4.74691 15.7403 4.8281 15.2335 5.11725 14.748L5.11823 14.749L6.12799 13.0791L6.1319 13.0723C6.2675 12.8398 6.3813 12.5284 6.461 12.2354C6.5406 11.9426 6.59967 11.6165 6.59967 11.3496V8.82031C6.59967 6.83191 7.68468 5.0887 9.29401 4.14551L9.62311 3.96777L9.7608 3.89844L9.836 3.76367C10.2689 2.98954 11.084 2.5 11.9903 2.5Z" fill="#365D8D" stroke="#365D8D" />
                            <path d="M10.2464 20.627V20.6279C10.8282 20.679 11.4229 20.71 12.0198 20.71C12.4604 20.71 12.8998 20.6924 13.3333 20.6621L13.764 20.6279H13.7679C13.8102 20.6239 13.8569 20.6192 13.9066 20.6152C13.4454 21.1563 12.7619 21.4999 12.0003 21.5C11.3414 21.5 10.6922 21.2318 10.2396 20.7627L10.222 20.7451L10.1302 20.6523C10.1183 20.6395 10.1076 20.6255 10.096 20.6123C10.146 20.6172 10.1961 20.6227 10.2464 20.627Z" stroke="#365D8D" />
                        </svg>
                        <div className="self-stretch my-auto text-slate-600">
                            {t("head2")}
                        </div>
                    </div>
                </div>
                {notifications?.data?.length === 0 ? <h3 className='ps-5 pt-5'>{t("noNotification")}</h3> : ""}

                <ul className="divide-y divide-zinc-100">
                    {notifications?.data.map((notification: Notification) => (
                        // {notifs.map((n) => (
                        <li key={notification.id} className={` px-4 ${notification.is_read ? "bg-white hover:bg-blue-50" : "bg-blue-50 hover:bg-white"}    transition-all duration-300`}>
                            <div
                                // href={"notifHref(n, language)"}
                                onClick={async () => {
                                    // optimistic mark read on click
                                    if (!notification.is_read) {
                                        // setNotifs((arr) =>
                                        //   arr.map((x) => (x.id === n.id ? { ...x, is_read: true } : x))
                                        // );
                                        makeNotificationRead(notification);
                                    }
                                    if (notification.target_type === "INSTITUTE") {
                                        router.push(`/${language}/language-schools/${notification.target_id}/${notification.branch_id}`);
                                    } else if (notification.target_type === "UNIVERSITY") {
                                        router.push(`/${language}/university/${notification.target_id}`);
                                    }
                                }}
                                className="block cursor-pointer py-4 border-b border-gray"
                                role="menuitem"
                            >
                                <div className="flex gap-3 items-baseline">
                                    {/* dot for unread */}
                                    <span
                                        className={`mt-1 inline-block h-2 w-2 rounded-full flex-shrink-0 ${notification.is_read ? "bg-transparent" : "bg-primary"
                                            }`}
                                        aria-hidden="true"
                                    />
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p
                                                className={`text-sm ${notification.is_read
                                                    ? "font-medium text-zinc-800"
                                                    : "font-semibold text-zinc-900"
                                                    }`}
                                            >
                                                {notification.title}
                                            </p>
                                            <span className="text-[11px] text-zinc-500">
                                                {timeAgo(notification.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-zinc-600 ">{notification.message}</p>
                                        {/* <hr /> */}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {notifications?.data?.length > 0 && (
                    <div className="flex flex-col md:flex-row gap-5 justify-between items-center my-5 w-full px-4">
                        <div>
                            <Pagination
                            language={language}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                disableNext={!hasMoreData}
                                numberOfPages={notifications?.pages}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 items-center text-sm leading-none text-zinc-900">
                            <div className="self-stretch my-auto text-zinc-900 line-clamp-1 leading-6">
                                {u("pagination")}
                            </div>
                            <div>
                                <select
                                    name=""
                                    id=""
                                    value={limit}
                                    onChange={(e: any) => {
                                        setLimit(e.target.value);
                                        setCurrentPage(1);
                                        dispatch(getAllNotifications({ page: currentPage, limit: e.target.value, language }));
                                        // console.log("searchValue", selectedValue);
                                        // scrollToTop();
                                        // dispatch(getAllUniversities({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, majors: selectedMajors?.id, fields: selectedFields?.id, page: 1, limit: e.target.value, language, recommended }));
                                    }}
                                    className="flex gap-2 justify-center items-center px-2 py-1 my-auto bg-white rounded border border-gray"
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )
                }

            </div>
        </div>
    )
}

export default NewNotifications
