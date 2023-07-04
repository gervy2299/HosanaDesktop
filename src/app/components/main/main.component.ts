import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../interfaces/usuario';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PacientesService } from 'src/app/services/pacientes.service';
import { MatSort } from '@angular/material/sort';
import { DialogComponent } from '../dialog/dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

interface EstadoPago {
  value: number;
  viewValue: string;
  st: boolean;
}

interface EstadoPaciente {
  value: number;
  viewValue: string;
  st: boolean;
}

interface TipoPago {
  value: number;
  viewValue: string;
  st: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{ 
  
  
  listUsuario : Usuario[] = [];
  displayedColumns: string[] = ['nombre', 'costo', 'estado', 'estadoP', 'tipoP', 'acciones'];  
  dataSource!: MatTableDataSource<any>;

  animal: string = "";
  name: string = "";
  
  foods: EstadoPago[] = [
    {value: 0, viewValue: 'PENDIENTE',st:false},
    {value: 1, viewValue: 'CANCELADO',st:false},
  ];

  state: EstadoPaciente[] = [
    {value: 0, viewValue: 'EN SALA',st:false},
    {value: 1, viewValue: 'EN ATENCION',st:false},
    {value: 2, viewValue: 'ATENDIDO',st:false},
  ];

  tpago: TipoPago[] = [
    {value: 0, viewValue: 'EFECTIVO',st:false},
    {value: 1, viewValue: 'YAPE',st:false},
    {value: 2, viewValue: 'DEPOSITO',st:false},
  ];     

   dia=this.pacienteService.obtenerFechaActualEnLetra();
   cantidad =this.pacienteService.obtenerCantidadPacientes();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this._sort  ;
  }  

  constructor(
    public dialog: MatDialog, 
    public pacienteService : PacientesService
    ) {
    }

  grabar_localstorage(pacienteNombre:any, pacienteCosto:any){
    this.pacienteService.addPacientes({
      nombre: pacienteNombre.value.toUpperCase(),
      costo: pacienteCosto.value,
      stado_pago: 0,
      stado_paciente:1,
      tipo_pago: -1
    });

    this.cargarUsuario();

    pacienteNombre.value = "";
    pacienteCosto.value = "";
    pacienteNombre.focus();

    return false;
  }

  eliminarPaciente(paciente: Usuario){
    // const dialogRef = this.dialog.open(DialogComponent);

    const dialogRef = this.dialog.open(DialogComponent, {      
      data: {msg: '¿Desea eliminar al paciente?'} // Puedes pasar datos al diálogo si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result === true){
        this.pacienteService.deletePacientes(paciente);
        this.cargarUsuario();
        // console.log(paciente);
        // console.log("se elimino")
      } else {
        // console.log("no se elimino")
      }
    });
    // this.pacienteService.deletePacientes(paciente);
  }


  cargarUsuario(){
    this.listUsuario = this.pacienteService.getPacientes();
    this.dataSource = new MatTableDataSource(this.listUsuario.slice().reverse()); 
    this.dia = this.pacienteService.obtenerFechaActualEnLetra();
    this.cantidad = this.pacienteService.obtenerCantidadPacientes();
  }
  

  ngOnInit(): void {
    this.cargarUsuario();   
  }

  guardarStados(paciente: Usuario){    
    this.pacienteService.addPacientes({
      nombre: paciente.nombre,
      costo: paciente.costo,
      stado_pago: paciente.stado_pago,
      stado_paciente: paciente.stado_paciente,
      tipo_pago: paciente.tipo_pago
    });

    console.log(paciente)

    this.cargarUsuario();

  }

  vaciarLocal(){
    const dialogRef = this.dialog.open(DialogComponent, {      
      data: {msg: '¿Desea eliminar toda la tabla?'} // Puedes pasar datos al diálogo si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result === true){
        localStorage.clear();
        console.log('se esta borrando la lista...');
        // this.cargarUsuario();
        location.reload(); 
      } else {
        console.log("no se elimino")
      }
    });
  }

  editarPaciente(paciente: Usuario) {
    this.pacienteService.editarPacientes(paciente);
    this.cargarUsuario();
  }
  
  obtenerEstilosEstado(estado: string): { [key: string]: string } {
    if (parseInt(estado) === 1) {
      return { };
    } else if (parseInt(estado) === 0) {
      return { 'background-color': '#DC505B' };
    } else {
      return {}; // Estilos por defecto si no se cumple ninguna condición
    }
  }

  obtenerEstilosEstadoPaciente(estado: string): { [key: string]: string } {
    if (parseInt(estado) === 0) {
      return { 'background-color': '#B3E5FC'};
    } else if (parseInt(estado) === 1) {
      return { 'background-color': '#C8E6C9' };
    } else if (parseInt(estado) === 2) {
      return { };
    } else {
      return {}; // Estilos por defecto si no se cumple ninguna condición
    }
  }

  obtenerTipoPago(estado: string): { [key: string]: string } {
    if (parseInt(estado) === 0) {
      return { 'background-color': '#B3E5FC'};
    } else if (parseInt(estado) === 1) {
      return { 'background-color': '#ff90ff'};
    } else if (parseInt(estado) === 2) {
      return { 'background-color': '#C8E6C9'};
    } else {
      return {}; // Estilos por defecto si no se cumple ninguna condición
    }
  }

  editaPaciente(paciente: Usuario){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: paciente // Puedes pasar datos al diálogo si es necesario
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.editarPaciente(result);
        this.cargarUsuario();
      }
    });

  }

  
}
