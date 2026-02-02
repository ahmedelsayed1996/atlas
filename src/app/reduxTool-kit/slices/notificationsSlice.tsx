import { NotificationsResponse } from "@/app/types/notification";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";

type Param = {
    page: number,
    limit: number,
    language: string
}
interface DisplayNotificationState {
    notifications: NotificationsResponse | null;
    isLoading: boolean;
    error: string | null;
}
const initialState: DisplayNotificationState = {
    notifications: null,
    isLoading: false,
    error: null,
};
export const getAllNotifications = createAsyncThunk("notificationsSlice/fetchNotifications", async (parameter: Param) => {
    const { page, limit, language } = parameter;
    const { tokenMainSite } = parseCookies();

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            "Accept-Language": language,
            'Authorization': `Bearer ${tokenMainSite}`
        }
    })
    const result = await response.json();
    return result;
})

const notificationsSlice = createSlice({
    name: "notificationsSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllNotifications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notifications = action.payload;
            })
            .addCase(getAllNotifications.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? null;
            });
    },
})

export const { } = notificationsSlice.actions;
export default notificationsSlice.reducer;
