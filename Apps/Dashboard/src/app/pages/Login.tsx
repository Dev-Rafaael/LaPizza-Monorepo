import '../../styles/Login.css'
import { useEffect } from "react";
import useLogin from "@packages/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import  {useUserStore}  from "@packages/store/useUserStore";

function Login() {
  const navigate = useNavigate();
const {email, setEmail,senha, setSenha,handleSubmit} = useLogin(navigate)
const{
 user,
 } = useUserStore()
 

useEffect(() => {
  if (user?.email) {
    setEmail(user.email);
  }
}, [user, setEmail]);
  return (
    <section className="login-section">
  <article className="login-card">
    <div className="loginTitle">
    <h1 >Login</h1>
    <h3>Welcome Back!</h3>
    <h5>Entre Com seu E-Mail e senha Para acessar O DashBoard</h5>
    </div>
    <form onSubmit={handleSubmit} className="login-form">
        <div className="demo-box">
    <strong>Modo Demo</strong>
    <p>
      E-mail: <span>user@demo.com</span><br />
      Senha: <span>user1234</span>
    </p>
  </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-login">Entrar</button>
      </div>

    </form>
  </article>
  <article className="ImageLogin">

    <img src={"https://res.cloudinary.com/dwi9yz8wj/image/upload/v1765817245/pizzaLogin_znyonz.jpg"} alt="ImagemLogin"/>
  </article>
</section>

  );
}

export default Login;
