import { RootState } from "@/app/store";

export const selectCities = (state: RootState) =>
    state.cities;
