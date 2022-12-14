import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  listUsuario: Usuario[] = [
    {id:1,nombre: 'REINA BERENICE ROJAS TORRES ', costo: '35.00'},
    {id:2,nombre: 'MARIANO JESUS POLANCO RIOS  ', costo: '180.00'},
    {id:3,nombre: 'ANTONIO SIMON CARDENAS  ', costo: '35.00'},
    {id:4,nombre: 'MARIANO ANDRES VALLE UTRILLA  ', costo: '35.00'},
    {id:5,nombre: 'REINA BERENICE ROJAS TORRES ', costo: '35.00'},
    {id:6,nombre: 'MARIANO JESUS POLANCO RIOS  ', costo: '180.00'},
    {id:7,nombre: 'ANTONIO SIMON CARDENAS  ', costo: '35.00'},
    {id:8,nombre: 'MARIANO ANDRES VALLE UTRILLA  ', costo: '35.00'},
    {id:9,nombre: 'REINA BERENICE ROJAS TORRES ', costo: '35.00'},
    { id:10,nombre: 'MARIANO JESUS POLANCO RIOS  ', costo: '180.00'},
    { id:11,nombre: 'ANTONIO SIMON CARDENAS  ', costo: '35.00'},
    { id:12,nombre: 'MARIANO ANDRES VALLE UTRILLA  ', costo: '35.00'},
  ];

  constructor() { }

  getUsuario(){
    return this.listUsuario.slice();
  }

  deleteUser(index: number){
    this.listUsuario.slice(index,1);
  }
}
