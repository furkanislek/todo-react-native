import { configureStore } from "@reduxjs/toolkit";
import siteReducer from "./SiteSlicer";

export default configureStore({
  reducer: {
    site: siteReducer,
  },
});
