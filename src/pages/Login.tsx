import "./styles/login.scss"

export function Login() {

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
    }

    return (
        <form>
                <h1>Cloud M</h1>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address or Username</label>
                    <input type="text" className="form-control" placeholder="Enter email or username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <br></br>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    New? <a href="/register">Register</a>
                </p>
            </form>
    );
}