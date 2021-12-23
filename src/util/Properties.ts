
export const BASE_URL = "http://devsky.one:25700";
export const LOGIN_URL = `${BASE_URL}/login`;
export const SETUP_URL = `${BASE_URL}/setup`;
export const REGISTER_URL = `${BASE_URL}/register`;
export const UPLOAD_URL = `${BASE_URL}/user/upload`;
export const FILES_URL = `${BASE_URL}/user/files`;

export class CloudUser {
    public id!: number;
    public name!: string;
    public email!: string;
    public passwordHash!: string;
    public invitationalCode!: string;
}

export class Properties {

    static USER?: CloudUser

    public static getLoginString() {
        if(!Properties.USER) {
            return ''
        }

        return Properties.USER.name + ':' + Properties.USER.passwordHash
    }

    public static getLoginStringBase64() {
        return btoa(Properties.getLoginString())
    }

   
    public static async tryLogin(): Promise<Boolean> {
        const loginstring = localStorage.getItem('clouddrive-login');
        if(loginstring) {
            return await this.login(loginstring);
        }
        return false;
    }

    public static async login(loginString: string): Promise<Boolean> {
        try {
            const answer = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${loginString}`
                }
            })
            const json = await answer.json()
            const user = Object.assign(new CloudUser(), json);
            console.log(user);
            Properties.USER = user;
            localStorage.setItem("clouddrive-login", loginString);
            console.log("Logged in");
            return true;
        } catch(e) {
            console.error(e);
            return false;
        }
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