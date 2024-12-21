import { configureStore } from "@reduxjs/toolkit";
import {newsReducer} from "../features/containers/news/newsSlice.ts";
import {commentsReducer} from "../features/containers/readPost/readPostSlice.ts";

export const store = configureStore({
  reducer:{
    news: newsReducer,
    comments: commentsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;