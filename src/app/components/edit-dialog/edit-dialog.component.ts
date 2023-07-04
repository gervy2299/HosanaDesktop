import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pacienteService : PacientesService
  ) {
  }

  ngOnInit(): void {}

  onSave(nuevoNombre: any, nuevoCosto: any): void {
    const ndato = this.editarDatos(JSON.stringify(this.data), nuevoNombre.value.toUpperCase(), nuevoCosto.value);    
    this.pacienteService.editarPacientes2(this.data, ndato);
  }

   
  editarDatos(respuesta: any, nuevoNombre: any, nuevoCosto: any): any {
    // Realiza una copia del objeto original para no modificarlo directamente
    const respuestaEditada = JSON.parse(respuesta);
    
    // Asigna el nuevo nombre al campo correspondiente
    respuestaEditada.nombre = nuevoNombre;
    respuestaEditada.costo = nuevoCosto;
  
    return respuestaEditada;
  }
  
}
