import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GastosService } from 'src/app/services/gastos.service';

@Component({
  selector: 'app-edit-pagos',
  templateUrl: './edit-pagos.component.html',
  styleUrls: ['./edit-pagos.component.scss']
})
export class EditPagosComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditPagosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public gastosServices : GastosService
  ) {
  }

  ngOnInit(): void {
  }

  onSave(nuevoNombre: any, nuevoCosto: any): void {
    const ndato = this.editarDatos(JSON.stringify(this.data), nuevoNombre.value.toUpperCase(), nuevoCosto.value);    
    this.gastosServices.editarPacientes2(this.data, ndato);
  }

   
  editarDatos(respuesta: any, nuevoNombre: any, nuevoCosto: any): any {
    // Realiza una copia del objeto original para no modificarlo directamente
    const respuestaEditada = JSON.parse(respuesta);
    
    // Asigna el nuevo nombre al campo correspondiente
    respuestaEditada.descripcion = nuevoNombre;
    respuestaEditada.cantidad = nuevoCosto;
  
    return respuestaEditada;
  }

}
