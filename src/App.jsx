import React from 'react'
import {useState} from "react"

function App() {

  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");
  const [result, setResult] = useState(0);
  
  let initialState= JSON.parse(localStorage.getItem("historial")) || [];
  const [historial,sethistorial]=useState(initialState)

  const borrarHistorial =()=>{
    sethistorial([])
    localStorage.setItem("historial", JSON.stringify([]));
  }

  const deleteNumber = () => {
    if (currentOperation === "") {
      setNumber1(number1.toString().slice(0, -1));
    } else {
      setNumber2(number2.toString().slice(0, -1));
    }
  };

  function allclear() {
    setNumber1("");
    setNumber2("");
    setCurrentOperation("");
    setResult("");
  }
  
  function clickNumber (val) {
    if (currentOperation === ""){
      setNumber1(number1 + val);
    }else {
      setNumber2(number2 + val);
    }

  }

  function clickOperation (val) {
    setCurrentOperation(val);
  }


  function getResult (val) {
    let resultado=0
    switch (currentOperation) {
      case "+":
        resultado=Number(number1) + Number(number2);
        break; 
        case "-":
          resultado=Number(number1) - Number(number2);
          break; 
          case "*":
            resultado=Number(number1) * Number(number2);
            break; 
            case "/":
              resultado=Number(number1) / Number(number2);
              break; 
              default:
              break;
    }
    setResult(resultado)
    const coleccion={n1:number1,ope:currentOperation,n2:number2,res:resultado}
    console.log({resultado})
    console.log({coleccion})
    const nuevoArray = [...historial, coleccion]
    sethistorial([...nuevoArray]);
    localStorage.setItem("historial", JSON.stringify(nuevoArray));
  }

  return (
    <div className="App container">
      <div className="row">
      <div className="col">
            <br />
            <br />
            <br />
      <div className="App">
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">{ currentOperation ? number1 + currentOperation: ""}</div>
          <div className="current-operand">{result ? result : (!currentOperation ? number1 : number2)}</div>
        </div>
        <button onClick={allclear} className="span-two" >AC</button>
        <button onClick={deleteNumber}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace-fill" viewBox="0 0 16 16">
          <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"/>
          </svg> </button>
        <button onClick={() => {clickOperation("/")}}>/</button>
        <button onClick={() => {clickNumber(7)}}>7</button>
        <button onClick={() => {clickNumber(8)}}>8</button>
        <button onClick={() => {clickNumber(9)}}>9</button>
        <button onClick={() => {clickOperation("*")}}>*</button>
        <button onClick={() => {clickNumber(4)}}>4</button>
        <button onClick={() => {clickNumber(5)}}>5</button>
        <button onClick={() => {clickNumber(6)}}>6</button>
        <button onClick={() => {clickOperation("+")}}>+</button>
        <button onClick={() => {clickNumber(1)}}>1</button>
        <button onClick={() => {clickNumber(2)}}>2</button>
        <button onClick={() => {clickNumber(3)}}>3</button>
        <button onClick={() => {clickOperation("-")}}>-</button>
        <button onClick={() => {clickNumber(".")}}>.</button>
        <button onClick={() => {clickNumber(0)}}>0</button>
        <button onClick={getResult} className="span-two">=</button>
      </div>
    </div>
      </div>
      <div className="col">
            <br />
            <br />
            <br />
            <h2>Historial</h2>
            <br />
      {
            historial.length===0 &&
            "Áun no hay Historial"
          }
          {
            historial.length !== 0 && (
              <ol>
                {historial.map((item, index)=>{
                  return(
                    <li key={index}>
                      {item.n1}{item.ope}{item.n2}={item.res}
                    </li>
                  )
                })}
              </ol>
            )
          }
          <br />
          <br />
          <br />
           <button type="button" onClick={borrarHistorial} style={{whith:"100%"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
           <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
           </svg></button>
          </div>

        </div>
      </div>

  );
}

export default App;
