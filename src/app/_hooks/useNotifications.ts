import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getAllNotifications } from "@/app/reduxTool-kit/slices/notificationsSlice";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { selectNotificationsData, selectNotificationsLoading } from "../reduxTool-kit/selectors/notificationsSelector";


export type Notification = {
    id: number;
    is_read: boolean;
    title: string;
    message: string;
    target_id: number;
    target_type: string;
    branch_id: number;
    created_at: string;
};

export function useNotifications(language: string) {
    const dispatch = useDispatch<AppDispatch>();
    
    const notifications = useSelector(selectNotificationsData);
    const isLoading = useSelector(selectNotificationsLoading);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const bellRef = useRef<HTMLDivElement | null>(null);
    const { tokenMainSite } = parseCookies();


    // ======================
    // Fetch unread count
    // ======================
    const fetchUnreadCount = useCallback(async () => {
        if (!tokenMainSite) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/unread/count`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${tokenMainSite}`,
                        "Accept-Language": language,
                    },
                }
            );

            if (!res.ok) return;
            const data = await res.json();
            setUnreadCount(data.unreadCount ?? 0);
        } catch {
            setUnreadCount(0);
        }
    }, [tokenMainSite, language]);

    // ======================
    // Load notifications
    // ======================
    const loadNotifications = useCallback(() => {
        if (!tokenMainSite) return;
        dispatch(getAllNotifications({ page: 1, limit: 10, language: language }));
    }, [dispatch, tokenMainSite, language]);

    // ======================
    // Mark all read
    // ======================
    const markAllRead = useCallback(async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/read-all`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${tokenMainSite}`,
                    },
                }
            );

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            }

            toast.success("All notifications marked as read");
            setUnreadCount(0);
            setIsOpen(false);
            loadNotifications();
        } catch {
            toast.error("Something went wrong");
        }
    }, [tokenMainSite, loadNotifications]);

    // ======================
    // Mark one read
    // ======================
    const markOneRead = useCallback(
        async (notification: Notification) => {
            try {
                await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/make-read/${notification.id}`,
                    {
                        method: "PATCH",
                        headers: {
                            Authorization: `Bearer ${tokenMainSite}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ is_read: true }),
                    }
                );

                loadNotifications();
                fetchUnreadCount();
            } catch {
                toast.error("Failed to mark notification");
            }
        },
        [tokenMainSite, loadNotifications, fetchUnreadCount]
    );

    // ======================
    // Auto load when open
    // ======================
    useEffect(() => {
        if (isOpen && !notifications?.data?.length) {
            loadNotifications();
        }
    }, [isOpen, notifications, loadNotifications]);

    // ======================
    // Initial unread count
    // ======================
    useEffect(() => {
        fetchUnreadCount();
    }, [fetchUnreadCount]);

    // ======================
    // Outside click
    // ======================
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return {
        notifications,
        isLoading,
        unreadCount,
        isOpen,
        bellRef,
        toggle: () => setIsOpen((v) => !v),
        close: () => setIsOpen(false),
        markAllRead,
        markOneRead,
    };

}