import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";


export const getAllLanguageSchools = createAsyncThunk("languageSchoolsSlice/fetchLanguageSchools", async (Parameter: any) => {
  const { tokenMainSite } = parseCookies();
  const { page, search, country, state, city, studyLanguage, language, recommended, limt, userId, languageStudy, rating } = Parameter;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/institutes?limit=${limt || "10"}&page=${page || "1"}${recommended == "true" ? `&recommend=${recommended}` : ""}&search=${search || ""}&country_id=${country || ""}&state_id=${state || ""}&city_id=${city || ""}${languageStudy ? `&language_id=${languageStudy}` : ""}${userId ? `&user_id=${userId}` : ""}${rating ? `&rating=${rating}` : ""}&status=active`,
    {
      method: 'GET',
      headers: {
        "Accept-Language": language,
        Authorization: `Bearer ${tokenMainSite || ""}`
      },
    })
  const result = await res.json();
  return result;

})



const languageSchoolsSlice = createSlice({
  initialState: {},
  name: "languageSchoolsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLanguageSchools.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getAllLanguageSchools.fulfilled, (state: any, action) => {
        state.loading = false;
        state.languageSchools = action.payload;
      })
      .addCase(getAllLanguageSchools.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
})

export const { } = languageSchoolsSlice.actions;
export default languageSchoolsSlice.reducer;