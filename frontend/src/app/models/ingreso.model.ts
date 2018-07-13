export class Ingreso {
    constructor(
        public id?: number,
        public fecha?: string,
        public descripcion?: string,
        public pasajero?: string,
        public nro_res?: number,
        public recibo?: string,
        public cambio?: number,
        public monto?: number,
        public concepto_id?: number,
        public forma_de_pago_id?: number,
        public vendedor_id?: number,
        public concepto?: any,
        public forma_de_pago?: any,
        public vendedor?: any,
    ) {}
}