import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  listUsuario: Usuario[] = [
    {nombre: 'REINA BERENICE ROJAS TORRES ', costo: '35.00'},
    {nombre: 'MARIANO JESUS POLANCO RIOS  ', costo: '180.00'},
    {nombre: 'ANTONIO SIMON CARDENAS  ', costo: '35.00'},
    {nombre: 'MARIANO ANDRES VALLE UTRILLA  ', costo: '35.00'},
    {nombre: 'REINA BERENICE ROJAS TORRES ', costo: '35.00'},
    {nombre: 'MARIANO JESUS POLANCO RIOS  ', costo: '180.00'},
    {nombre: 'ANTONIO SIMON CARDENAS  ', costo: '35.00'},
    {nombre: 'MARIANO ANDRES VALLE UTRILLA  ', costo: '35.00'},
    {nombre: 'REINA BERENICE ROJAS TORRES ', costo: '35.00'},
    { nombre: 'MARIANO JESUS POLANCO RIOS  ', costo: '180.00'},
    { nombre: 'ANTONIO SIMON CARDENAS  ', costo: '35.00'},
    { nombre: 'MARIANO ANDRES VALLE UTRILLA  ', costo: '35.00'},
  ];

  constructor( private http: HttpClient) { }

  // RUTA DEL SERVIDOR
  url = 'http://localhost:3000/cargo';

  getUsuario(){
    return this.listUsuario.slice();
    // return this.http.get(this.url);
  }

  deleteUser(index: number){
    this.listUsuario.slice(index,1);
    // return this.http.get(this.url);
  }
}
