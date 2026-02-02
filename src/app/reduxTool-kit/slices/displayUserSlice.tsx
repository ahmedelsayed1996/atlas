// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const displayUser = createAsyncThunk("displayUserSlice/fetchUser", async (parameter : any) => {
//     const { token, locale } = parameter;
//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me-name-avatar`, {
//         method: 'GET',
//         headers: {
//             "Accept-Language": locale,
//             Authorization: `Bearer ${token}`
//         },
//     })
//     const result = await res.json(); 
//     return result;
// })


// const displayUserSlice = createSlice({
//     name: "displayUserSlice",
//     initialState: {},
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(displayUser.fulfilled, (state, action) => {
//             return action.payload;
//         })
//     }
// })

// export const { } = displayUserSlice.actions;
// export default displayUserSlice.reducer;




// Second try

import { User } from "@/app/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";

interface DisplayUserState {
  id: any;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DisplayUserState = {
  user: null,
  id: null,
  isLoading: false,
  error: null,
};
interface FetchUserParams {
  tokenMainSite: string;
  locale: string;
}


export const displayUser = createAsyncThunk<
  User,
  FetchUserParams,
  { rejectValue: string }
>(
  "displayUserSlice/fetchUser",
  async ({ tokenMainSite, locale }, { rejectWithValue }) => {

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me-name-avatar`, {
        method: "GET",
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${tokenMainSite}`,
        },
      });

      if (!res.ok) {
        // const error = await res.json();
        // return rejectWithValue(error);
        destroyCookie(null, "tokenMainSite", { path: "/" });
        return rejectWithValue("Unauthorized");
      }

      const result = await res.json();
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

const displayUserSlice = createSlice({
  name: "displayUserSlice",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      destroyCookie(null, "tokenMainSite", { path: "/" });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(displayUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(displayUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(displayUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload ?? "Error";
      });
  },
  // extraReducers: (builder) => {
  //   builder.addCase(displayUser.fulfilled, (state, action) => {
  //     return action.payload;
  //   });
  //   builder.addCase(displayUser.rejected, (state, action) => {
  //     console.error("Error fetching user data:", action.payload);
  //     destroyCookie(null, 'tokenMainSite', {
  //       path: '/',
  //     });
  //   });
  // },
});

export const { logout } = displayUserSlice.actions;
export default displayUserSlice.reducer;





// Third Try
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const displayUser = createAsyncThunk(
//   "displayUserSlice/fetchUser",
//   async (parameter: any, { rejectWithValue }) => {
//     const { tokenMainSite, locale } = parameter;

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me-name-avatar`, {
//         method: "GET",
//         headers: {
//           "Accept-Language": locale,
//           Authorization: `Bearer ${tokenMainSite}`,
//         },
//       });

//       if (!res.ok) {
//         const error = await res.json();
//         return rejectWithValue(error);
//       }

//       const result = await res.json();
//       return result;
//     } catch (error: any) {
//       return rejectWithValue(error.message || "An error occurred.");
//     }
//   }
// );
// const initialStateData = {
//   id: null,
//   first_name: '',
//   last_name: '',
//   avatar: '',
//   isUserLoaded: false, // ⬅️ نضيف الفلاغ هنا
// };

// const displayUserSlice = createSlice({
//   name: "displayUserSlice",
//   initialState: {
//     initialStateData
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(displayUser.fulfilled, (state, action) => {
//         return {
//           ...state,
//           ...action.payload,
//           isUserLoaded: true, // ⬅️ لما تنجح، نحط الفلاغ
//         };
//       })
//       .addCase(displayUser.rejected, (state) => {
//         return {
//           ...initialStateData,
//           isUserLoaded: true, // ⬅️ حتى لو فشل، نبين إنه حاول تحميل
//         };
//       });
//   }

// });

// export default displayUserSlice.reducer;
