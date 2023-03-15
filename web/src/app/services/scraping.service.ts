import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {

  constructor(private http: HttpClient) { }

  async export_careers_open_ai(type: string) {
    try {
      const url = `${environment.api}/export`
      let params = new HttpParams();
      params = params.append('type', type);
      return await this.http.get(url, { params: params, responseType: 'blob' }).pipe(take(1)).toPromise();
    } catch (e) {
      throw e;
    }
  }
}
