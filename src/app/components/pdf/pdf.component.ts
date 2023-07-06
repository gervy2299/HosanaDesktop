import { Component, OnInit } from '@angular/core';
import { text } from 'express';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { GastosService } from 'src/app/services/gastos.service';
import { MainComponent } from '../main/main.component';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {    

  constructor(
    public pacienteService : PacientesService,
    public gastosService : GastosService,
    public main : MainComponent
    ) { }

  ngOnInit(): void {
    this.verPaciente();    
  }

  verPaciente(){
    const pacientes = JSON.parse(localStorage.getItem('PACIENTES') || "{}");
    const otro = JSON.stringify(pacientes);
    return pacientes;
  }

  generarPDF() {
    const dato = this.verPaciente();
    const gasto = JSON.parse(localStorage.getItem('GASTOS') || "{}");
    const data = JSON.parse(localStorage.getItem('PACIENTES') || "{}");
    const otro = JSON.stringify(data);

    const inicia: string = this.main.cajaInicial;

    const fechaActual = this.pacienteService.obtenerFechaActualEnLetra();
    const cantidadPacientes = this.pacienteService.obtenerCantidadPacientes();
    const costosTotal = this.pacienteService.obtenerSumaCostos();
    const efectivo = this.pacienteService.efectivoTotal();

    const gasTotal = this.gastosService.gastosTotal();

    const pdfDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      header: {
        stack: [
          {
            canvas: [
              {
                type: 'linear',
                gradient: ['blue', 'red'],
                // gradient: ['0000FF','00FFFF'],
                angle: 90,
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 50
              }
            ],
            width: 595,
            height: 50
          },
          {
            text: 'Nombre de la Empresa',
            alignment: 'center',
            margin: [0, -40, 0, 0],
            fontSize: 18,
            bold: true,
            color: 'white'
          }
        ],
        margin: [40, 20, 40, 0]
      },
      content: [
        {  
        alignment: 'justify',
          columns: [
            {
              text: 'Lista de Pacientes', fontSize: 24, bold: true, margin: [0, 20, 0, 30]
            },
            {
              text: 'Fecha: '+fechaActual, fontSize: 14, bold: false, margin: [0, 30, 0, 30]
            }
          ]
      },        
        {
          style: 'tablaContenido',
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              [
                { text: 'Nombre', style: 'headerCell' },
                { text: 'Costo', style: 'headerCell' }
              ],
              ...dato.map((paciente:any) => [paciente.nombre, paciente.costo])
            ]
          }
        },
        "\n\n",
        {          
          columns: [
            {
              text:'Cantidad de Pacientes: ' + cantidadPacientes
            },
            {
              text:'Efectivo: s/ ' + efectivo
            },
            {
              text: 'Ganancia Total: s/'+costosTotal
            }
          ],
          style: 'header'
        },
        {  
          alignment: 'justify',
            columns: [
              {
                text: 'Gastos del día', fontSize: 24, bold: true, margin: [0, 20, 0, 30]
              },
              {
                // text: 'Fecha: '+fechaActual, fontSize: 14, bold: false, margin: [0, 30, 0, 30]
              }
            ]
        },
        {
          style: 'tablaContenido',
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              [
                { text: 'Descripcion', style: 'headerCell' },
                { text: 'Monto', style: 'headerCell' }
              ],
              ...gasto.map((gasto:any) => [gasto.descripcion, gasto.cantidad])
            ]
          }
        },
        "\n\n",
        {          
          columns: [
            {
              text:'Gastos Totales: s/' + gasTotal
            }
          ],
          style: 'header'
        },

        {  
          alignment: 'justify',
            columns: [
              {
                text: 'Caja', fontSize: 24, bold: true, margin: [0, 20, 0, 30]
              },
              {
                text: 'Inicia: s/'+ inicia, fontSize: 14, bold: false, margin: [0, 30, 0, 30]
              },
              {
                text: 'Finaliza: s/'+ ((parseFloat(inicia)+efectivo)-gasTotal), fontSize: 14, bold: false, margin: [0, 30, 0, 30]
              }
            ]
        },
        {
          // alignment: 'justify',
          columns: [
            {
              text: "Data:\n\n"+otro, fontSize: 8, bold: false, margin: [0, 20, 0, 30]
            }
          ]
        }
      ],
      footer: {
        stack: [
          {
            canvas: [
              {
                type: 'linear',
                gradient: ['#42a5f5', '#1565c0'],
                angle: 90,
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 50
              }
            ],
            width: 595,
            height: 50
          },
          {
            text: 'Pie de página',
            alignment: 'center',
            margin: [0, 10, 0, 0],
            fontSize: 12,
            color: 'white'
          }
        ],
        margin: [40, 0, 40, 20]
      },
      styles: {
        headerCell: {
          bold: true,
          fillColor: '#dddddd'
        },
        tablaContenido: {
          margin: [0, 10, 0, 0]
        }
      }
    };
  
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
    console.log(this.verPaciente())
  }
  
  
}
