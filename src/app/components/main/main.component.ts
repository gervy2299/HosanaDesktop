import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../interfaces/usuario';
import { ModalsComponent } from '../modals/modals.component';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PacientesService } from 'src/app/services/pacientes.service';
import { MatSort } from '@angular/material/sort';

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
      nombre: pacienteNombre.value,
      costo: pacienteCosto.value,
      stado_pago: -1,
      stado_paciente:-1,
      tipo_pago: -1
    });

    this.cargarUsuario();

    pacienteNombre.value = "";
    pacienteCosto.value = "";
    pacienteNombre.focus();

    return false;
  }

  eliminarPaciente(paciente: Usuario){
    this.pacienteService.deletePacientes(paciente);
    this.cargarUsuario();
    console.log(paciente);
  }


  cargarUsuario(){
    this.listUsuario = this.pacienteService.getPacientes();
    this.dataSource = new MatTableDataSource(this.listUsuario); 
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
    localStorage.clear();
    console.log('se esta borrando la lista...');
    // this.cargarUsuario();
    location.reload();    
  }

  editarPaciente(paciente: Usuario) {
    this.pacienteService.editarPacientes(paciente);
    this.cargarUsuario();
  }
  
  
}
