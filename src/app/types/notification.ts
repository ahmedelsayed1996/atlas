// export interface Notification {

//     id: number,
//     user_id: number,
//     target_id: number,
//     target_type: string,
//     branch_id: null,
//     title: string,
//     message: string,
//     is_read: boolean,
//     created_at: string,
//     updated_at: string
// }
// types/notification.ts
export interface Notification {
    id: number;
    is_read: boolean;
    message: string;
    target_id: number;
    target_type: string;
    title: string;
    user_id: number;
    branch_id: number;
    created_at: string;
}

export interface NotificationsResponse {
    data: Notification[];
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
}
