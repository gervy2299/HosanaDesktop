import { Component, OnInit } from '@angular/core';
import { text } from 'express';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {    

  constructor(public pacienteService : PacientesService) { }

  ngOnInit(): void {
    this.verPaciente();    
  }

  verPaciente(){
    const pacientes = JSON.parse(localStorage.getItem('PACIENTES') || "{}");
    const otro = JSON.stringify(pacientes);
    console.log(pacientes);
    return pacientes;
  }


  createPdf(){

    const dato = this.verPaciente();
    const fechaActual = this.pacienteService.obtenerFechaActualEnLetra();
    const cantidadPacientes = this.pacienteService.obtenerCantidadPacientes();
    const costosTotal = this.pacienteService.obtenerSumaCostos();


    const pdfDefinition: any = {
      content: [
        {
          alignment: 'justify',
          columns: [
            {
              text:''
            },
            {
              text: 'LISTA DE PACIENTES'
            },
            {
              text: 'Fecha: '+fechaActual
            }
          ]
        },
        '\n\n',
        {
          alignment: 'justify',
          columns: [
            {
              text:''
            },
            {
              style: 'table',
              table: {
                headerRows: 1,
                body: [
                  [ {text: 'NOMBRE',style: 'tableHeader'}, {text: 'COSTO',style: 'tableHeader'}], // Encabezado de la tabla
                  ...dato.map((paciente:any) => [paciente.nombre, paciente.costo]) // Datos de la tabla
                ]
              }
            },
            {
              text: ''
            }
          ]
        },
        '\n\n',
        {
          alignment: 'justify',
          columns: [
            {
              text:'Cantidad de Pacientes: ' + cantidadPacientes
            },
            {
              text: ''
            },
            {
              text: 'Ganancia Total: s/'+costosTotal
            }
          ]
        },
      ]
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  
  
  
}
