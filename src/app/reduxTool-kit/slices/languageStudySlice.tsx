import { LanguageStudy } from "@/app/types/languageStudy";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type Param = {
    language: string
}
export const getLanguageStudy = createAsyncThunk("languageStudySlice/fetchLanguageStudy", async (parameter: Param) => {
    const { language } = parameter;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/language`, {
        method: 'GET',
        headers: {
            "Accept-Language": language,
        },
    });
    const result = await res.json();
    return result?.data;
})

interface LanguageStudyState {
    languageStudy: LanguageStudy[];
    loading: boolean;
    error: string | null;
}

const initialState: LanguageStudyState = {
    languageStudy: [],
    loading: false,
    error: null,
};


const languageStudySlice = createSlice({
    name: "languageStudySlice",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getLanguageStudy.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getLanguageStudy.fulfilled, (state: any, action) => {
                state.loading = false;
                state.languageStudy = action.payload;
            }).addCase(getLanguageStudy.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
})

export const { } = languageStudySlice.actions;
export default languageStudySlice.reducer;