import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { throwError } from 'rxjs';

export class ErrorHandler {
  static handleError(error: any) {
    console.error('Error occurred:', error);
    // Use throwError to return an observable that emits an error
    return throwError(error); // This replaces Observable.throw(error)
  }
}
