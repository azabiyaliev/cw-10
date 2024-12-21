import React, {useState} from "react";
import {ICommentWithoutId} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {toast} from "react-toastify";
import { fetchNews, fetchNewsById, fetchPostComment} from "../../containers/store/thunks/thunks.ts";
import {Box, Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { resOneNews} from "../../containers/news/newsSlice.ts";

const initialForm = {
    news_id: "",
    author: "",
    content: "",
};

interface IProps {
    id: string;
}

const AddFormComments: React.FC<IProps> = ({id}) => {

    const [form, setForm] = useState<ICommentWithoutId>({ ...initialForm });
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const comments = useAppSelector(resOneNews);
    console.log(comments);

    const onChangeField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(fetchNewsById(Number(id)));
            if(form.content.trim().length === 0) {
                toast.error("Fill in news_id, content field");
                setForm(initialForm);
            } else {
                await dispatch(fetchPostComment({...form}));
                toast.success('Comment successfully added');
                navigate("/");
            }
        } catch (e) {
            console.log(e);
        } finally {
            await dispatch(fetchNews());
        }
    };

    return (
        <form onSubmit={submitForm}>
            <Box
                sx={{
                    mt: 2,
                    py: 3,
                    display: 'grid',
                    gap: 2,
                    flexWrap: 'wrap',
                    width: '100%',
                }}
            >
                <TextField
                    sx={{mx: 'auto', width: "50%", display: "none"}}
                    type="text"
                    id="outlined-basic"
                    label="News_id"
                    name="news_id"
                    defaultValue={comments.id}
                    onChange={onChangeField}
                    variant="outlined"
                />
                <TextField
                    sx={{mx: 'auto', width: "50%"}}
                    type="text"
                    id="outlined-basic"
                    label="Author"
                    name="author"
                    value={form.author}
                    onChange={onChangeField}
                    variant="outlined"
                />
                <Box
                    sx={{
                        display: 'grid',
                        gap: 2,
                        width: '100%',
                    }}
                >
                    <TextField
                        sx={{mx: 'auto', width: "50%"}}
                        type="text"
                        id="outlined-basic"
                        label="Content"
                        name="content"
                        value={form.content}
                        onChange={onChangeField}
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        sx={{mx: 'auto', width: "50%"}}
                        color="primary"
                        variant="outlined"
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default AddFormComments;