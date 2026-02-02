
export interface User {
    id: number;
    is_read: boolean;
    message: string;
    target_id: number;
    target_type: string;
    title: string;
    user_id: number;
    branch_id: number;
    created_at: string;
    avatar: string;
    name: string;
    first_name: string;
    last_name: string;
}

// export interface UsersResponse {
//     data: User[];
//     meta?: {
//         page: number;
//         limit: number;
//         total: number;
//     };
// }