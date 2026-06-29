import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutorService } from './services/autor-service';
import { Autor } from './model/autor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  private autor: Autor[] = [];
  constructor(private autorservice : AutorService){}

  this.autorService.getAutores().subscribe(data => {
    console.log(data);
});

  
}
