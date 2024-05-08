import { createSlice } from "@reduxjs/toolkit";

export const site = createSlice({
  name: "siteSettings",
  initialState: {
    dark: true,
    language: true,
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.dark = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setDarkMode, setLanguage } = site.actions;
export default site.reducer;
