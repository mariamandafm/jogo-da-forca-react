import logo from './logo.svg';
//import vida1 from "./imagens/vida1.png"
import './App.css';
import {useState} from "react"

let palavras = ["porta", "janela", "mesa", "cama", "geladeira", "cadeira", "pia", "parede"]
let index = Math.floor(Math.random()*palavras.length)
let display = ''
let vidas = 6
sessionStorage.setItem('idade', '20');

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

function Tracos(props) {
  
  return(
    <div>
      <h2>{props.hide}</h2>
      
    </div>
  )
}

function Boneco() {
  let vida = "vida" + vidas + ".png"
  console.log(vida)
  return(
    <div>
      <img src={images[vida]}/>
    </div>
  )
}

function Palpite(props){
  return(
    <div>
      <input 
      type="text" 
      maxLength="1"
      onChange = {props.handleChange}/>
      <button
      onClick = {props.handleSubmit}>Enviar</button>
    </div>
  )
}

function App() {
  
  const [letra, setLetra] = useState('A');
  const [usadas, setUsadas] = useState([])

  let holder = ""
  let letras = palavras[index].split('')
  letras.map(() => {holder+="_ "})

  let [hide, setHide] = useState(holder)

  //console.log(holder)
  //console.log(palavras[index])
  //setHide(holder)
  display = hide.split(' ')

  if (vidas == 0){
    console.log("você perdeu")
  }

  function handleChange(event) {
    setLetra(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    
    check(event) 
    //console.log(letras)
    //setHide("oi")
    
    console.log("x")
    console.log(usadas)
  }
  
  function check(){   
    if (letras.includes(letra)){
      for (let i in letras){
        if (letras[i] === letra){
          //let i = letras.indexOf(char)
          display.splice(i, 1, letras[i])
          //console.log(letras[i])
        } 
      }     
      console.log(display)
      setHide(display.join(" "))
      display = ""
    }
    else if (!letras.includes(letra) && !usadas.includes(letra)){
      vidas -= 1;
      //console.log(vidas) 
    }

    if (!usadas.includes(letra)){
      setUsadas([...usadas, letra])
    } 
    else {
      alert("Essa letra ja foi utilizada, tente outra.")
    } 
  }
  

  return (
    <div className="App">
      <h1>Jogo da Forca</h1>
      <Tracos 
      hide={hide}/>
      <h1>{letra}</h1>
      <Palpite 
      handleChange={handleChange}
      handleSubmit={handleSubmit}/>
      <Boneco/>
    </div>
  );
}

export default App;
