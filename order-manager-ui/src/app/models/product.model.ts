export interface Product {
    id: number;
    name: string;
    supplierId: number;
    categoryId: number;
    unit: number;
    price: number;
}

export interface ProductDtoGetDdl {
    id: number;
    name: string;
    price: number;
}