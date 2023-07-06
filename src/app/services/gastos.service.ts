import { Injectable } from '@angular/core';
import { Pagos } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  pagos: Pagos[] = [];  


  constructor() {
    this.pagos = [
      // {descripcion: "pago de agua", cantidad: 20.50},
      // {descripcion: "pago de gel", cantidad: 30.50}
    ]
  }

  getGastos(){
    if(localStorage.getItem('GASTOS') === null){
      return this.pagos;
    } else {
      this.pagos = JSON.parse(localStorage.getItem('GASTOS') || "{}");
      return this.pagos;
    }
  }

  addPacientes(pago:Pagos){

    let paci: Pagos[] = [];
    // this.pacientes.push(paciente);
    if(localStorage.getItem('GASTOS') === null){
      paci.push(pago);
      localStorage.setItem("GASTOS", JSON.stringify(paci));
    } else {
      paci = JSON.parse(localStorage.getItem('GASTOS') || "{}");
      paci.push(pago);
      localStorage.setItem("GASTOS", JSON.stringify(paci));
    }

    return false;
  }

  deletePacientes(pago: Pagos){
    for(let i = 0; i<this.pagos.length; i++){
      if(pago == this.pagos[i]){
        this.pagos.splice(i,1);
        localStorage.setItem('GASTOS', JSON.stringify(this.pagos));
      }
    }
  }

  editarPacientes(pago: Pagos) {
    // const pacientes = JSON.parse(localStorage.getItem('PACIENTES') || "{}");
  
    for (let i = 0; i < this.pagos.length; i++) {
      if (pago == this.pagos[i]) {
        this.pagos[i] = pago;
        break;
      }
    }
  
    localStorage.setItem('GASTOS', JSON.stringify(this.pagos));
  }  

  editarPacientes2(pago: Pagos, ndato: Pagos) {
    // const pacientes = JSON.parse(localStorage.getItem('PACIENTES') || "{}");
  
    for (let i = 0; i < this.pagos.length; i++) {
      if (pago == this.pagos[i]) {
        this.pagos[i] = ndato;
        break;
      }
    }
  
    localStorage.setItem('GASTOS', JSON.stringify(this.pagos));
  }  

  gastosTotal(): number {
    const gastos = JSON.parse(localStorage.getItem('GASTOS') || "{}");
    let sumaGastos = 0;
  
    gastos.forEach((paciente: any) => {
        sumaGastos += parseFloat(paciente.cantidad);
    });
  
    return sumaGastos;
  }

}
