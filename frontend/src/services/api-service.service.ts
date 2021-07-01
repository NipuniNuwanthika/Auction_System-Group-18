import { Injectable } from '@angular/core';
import { URL_CONFIG } from '../../config/urlConfig';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { JwtService } from './jwt-service.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  errorMsg = "You don't have permission for this";

  constructor(private http: Http,
    private httpClient: HttpClient,
    private jwtService: JwtService,
  ) { }

  /**
   * Setting Headers for API Request
   */
  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
      headersConfig['user_id'] = `${window.localStorage.getItem('med_center')}`;
    }
    return new Headers(headersConfig);
  }

  
  get(path: string): Observable<any> {
    return this.http.get(`${URL_CONFIG.API_URL}${path}`, { headers: this.setHeaders() })
      .pipe(catchError((error) => {
        throw (error.json())
      }),
        map((res: Response) => res.json()));
  }

  
  getParams(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${URL_CONFIG.API_URL}${path}`, { headers: this.setHeaders(), search: params })
      .pipe(catchError((error) => {
        throw (error.json())
      }),
        map((res: Response) => res.json()));
  }

  
  put(path: string, body): Observable<any> {
    return this.http.put(
      `${URL_CONFIG.API_URL}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(catchError((error) => {
      throw (error.json())
    }),
      map((res: Response) => res.json()));
  }

  
  post(path, body): Observable<any> {
    return this.http.post(
      `${URL_CONFIG.API_URL}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .pipe(catchError((error) => {
        throw (error.json())
      }),
        map((res: Response) => res.json()));
  }

  
  delete(path): Observable<any> {
    return this.http.delete(
      `${URL_CONFIG.API_URL}${path}`,
      { headers: this.setHeaders() }
    )
      .pipe(catchError((error) => {
        throw (error.json())
      }),
        map((res: Response) => res.json()));
  }

  postFormData(path, formData): Observable<any> {
    return this.httpClient.post(
      `${URL_CONFIG.API_URL}${path}`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    )
      .pipe(map((event) => {
        return event;
      }))
  }

}
