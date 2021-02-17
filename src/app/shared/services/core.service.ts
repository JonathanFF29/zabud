import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Photos } from '../model/photo.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private user = new Photos();
  private itemEdit$ = new BehaviorSubject < Photos > (this.user);
  itemObservable = this.itemEdit$.asObservable();
  private state$: Subject<boolean> = new BehaviorSubject<boolean>(null);
  stateObservable = this.state$.asObservable();
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

  public updateItem(data){
    return this.http.put('https://jsonplaceholder.typicode.com/photos', data, {
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

  public editItemService(data){
    this.state$.next(true);
    this.itemEdit$.next(data);
  }

  public addItemState(){
    this.state$.next(false);
  }



}
