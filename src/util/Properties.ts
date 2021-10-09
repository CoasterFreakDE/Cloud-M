
export class User {
    public id!: string;
    public username!: string
    public avatar!: string
    public discriminator!: string
    public public_flags!: number
    public flags!: number
    public locale!: string
    public mfa_enabled!: boolean
    public premium_type?: number
    public isBooster: boolean = false
}

export class Properties {

    static UID = Properties.makeid()
    static USER?: User

    private static makeid() {
        const uid = localStorage.getItem('verify_auth');

        if(uid) {
            return uid
        }

        return Properties.createRandomToken(16)
    }

    static createRandomToken(length: number) {
        var result           = [];
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
       }
       return result.join('');
    }

}