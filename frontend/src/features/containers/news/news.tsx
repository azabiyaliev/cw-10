import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {resNewsList} from "./newsSlice.ts";
import {useEffect} from "react";
import {fetchDeleteNews, fetchNews} from "../store/thunks/thunks.ts";
import {Box, Button, Card, CardContent, CardMedia, Container, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {apiUrl} from "../../../globalConstants.ts";
import dayjs from 'dayjs'
import {NavLink} from "react-router-dom";

const News = () => {

    const dispatch = useAppDispatch();
    const news = useAppSelector(resNewsList);
    console.log(news)

    useEffect(() => {
        dispatch(fetchNews());
    },[dispatch])

    const onDelete = async (id: number) => {
        await dispatch(fetchDeleteNews(id));
        await dispatch(fetchNews());
    }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} sx={{mt: 2}}>
                <Typography variant="h4"  sx={{ textDecoration: 'none', color:"primary", flexGrow: 1 }}>
                    Posts
                </Typography>
                <Button variant="outlined" sx={{ color: "primary", ms: "auto" }} to="/add" component={NavLink}>Add new post</Button>
            </Grid>
            {news.map(n => (
                <div key={n.id}>
                    <Card sx={{ maxWidth: "80%", boxShadow: 4, mx: "auto", mt: 4}}>
                        {!n.image ? null : (
                            <CardMedia
                                sx={{ height: 140 }}
                                component="img"
                                image={`${apiUrl}/${n.image}`}
                            />
                        )}
                        <CardContent sx={{ padding: '10px', gridRow: '1rem, 1rem' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {n.title}
                            </Typography>
                            <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                                <Typography sx={{ flexGrow: 1 }}>
                                    {dayjs(n.date).format('D MMMM YYYY, HH:mm')}
                                </Typography>
                                <Button to={`/news/${n.id}`} component={NavLink}>Read full post</Button>
                                <Button onClick={() => onDelete(n.id)}>Delete</Button>
                            </Box>
                        </CardContent>
                        <CardContent>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </Container>
    );
};

export default News;