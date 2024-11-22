export type productResponse = {
    id: number;
    name: string;
    image: string;
    category: string;
    amountOfSugar: number;
}

export type createProductRequest = {
    name: string;
    image: string;
    category: string;
    amountOfSugar: number;  
}