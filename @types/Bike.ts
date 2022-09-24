export interface Bike {
    id: number;
    model: string;
    name: string;
    price: number; // $/day
    color: string;
    image: string;
    location: string;  // city name
    rating: number; // 0-5
    ratingCount: number;
    createBy: string // Manager id
}