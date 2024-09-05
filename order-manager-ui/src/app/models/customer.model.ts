export interface Customer{
    id: number;
    name: string;
    contact: string;
    address: string;
    city: string;
    country: string;
    postcode: number;
}

export interface CustomerDtoGetDdl{
    id: number;
    name: string;
}