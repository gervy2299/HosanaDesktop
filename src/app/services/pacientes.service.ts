import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {  

  pacientes: Usuario[] = [];  

  constructor(){
    this.pacientes = [
      // {nombre: 'GERVY SALINAS' , costo:35},
      // {nombre: 'FERNANDO SALINAS' , costo:55},
      // {nombre: 'MARGERY SALINAS' , costo:75}
    ]   
  }

  getPacientes(){
    if(localStorage.getItem('PACIENTES') === null){
      return this.pacientes;
    } else {
      this.pacientes = JSON.parse(localStorage.getItem('PACIENTES') || "{}");
      return this.pacientes;
    }
  }

  addPacientes(paciente:Usuario){

    let paci: Usuario[] = [];
    // this.pacientes.push(paciente);
    if(localStorage.getItem('PACIENTES') === null){
      paci.push(paciente);
      localStorage.setItem("PACIENTES", JSON.stringify(paci));
    } else {
      paci = JSON.parse(localStorage.getItem('PACIENTES') || "{}");
      paci.push(paciente);
      localStorage.setItem("PACIENTES", JSON.stringify(paci));
    }

    return false;
  }

  deletePacientes(paciente: Usuario){
    for(let i = 0; i<this.pacientes.length; i++){
      if(paciente == this.pacientes[i]){
        this.pacientes.splice(i,1);
        localStorage.setItem('PACIENTES', JSON.stringify(this.pacientes));
      }
    }
  }

  editarPacientes(){
    
  }


}
