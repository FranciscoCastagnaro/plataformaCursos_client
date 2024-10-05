import './styles/loginform.css'

export const LoginForm = () => {
    return (
        <main>
            <div className='formcard'>
                <img src="src\assets\logotextoblanco.png" alt="loginlogo" />
                <form>
                    <input type="text" />
                    <input type="password" name="" id="" />
                    <button>Login</button>
                    <button>Register</button>
                </form>
            </div>
        </main>
    )
}