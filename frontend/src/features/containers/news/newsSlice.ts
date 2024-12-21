import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import {INews} from "../../../types";
import {fetchDeleteNews, fetchNews, fetchNewsById, fetchPostNews} from "../store/thunks/thunks.ts";

interface newsState {
    responseNews: INews[];
    responseNewsById: INews | null;
    isFetching: boolean;
    isLoading: boolean;
}

const initialState: newsState = {
    responseNews: [],
    responseNewsById: null,
    isFetching: false,
    isLoading: false,
};

export const resNewsList = (state: RootState) => state.news.responseNews;
export const resOneNews = (state: RootState) => state.news.responseNewsById
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
            .addCase(fetchPostNews.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchPostNews.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(fetchPostNews.rejected, (state) => {
                state.isFetching = false;
            })
            .addCase(fetchDeleteNews.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchDeleteNews.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(fetchDeleteNews.rejected, (state) => {
                state.isFetching = false;
            })
            .addCase(fetchNewsById.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchNewsById.fulfilled, (state, action: PayloadAction<INews>) => {
                state.isFetching = false;
                state.responseNewsById = action.payload;
            })
            .addCase(fetchNewsById.rejected, (state) => {
                state.isFetching = false;
            })
    },

});

export const newsReducer = newsSlice.reducer;
