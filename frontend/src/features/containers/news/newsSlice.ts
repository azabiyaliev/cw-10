import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import {INews} from "../../../types";
import {fetchNews} from "../store/thunks/thunks.ts";

interface noteState {
    responseNews: INews[];
    isFetching: boolean;
    isLoading: boolean;
}

const initialState: noteState = {
    responseNews: [],
    isFetching: false,
    isLoading: false,
};

export const resNewsList = (state: RootState) => state.news.responseNews;
export const fetchLoading = (state: RootState) => state.news.isFetching;
export const createLoading = (state: RootState) => state.news.isLoading;

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers:{
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<INews[]>) => {
                state.isFetching = false;
                state.responseNews = action.payload;
            })
            .addCase(fetchNews.rejected, (state) => {
                state.isFetching = false;
            })
    },

});

export const newsReducer = newsSlice.reducer;
