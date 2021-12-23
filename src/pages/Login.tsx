import { Properties } from "../util/Properties";
import "./styles/login.scss"

export function Login() {

    const handleSubmit =  async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        // post to server
        
        if(await Properties.login(btoa(`${username}:${password}`))) {
            window.location.href = "/";
        } else {
            alert("Invalid username or password");
        }
    }

    return (
        <form>
                <h1>Cloud M</h1>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address or Username</label>
                    <input id={"username"} type="text" className="form-control" placeholder="Enter email or username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input id={"password"} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <br></br>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    New? <a href="/register">Register</a>
                </p>
            </form>
    );
}