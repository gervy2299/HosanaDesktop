import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalsComponent } from './components/modals/modals.component';

// ANGULAR MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';

// CONNECT BACKEND
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { PdfComponent } from './components/pdf/pdf.component';
import {MatDividerModule} from '@angular/material/divider';
import { DialogComponent } from './components/dialog/dialog.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { GastosComponent } from './components/gastos/gastos.component';
import { EditPagosComponent } from './components/edit-pagos/edit-pagos.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ModalsComponent,
    PdfComponent,
    DialogComponent,
    EditDialogComponent,
    GastosComponent,
    EditPagosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatDividerModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
