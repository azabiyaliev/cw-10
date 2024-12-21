import express from "express";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader} from "mysql2";
import {imagesUpload} from "../multer";
import {News, NewstWithoutIdAndDate} from "../types";
const newsRouter = express.Router();


newsRouter.post("/", imagesUpload.single("image"), async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400).send({error: "Title, content is required"});
        return;
    }

    const news: NewstWithoutIdAndDate = {
        title: req.body.title,
        content: req.body.content,
        image: req.file ? "images" + req.file.filename : null,
    }

    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query("INSERT INTO news (title, content, image) VALUES (?, ?, ?)",
        [news.title, news.content, news.image]);

    const resultHeader = result as ResultSetHeader;

    const [resultSubject] = await connection.query('SELECT * FROM news WHERE id = ?', [resultHeader.insertId]);
    const oneNews = resultSubject as News[];

    if (oneNews.length === 0) {
        res.status(404).send("News not found");
    } else {
        res.send(oneNews[0]);
    }
})

newsRouter.get("/", async (_req, res, next) => {
    try {
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT * FROM news');
        const news = result as News[];
        res.send(news);
    } catch (e) {
        next(e);
    }
});

newsRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM news WHERE id = ?', [id]);
    const news = result as News[];
    if (news.length === 0) {
        res.status(404).send(`No news found with this ${id}`);
    } else {
        res.status(200).send(news[0]);
    }
})


newsRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query("DELETE FROM news WHERE id = ?", [id]);
    res.status(200).send("Entity successfully deleted");
})

export default newsRouter;