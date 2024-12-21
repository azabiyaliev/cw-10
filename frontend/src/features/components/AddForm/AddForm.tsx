import React, {useState} from "react";
import { INewsWithoutIdAndDate} from "../../../types";
import {useAppDispatch} from "../../../app/hooks.ts";
import {Box, Button, TextField} from "@mui/material";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import {fetchNews, fetchPostNews} from "../../containers/store/thunks/thunks.ts";
import {toast} from "react-toastify";


const initialForm = {
    title: "",
    content: "",
    image: null,
};

const AddForm = () => {

    const [form, setForm] = useState<INewsWithoutIdAndDate>({ ...initialForm });

    const dispatch = useAppDispatch();

    const onChangeField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        if (files) {
            setForm((prevState) => ({
                ...prevState,
                [name]: files[0] ? files[0] : null,
            }))
        }
        console.log(files);
        console.log(form)
    };

    const submitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(form.title.trim().length === 0 || form.content.trim().length === 0) {
                toast.error("Fill in title, content field");
                setForm(initialForm);
            } else {
                await dispatch(fetchPostNews({...form}));
                toast.success('Post successfully added');
                setForm(initialForm);
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
                    mt: 10,
                    py: 3,
                    display: 'grid',
                    gap: 2,
                    flexWrap: 'wrap',
                    width: '100%',
                }}
            >
                <TextField
                    sx={{mx: 'auto', width: "50%"}}
                    type="text"
                    id="outlined-basic"
                    label="Title"
                    name="title"
                    value={form.title}
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
                    <Box sx={{mx: 'auto', width: "50%"}}>
                        <FileInput name="image" label="Image" onGetFile={fileEventChangeHandler}/>
                    </Box>
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

export default AddForm;