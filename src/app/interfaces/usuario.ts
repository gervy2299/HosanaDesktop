export interface Usuario {
    nombre: string,
    costo: number,
    stado_pago: number;
    stado_paciente: number,
    tipo_pago: number
}

export interface Pagos{
    descripcion: string,
    cantidad: number
}