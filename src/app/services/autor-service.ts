import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../model/autor';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private url = "http://localhost:3300/autor";
  constructor(private http: HttpClient){}

  getAutor():Observable<Autor[]>{
    console.log(this.http.get<Autor[]>(this.url));
    return this.http.get<Autor[]>(this.url);
  }

  createAutor(autor: Autor):Observable<Autor>{
    return this.http.post<Autor>(this.url,autor);

  }

  updateAutor(id:number, autor:Autor):Observable<Autor>{
    return this.http.put<Autor>(`${this.url}/${id}`,autor);
  }

  deleteAutor(id:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  

}
