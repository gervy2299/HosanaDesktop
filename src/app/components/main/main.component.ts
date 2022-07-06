import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../interfaces/usuario';
import { ModalsComponent } from '../modals/modals.component';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PacientesService } from 'src/app/services/pacientes.service';
import { MatSort } from '@angular/material/sort';



// const 

interface EstadoPago {
  value: string;
  viewValue: string;
}

interface EstadoPaciente {
  value: string;
  viewValue: string;
}

interface TipoPago {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{ 

  listUsuario : Usuario[] = [];

  displayedColumns: string[] = ['nombre', 'costo', 'estado', 'estadoP', 'tipoP', 'acciones'];
  // dataSource = listUsuario;   
  dataSource!: MatTableDataSource<any>;
  
  foods: EstadoPago[] = [
    {value: 'std-0', viewValue: 'PENDIENTE'},
    {value: 'std-1', viewValue: 'CANCELADO'},
  ];

  state: EstadoPaciente[] = [
    {value: 'etd-0', viewValue: 'EN SALA'},
    {value: 'etd-1', viewValue: 'EN ATENCION'},
    {value: 'etd-1', viewValue: 'ATENDIDO'},
  ];

  tpago: TipoPago[] = [
    {value: 'tp-0', viewValue: 'EFECTIVO'},
    {value: 'tp-1', viewValue: 'YAPE'},
    {value: 'tp-1', viewValue: 'DEPOSITO'},
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this._sort  ;
  }


  // FUNCIONES

  // constructor(public dialog: MatDialog) {}

  constructor(public dialog: MatDialog, private _pacienteService: PacientesService) {}


  cargarUsuario(){
    this.listUsuario = this._pacienteService.getUsuario();
    this.dataSource = new MatTableDataSource(this.listUsuario); 
  }

  eliminarPaciente(index: number){
    console.log('eliminando user',index)
    this._pacienteService.deleteUser(index);
    this.cargarUsuario();
  }

  openDialog() {
    this.dialog.open(ModalsComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.cargarUsuario();
  }
}
