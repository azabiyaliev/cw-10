import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../../../axiosAPI.ts';
import {INews} from "../../../../types";


export const fetchNews = createAsyncThunk<INews[], void>(
    "news/fetchNews",
    async () => {
        const response = await axiosAPI.get<INews[]>("/news");
        return response.data || [];
    });