import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandler } from './_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<FileHandler> = new EventEmitter();

  @HostBinding("style.background") private background = "#eee";

  constructor(private sanitizer : DomSanitizer) { }


  @HostListener("dragover",["$event"])
  public onDragOver(evt : DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";


  }


  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";

  }

  @HostListener("drop", ["$event"])
  public onDrop(evt : DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";

    let fileHandle : FileHandler | null = null;;

    if (evt.dataTransfer && evt.dataTransfer.files.length > 0) {
      const file = evt.dataTransfer.files[0];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      fileHandle = {
        file,
        url
      };
    }
  
    if (fileHandle !== null) {
      this.files.emit(fileHandle);
    }
  

  }

}
