import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";


export const getAllPrograms = createAsyncThunk("programsSlice/fetchLanguageSchools", async (Parameter: any) => {
    const { search, sortOrder, state, city, majors, fields, language, recommended, limt, universityId, course_language, field_id, academic_degree, userId, page } = Parameter;
    const { tokenMainSite } = parseCookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/programs?limit=${limt || ""}&page=${page || "1"}&university_id=${universityId || ""}&course_language=${course_language || ""}&academic_degree=${academic_degree || ""}${search ? `&searchTerm=${search}` : ""}&status=active`, {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/programs?limit=${limt || ""}&page=${page || "1"}&university_id=${universityId || ""}&course_language=${course_language || ""}&field_id=${field_id || ""}${sortOrder ? `&sortBy=price&sortOrder=${sortOrder}` : ""}&academic_degree=${academic_degree || ""}${userId ? `&user_id=${userId}` : ""}&status=active`, {
        method: 'GET',
        headers: {
            "Accept-Language": language,
            Authorization: `Bearer ${tokenMainSite}`
        },
    })
    const result = await res.json();
    // console.log("institutes", result);
    return result;
})


const programsSlice = createSlice({
    name: "programsSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPrograms.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllPrograms.fulfilled, (state: any, action) => {
                state.loading = false;
                state.programs = action.payload;
            })
            .addCase(getAllPrograms.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export const { } = programsSlice.actions;
export default programsSlice.reducer;