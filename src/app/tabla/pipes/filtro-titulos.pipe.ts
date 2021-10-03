import { Pipe, PipeTransform } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/pelicula.interface';

@Pipe({
  name: 'filtroTitulos'
})
export class FiltroTitulosPipe implements PipeTransform {

  transform(peliculas: Pelicula[], filtro: string = ''): Pelicula[] {

    filtro = filtro.toLowerCase();

    if (filtro !== '') {
      peliculas = peliculas.filter(pelicula => pelicula.title.toLowerCase().includes(filtro));
    }
    return peliculas;
  }

}
