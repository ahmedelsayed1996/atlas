import { RootState } from "@/app/store";

export const selectCurrentUser = (state: RootState) =>
  state.displayUser.user;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.displayUser.user);
