import { Pipe, PipeTransform } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/pelicula.interface';

@Pipe({
  name: 'ordenarTabla'
})
export class OrdenarTablaPipe implements PipeTransform {

  transform(peliculas: Pelicula[], tipoOrdenacion: string = ''): Pelicula[] {


    //Pipe de ordenación de array por campo, ordena descendiente o ascendiente
    //Según el valor introducido sea x o xAsc 
    switch (tipoOrdenacion) {
      case 'titulo':
        return peliculas = peliculas.sort((a,b) => {
            return (a.title > b.title) ? 1 : -1;
        });
      case 'anyo':
        return peliculas = peliculas.sort((a,b) => {
            return (a.year > b.year) ? 1 : -1;
          });
      case 'director':
        return peliculas = peliculas.sort((a,b) => {
          if (a.director === b.director) {
              return 0;
          }
          else if (a.director === null) {
              return 1;
          }
          else if (b.director === null) {
              return -1;
          } else {
            return (a.director > b.director) ? 1 : -1;
          } 
        });
      case 'genero':
        return peliculas = peliculas.sort((a,b) => {
        if (a.genre === b.genre) {
            return 0;
        }
        else if (a.genre === null) {
            return 1;
        }
        else if (b.genre === null) {
            return -1;
        } else {
          if (a.genre.includes('$') && b.genre.includes('$')) {
            return (+a.genre.slice(1) - +b.genre.slice(1));
          }
          return (a.genre > b.genre) ? 1 : -1;
        }
        });
      case 'casting':
        return peliculas = peliculas.sort((a,b) => {
          if (a.cast === b.cast) {
            return 0;
        }
        else if (a.cast === null) {
            return 1;
        }
        else if (b.cast === null) {
            return -1;
        } else {
          return (a.cast > b.cast) ? 1 : -1;
        }
        });
      case 'notas':
        return peliculas = peliculas.sort((a,b) => {
          if (a.notes === b.notes) {
            return 0;
        }
        else if (a.notes === null) {
            return 1;
        }
        else if (b.notes === null) {
            return -1;
        } else {
          return (a.notes > b.notes) ? 1 : -1;
        }
        });
        case 'tituloAsc':
        return peliculas = peliculas.sort((a,b) => {
          return (a.title < b.title) ? 1 : -1;
        });
      case 'anyoAsc':
        return peliculas = peliculas.sort((a,b) => {
            return (a.year < b.year) ? 1 : -1;
          });
      case 'directorAsc':
        return peliculas = peliculas.sort((a,b) => {
          if (a.director === b.director) {
              return 0;
          }
          else if (a.director === null) {
              return -1;
          }
          else if (b.director === null) {
              return 1;
          } else {
            return (a.director < b.director) ? 1 : -1;
          } 
        });
      case 'generoAsc':
        return peliculas = peliculas.sort((a,b) => {
          if (a.genre === b.genre) {
            return 0;
        }
        else if (a.genre === null) {
            return -1;
        }
        else if (b.genre === null) {
            return 1;
        } else {
          let aux = a.genre.slice(1);
          let bux = b.genre.slice(1);
          if (a.genre.includes('$') && b.genre.includes('$')) {
            return (+b.genre.slice(1) - +a.genre.slice(1)) ? 1 : -1;
          }
          return (a.genre < b.genre) ? 1 : -1;
        }
        });
      case 'castingAsc':
        return peliculas = peliculas.sort((a,b) => {
          if (a.cast === b.cast) {
            return 0;
        }
        else if (a.cast === null) {
            return -1;
        }
        else if (b.cast === null) {
            return 1;
        } else {
          return (a.cast < b.cast) ? 1 : -1;
        }
        });
      case 'notasAsc':
        return peliculas = peliculas.sort((a,b) => {
          if (a.notes === b.notes) {
            return 0;
        }
        else if (a.notes === null) {
            return -1;
        }
        else if (b.notes === null) {
            return 1;
        } else {
          return (a.notes < b.notes) ? 1 : -1;
        }
        });
      default:
        return peliculas;
    }
  }

}
