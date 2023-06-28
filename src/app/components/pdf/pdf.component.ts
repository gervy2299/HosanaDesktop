import { Component, OnInit } from '@angular/core';

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

    const pdfDefinition: any = {
      content: [
        {          
          text: "LISTA DE PACIENTES"
        },
        {
          style: 'table',
          table: {
            headerRows: 1,
            body: [
              [ 'Nombre', 'Costo'], // Encabezado de la tabla
              ...dato.map((paciente:any) => [paciente.nombre, paciente.costo]) // Datos de la tabla
            ]
          }
        }
      ]
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}
