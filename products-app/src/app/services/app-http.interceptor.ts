import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AppStateService } from './app-state.service';
import { LoadingService } from './loading.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appState : AppStateService, private loadingS : LoadingService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingS.showLoading();

    let req = request.clone({
      headers : request.headers.set('Authorization','Bearer JWT')
    });
    return next.handle(req).pipe(
      finalize(()=>{
        //this.appState.setProductsState({
         // status : "LOADED",

         this.loadingS.hideLoading();
        
      })
    );
  }
}
