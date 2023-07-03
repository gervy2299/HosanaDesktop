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
    ];
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

  editarPacientes(paciente: Usuario) {
    // const pacientes = JSON.parse(localStorage.getItem('PACIENTES') || "{}");
  
    for (let i = 0; i < this.pacientes.length; i++) {
      if (paciente == this.pacientes[i]) {
        this.pacientes[i] = paciente;
        break;
      }
    }
  
    localStorage.setItem('PACIENTES', JSON.stringify(this.pacientes));
  }  

  obtenerFechaActual(): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0
    const año = fechaActual.getFullYear();
  
    return `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
  }

  obtenerCantidadPacientes(): number {
    const pacientes = JSON.parse(localStorage.getItem('PACIENTES') || "{}");
    return pacientes.length;
  }
  
  obtenerSumaCostos(): number {
    const pacientes = JSON.parse(localStorage.getItem('PACIENTES') || "{}");
    let sumaCostos = 0;
  
    pacientes.forEach((paciente: any) => {
      sumaCostos += parseFloat(paciente.costo);
    });
  
    return sumaCostos;
  }

  obtenerFechaActualEnLetra(): string {
    const fechaActual = new Date();
  
    const diasEnLetra = [
      "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"
    ];
    
    const diaSemana = diasEnLetra[fechaActual.getDay()];
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth();
    const año = fechaActual.getFullYear();
    
    const mesesEnLetra = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    
    const fechaEnLetra = `${diaSemana}, ${dia} de ${mesesEnLetra[mes]} de ${año}`;
    
    return fechaEnLetra;
  }

  efectivoTotal(): number {
    const pacientes = JSON.parse(localStorage.getItem('PACIENTES') || "{}");
    let sumaEfectivo = 0;
  
    pacientes.forEach((paciente: any) => {
      if(paciente.tipo_pago === 0){
      sumaEfectivo += parseFloat(paciente.costo);
    }
    });
  
    return sumaEfectivo;
  }

}
