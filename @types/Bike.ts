export interface Bike {
    id: number;
    model: string;
    name: string;
    price: number; // $/day
    color: string;
    image: string;
    location: string;  // city
    rating: number;
    ratingCount: number;
    createBy: string // Manager id
}