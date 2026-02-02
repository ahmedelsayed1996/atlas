import { RootState } from "@/app/store";

export const selectMajors = (state: RootState) =>
    state.majors;
