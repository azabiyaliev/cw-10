import express from "express";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader} from "mysql2";
import {Comment, CommentWithoutId,} from "../types";
const commentsRouter = express.Router();

commentsRouter.post("/", async (req, res) => {
    if (!req.body.news_id || !req.body.content) {
        res.status(400).send({error: "News_id, content is required"});
        return;
    }
    const comment: CommentWithoutId = {
        news_id: req.body.news_id,
        author: req.body.author || null,
        content: req.body.content,
    }
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('INSERT INTO comments (news_id, author, content) VALUES (?, ?, ?)',
        [comment.news_id, comment.author || "Anonymous", comment.content]);

    const resultHeader = result as ResultSetHeader;

    const [resultComment] = await connection.query('SELECT * FROM comments WHERE id = ?', [resultHeader.insertId]);
    const oneComment = resultComment as Comment[];

    if (oneComment.length === 0) {
        res.status(404).send("Comment not found");
    } else {
        res.send(oneComment[0]);
    }
})

commentsRouter.get("/", async (req, res, next) => {
    try {
        const idQuery = req.query.news_id as string;
        const connection = await mysqlDb.getConnection();
        if(idQuery){
            const [result] = await connection.query('SELECT * FROM comments where news_id = ?', [idQuery]);
            const comment = result as Comment[];
            if (comment.length === 0) {
                res.status(400).send("Comment not found");
            } else {
                res.status(200).send(comment);
            }
        } else {
            const [result] = await connection.query('SELECT * FROM comments');
            const comment = result as Comment[];
            res.send(comment);
        }
    } catch (e) {
        next(e);
    }
});

commentsRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query("DELETE FROM comments WHERE id = ?", [id]);
    res.status(200).send("Entity successfully deleted");
})

export default commentsRouter;