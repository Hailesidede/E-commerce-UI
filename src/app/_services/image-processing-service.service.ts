import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { FileHandler } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingServiceService {

  constructor(private sanitizer : DomSanitizer) { }

  public createImages(product: Product){
    const productImages : any[] = product.productImages;

    const productImagesToFileHandle : FileHandler [] = [];

    for(let i = 0; i < productImages.length;i++){
      const imageFileData = productImages[i];
      const imageBlob = this.dataURItoBLOB(imageFileData.picByte,imageFileData.type);

      const imageFile = new File([imageBlob],imageFileData.name,{type: imageFileData.type});

      const finalFileHandle : FileHandler = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      productImagesToFileHandle.push(finalFileHandle);
    }
    product.productImages = productImagesToFileHandle;
    return product;
  }

  public dataURItoBLOB(picByte:any, imageType: any){

    const byteString = window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length;i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array],{type: imageType});
    return blob;

  }
}
