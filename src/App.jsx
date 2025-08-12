import './styles.css'
import loginImage from './assets/undraw_pricing-page_88g4.svg'

function Formulario() {
  return (
    <form className='formulario'>
      <div className='formulario-img'>
        <img src={loginImage} alt="" srcSet='' />
      </div>
      <label htmlFor="">Email: </label>
      <input type="email" name="" id=""/>
      <label htmlFor="">Senha: </label>
      <input type="Password" name="" id=""/>
      <MyButton/>
    </form>
  )
}

function MyButton() {
  return (
    <button className='botao'>Entrar</button>
  )
}

function App() {
  
  return (
    <>
    <h1>Olá, mundo</h1>
    <Formulario/>
    </>
  )
}

export default App


