// notifications.selectors.ts
import { RootState } from "@/app/store";

export const selectNotificationsState = (state: RootState) =>
    state.notifications;

export const selectNotificationsData = (state: RootState) =>
    state.notifications.notifications;

export const selectNotificationsLoading = (state: RootState) =>
    state.notifications.isLoading;
