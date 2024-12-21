
export interface INewsWithoutIdAndDate {
    title: string;
    content: string;
    image: File | null;
}

export interface INews {
    id: number;
    title: string;
    content: string;
    image: string | null;
    date: string;
}

export interface ICommentWithoutId {
    news_id: string;
    author: string;
    content: string;
}

export interface IComment {
    id: string;
    news_id: string;
    author: string;
    content: string;
}