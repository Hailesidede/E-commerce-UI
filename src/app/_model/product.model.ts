import { FileHandler } from "./file-handle.model"

export interface Product{
    productId : any,
    productName: string,
    productDescription: string,
    productDiscountedPrice: number,
    productActualPrice: number
    productImages: FileHandler[]
}