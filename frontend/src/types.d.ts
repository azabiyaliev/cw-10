
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