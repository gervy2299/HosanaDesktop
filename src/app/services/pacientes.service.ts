import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

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

  constructor() { }

  getUsuario(){
    return this.listUsuario.slice();
  }

  deleteUser(index: number){
    this.listUsuario.slice(index,1);
  }
}
