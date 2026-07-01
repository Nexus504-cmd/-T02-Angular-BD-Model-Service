import { Component, ChangeDetectorRef, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { AutorService } from './services/autor-service';
import { Autor } from './model/autor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

  autor = signal<any|undefined>(undefined);
  public autores = computed(()=> this.autor());

  constructor(
    private autorservice: AutorService,
    private cdr: ChangeDetectorRef
  ) {
    console.log("Constructor");
  }

  ngOnInit() {
    this.cargarautores();
    this.cdr.detectChanges();
  }

  cargarautores() {
    console.log("Antes");

    this.autorservice.getAutor().subscribe({
      next: (resp) =>{
        this.autor.set(resp);
      }

    });

    console.log("Después");
  }

}