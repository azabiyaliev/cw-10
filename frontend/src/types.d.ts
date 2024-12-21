export interface INews {
    id: string;
    title: string;
    content: string;
    image: string | null;
    date: string;
}

export type INewstWithoutIdAndDate = Omit<News, "id", "date">