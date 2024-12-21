import { useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {resOneNews} from "../news/newsSlice.ts";
import {useEffect} from "react";
import {fetchComments, fetchDeleteComment, fetchNewsById} from "../store/thunks/thunks.ts";
import {Box, Button, Card, CardContent, CardMedia, Container, Typography} from "@mui/material";
import dayjs from 'dayjs'
import {apiUrl} from "../../../globalConstants.ts";
import {resCommentsList} from "./readPostSlice.ts";
import AddFormComments from "../../components/AddForm/AddFormComments.tsx";


const ReadPost = () => {

    const params = useParams<{ idNews: string }>();

    const dispatch = useAppDispatch();
    const oneNews = useAppSelector(resOneNews);
    const comments = useAppSelector(resCommentsList);
    console.log(oneNews)
    console.log(comments)


    useEffect(() => {
        dispatch(fetchNewsById(Number(params.idNews)));
        dispatch(fetchComments(Number(params.idNews)));
    },[dispatch, params.idNews]);

    const onDelete = async (id: number) => {
        await dispatch(fetchDeleteComment(id));
        await dispatch(fetchComments(Number(params.idNews)));
    }

    return (
        <Container maxWidth="xl">
            {oneNews ? (
                <Card sx={{ maxWidth: "80%", boxShadow: 4, mx: "auto", mt: 4}}>
                    {!oneNews.image ? null : (
                        <CardMedia
                            sx={{ height: 140 }}
                            component="img"
                            image={`${apiUrl}/${oneNews.image}`}
                        />
                    )}
                    <CardContent sx={{ padding: '10px', gridRow: '1rem, 1rem' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {oneNews.title}
                        </Typography>
                        <Box sx={{display: "flex", justifyContent: 'space-between', flexDirection: "column"}}>
                            <Typography sx={{mb: 2}}>
                                {dayjs(oneNews.date).format('D MMMM YYYY, HH:mm')}
                            </Typography>
                            <Typography>
                                {oneNews.content}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardContent>
                    </CardContent>
                </Card>
            ): null}
            <Typography variant={"h4"} sx={{mt: 4, textAlign: "center"}}>
                Comments
            </Typography>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <Card  sx={{ maxWidth: "60%", boxShadow: 4, mx: "auto", mt: 4}}>
                        <CardContent sx={{ padding: '10px', gridRow: '1rem, 1rem' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {comment.author}
                            </Typography>
                            <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                                <Typography sx={{mb: 2}}>
                                    Wrote: {comment.content}
                                </Typography>
                                <Button onClick={() => onDelete(Number(comment.id))}>Delete</Button>
                            </Box>
                        </CardContent>
                        <CardContent>
                        </CardContent>
                    </Card>
                    <AddFormComments id={comment.news_id} />
                </div>
            ))}
        </Container>
    );
};

export default ReadPost;