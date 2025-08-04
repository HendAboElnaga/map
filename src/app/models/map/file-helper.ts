import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class FileHelper {
    constructor() { }

    downloadFile(blob: any, filename: string) {
        debugger
        const a = this.createFile(blob);
        a.download = filename;
        a.click();
        document.body.removeChild(a);
    }

    printFile(blob: Blob) {
        const a = this.createFile(blob);
        a.target = "_blank";
        a.click();
        document.body.removeChild(a);
    }

    createFile(blob: any): HTMLAnchorElement {
        const url = window.URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);
        a.href = url;
        return a;
    }

    handleError(x: any) {
        let errorMessage: string;
        if (x.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${x.error.message}`;
        } else {
            errorMessage = `Backend returned code ${x.status}: ${x.body.error}`;
        }
        console.error(x);
        return throwError(errorMessage);
    }
}