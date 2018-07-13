export class Egreso {
    constructor(
        public id?: number,
        public fecha?: string,
        public descripcion?: string,
        public operador_id?: number,
        public nro_res?: number,
        public cambio?: number,
        public monto?: number,
        public concepto_id?: number,
        public forma_de_pago_id?: number,
        public categoria_gasto_id?: number,
        public concepto?: any,
        public forma_de_pago?: any,
        public categoria_gasto?: any,
        public operador?: any
    ) {}
}