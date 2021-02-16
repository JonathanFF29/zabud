import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  public getList() {
    return this.http.get(
      'https://jsonplaceholder.typicode.com/photos'
    );
  }

  public saveItem(data){
    return this.http.post('https://jsonplaceholder.typicode.com/photos', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
      observe: 'body',
      params: {
        data
      }
    });
  }

  public deleteItem(id){
    return  this.http.delete('https://jsonplaceholder.typicode.com/photos/' + id)
  }



}
