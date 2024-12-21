import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import {IComment } from "../../../types";
import {fetchComments, fetchDeleteComment, fetchPostComment} from "../store/thunks/thunks.ts";

interface commentsState {
    responseComments: IComment[];
    isFetching: boolean;
    isLoading: boolean;
}

const initialState: commentsState = {
    responseComments: [],
    isFetching: false,
    isLoading: false,
};

export const resCommentsList = (state: RootState) => state.comments.responseComments;
export const fetchLoading = (state: RootState) => state.comments.isFetching;
export const createLoading = (state: RootState) => state.comments.isLoading;

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers:{
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchComments.fulfilled, (state, action: PayloadAction<IComment[]>) => {
                state.isFetching = false;
                state.responseComments = action.payload;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.isFetching = false;
            })
            .addCase(fetchDeleteComment.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(fetchDeleteComment.rejected, (state) => {
                state.isFetching = false;
            })
            .addCase(fetchDeleteComment.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchPostComment.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(fetchPostComment.rejected, (state) => {
                state.isFetching = false;
            })
            .addCase(fetchPostComment.pending, (state) => {
                state.isFetching = true;
            })
    },
});

export const commentsReducer = commentsSlice.reducer;
