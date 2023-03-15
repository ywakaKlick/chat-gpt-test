import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Favorite } from '../model/favorite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) { }

  async get_favorites() {
    try {
      const url = `${environment.api}/favorite`
      return await this.http.get<Favorite[]>(url).pipe(take(1)).toPromise();
    } catch (e) {
      throw e;
    }
  }

  async save_favorite(question: string, response: string) {
    try {
      const url = `${environment.api}/favorite/save`
      const body = { question: question, response: response }
      return await this.http.post(url, body, { responseType: 'text' }).pipe(take(1)).toPromise();
    } catch (e) {
      throw e;
    }
  }

  async delete_favorite(id: number) {
    try {
      const url = `${environment.api}/favorite/delete/${id}`
      return await this.http.delete(url, { responseType: 'text' }).pipe(take(1)).toPromise();
    } catch (e) {
      throw e;
    }
  }

  async export_favorites() {
    try {
      const url = `${environment.api}/favorite/export`
      return await this.http.get(url, { responseType: 'blob' }).pipe(take(1)).toPromise();
    } catch (e) {
      throw e;
    }
  }
}
