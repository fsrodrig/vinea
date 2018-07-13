export class Usuario {
    constructor(
        public id?: number,
        public username?: string,
        public email?: string,
        public nombre?: string,
        public apellido?: string,
        public dni?: number,
        public cuil?: number,
        public domicilio?: string,
        public telefono?: number,
        public fecha_nacimiento?: string,
        public legajo?: number,
        public foto?: string,
        public emailVerified?: boolean,
        public password?: string,
        public verificationToken?: string,
        public realm?: string,
        public fecha_alta?: string,
        public fecha_baja?: string
    ) {}
}

export class UsuarioSafe {
    constructor(
        public id?: number,
        public username?: string,
        public email?: string,
        public nombre?: string,
        public apellido?: string,
        public dni?: number,
        public cuil?: number,
        public domicilio?: string,
        public telefono?: number,
        public fecha_nacimiento?: string,
        public legajo?: number,
        public foto?: string,
        public fecha_alta?: string,
        public fecha_baja?: string
    ) {}
}

export class UsuarioMin {
    constructor(
        public id?: number,
        public username?: string,
        public email?: string,
        public nombre?: string,
        public apellido?: string,
        public foto?: string
    ) {}
}

export class UsuarioLogin {
    constructor(
        public username?: string,
        public email?: string,
        public password?: string
    ) {}
}