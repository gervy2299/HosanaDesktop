import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pagos } from 'src/app/interfaces/usuario';
import { GastosService } from 'src/app/services/gastos.service';
import { DialogComponent } from '../dialog/dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { EditPagosComponent } from '../edit-pagos/edit-pagos.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  listPagos : Pagos[] = [];
  displayedColumn: string[] = ['descripcion', 'monto', 'acciones']; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GastosComponent>,
    public gastosServices : GastosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this._sort  ;
  }

  ngOnInit(): void {
    this.llenarTabla();
  }

  agregarGasto(descGasto:any, montGasto:any){
    // console.log(descGasto.value.toUpperCase() + " & " + montGasto.value);
    this.gastosServices.addPacientes({
      descripcion: descGasto.value.toUpperCase(),
      cantidad: montGasto.value
    });

    this.llenarTabla();

    descGasto.value = "";
    montGasto.value = "";
    descGasto.focus();

    return false;
  }

  llenarTabla(){
    this.listPagos = this.gastosServices.getGastos();
    this.dataSource = new MatTableDataSource(this.listPagos.slice().reverse()); 
  }

  eliminarPaciente(pago: Pagos){
    // const dialogRef = this.dialog.open(DialogComponent);

    const dialogRef = this.dialog.open(DialogComponent, {      
      data: {msg: '¿Desea eliminar el pago?'} // Puedes pasar datos al diálogo si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result === true){
        this.gastosServices.deletePacientes(pago);
        this.llenarTabla();
        // console.log(paciente);
        // console.log("se elimino")
      } else {
        // console.log("no se elimino")
      }
    });
    // this.pacienteService.deletePacientes(paciente);
  }

  editarPaciente(pago: Pagos) {
    this.gastosServices.editarPacientes(pago);
    this.llenarTabla();
  }

  editaPaciente(pago: Pagos){
    const dialogRef = this.dialog.open(EditPagosComponent, {
      width: '250px',
      data: pago // Puedes pasar datos al diálogo si es necesario
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.editarPaciente(result);
        this.llenarTabla();
      }
    });

  }

}
