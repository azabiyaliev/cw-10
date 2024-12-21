import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../../../axiosAPI.ts';
import {INews, INewsWithoutIdAndDate} from "../../../../types";


export const fetchNews = createAsyncThunk<INews[], void>(
    "news/fetchNews",
    async () => {
        const response = await axiosAPI.get<INews[]>("/news");
        return response.data || [];
    });


export const fetchPostNews = createAsyncThunk<void, INewsWithoutIdAndDate>(
    "postNote/fetchPostNote",
    async (form) => {
        const formData = new FormData();

        const keys = Object.keys(form) as (keyof INewsWithoutIdAndDate)[];

        keys.forEach(key => {
            const value = form[key];

            if (value !== null) {
                formData.append(key, value);
            }
        })

        await axiosAPI.post("/news", formData);
    });

export const fetchDeleteNews = createAsyncThunk<void, number>("deleteNews/fetchDeleteNews", async (news_id) => {
    await axiosAPI.delete(`news/${news_id}`);
});