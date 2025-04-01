import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';


export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {  

  const loadingService = inject(LoadingService);
  
  setTimeout(() => { loadingService.show() }, 20);

  return next(req).pipe(finalize(() => {
    setTimeout(() => { loadingService.hide() }, 2000);
  })
);

}


    
