import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Pelicula } from '../interfaces/pelicula.interface';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  peliculas: Pelicula[] = [];
  paginas: number = 0;
  numPaginas: number[] = [];
  peliculasMostradas: number[] = [5, 10, 30, 50];
  numElementosTabla: number = 5;
  indicePagina: number = 1;
  ordenacion: string = '';
  filtro: string = '';
  debouncer: Subject<string> = new Subject();

  get indiceInferiorTabla(): number {
    return (this.indicePagina - 1) * this.numElementosTabla;;
  }

  get indiceSuperiorTabla() {
    return this.indicePagina * this.numElementosTabla;
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Pelicula[]>("assets/movies.json").subscribe(data =>{      
      this.peliculas = data;
      this.actualizarPaginacion();
    }); 

    // Tiempo de espera antes de propagar el valor del input del filtro 
    // a la variable
    this.debouncer.pipe(
      debounceTime(300)
    ).subscribe( valor => {
      this.filtro = valor;
    });
  }

  // modifica la cantidad de elementos mostrados en la tabla
  cambiarNumpeliculasMostradas(numElementos: any): void {
    this.numElementosTabla = numElementos.target.value;
    this.actualizarPaginacion();
    this.indicePagina = 1;
  }

  avanzarPagina(): void {
    if (this.indicePagina < this.paginas) {
      this.indicePagina = +this.indicePagina + 1;
    }
  }

  retrocederPagina(): void {
    if (this.indicePagina > 1) {
      this.indicePagina = +this.indicePagina - 1;
    }
  }

  seleccionarPagina(value: any): void {
    this.indicePagina = value.target.value;
  }

  // se recalcula la cantidad de páginas al modificar la cantidad e elementos mostrados en la tabla
  actualizarPaginacion(): void {
    // calculo de páginas respecto a la cantidad de elementos, redondeando en la división controlando el redondeo de la división 
    let valorDiv = (this.peliculas.length / this.numElementosTabla);
    let valorDivRounded = ~~(this.peliculas.length / this.numElementosTabla);
    if (valorDivRounded < valorDiv) {
      this.paginas = ~~(this.peliculas.length / this.numElementosTabla) + ((this.paginas % this.numElementosTabla > 0) ? 1 : 0);
    } else {
      this.paginas = valorDivRounded;
    }
    // se aumento en una la cantidad de paginas ya que al autocompletar el array se crea la página 0
    this.numPaginas = [...Array(+this.paginas+1).keys()];
    this.numPaginas.shift();
  }

  // Se establece el campo de ordenación descendente, sí se ejecuta dos veces seguidas sobre el mismo campo 
  // se cambia la ordenación de descendente a ascendente 
  ordenarPor(valor: string): void {
    this.ordenacion = (this.ordenacion === valor) ? this.ordenacion + "Asc": valor;
  }

  // Se asigna el valor del input al filtro
  filtrarPor(): void {
    this.debouncer.next(this.filtro);
  }

}