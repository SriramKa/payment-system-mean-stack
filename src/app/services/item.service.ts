import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../interfaces/Item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl: string = 'http://localhost:8080/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }
}
