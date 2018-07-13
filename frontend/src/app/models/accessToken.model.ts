export class AccessToken {
    constructor(
        public id?: string,
        public ttl?: number,
        public scopes?: any,
        public created?: string,
        public userId?: number
    ) {
        
    }
}