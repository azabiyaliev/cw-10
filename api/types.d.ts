export interface News {
    id: string;
    title: string;
    content: string;
    image: string | null;
    date: string;
}

export type NewstWithoutIdAndDate = Omit<News, "id", "date">

export interface Comment {
    id: string;
    news_id: string;
    author: string | null;
    content: string;
}

export type CommentWithoutId = Omit<Comment, "id">