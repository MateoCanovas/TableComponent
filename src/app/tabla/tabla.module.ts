import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TablaComponent } from './tabla.component';
import { OrdenarTablaPipe } from './pipes/ordenar-tabla.pipe';
import { FormsModule } from '@angular/forms';
import { FiltroTitulosPipe } from './pipes/filtro-titulos.pipe';



@NgModule({
  declarations: [
    TablaComponent,
    OrdenarTablaPipe,
    FiltroTitulosPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    TablaComponent
  ]
})
export class TablaModule { }
