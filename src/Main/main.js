import { Fragment, useState } from 'react'
import api from "../services/api"

import {FaSearch} from "react-icons/fa"
import {AiOutlineCloseCircle,AiFillInfoCircle} from "react-icons/ai"
import {ToastContainer,   toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'
import ModalTemp from '../components/Modal'



import './style.css'






export default function Main(){

const [cidade,setCidade]=useState('')
const [modalIsOpen,setIsOpen]=useState(false)
const [detail,setDetail]=useState()
const[dadosapi,setdadosApi]=useState(null)






  function handleInput(e){
     
    setCidade(e.target.value)
    

  }


   function handleTemp(e){
      e.preventDefault()

      
  async function buscandoDados(){
    try{
  const response= await axios(`https://api.weatherapi.com/v1/forecast.json?key=b3380591a89541f9bed133218222004&q=${cidade}&days=3&lang=pt`)

  console.log(response.data)
  setdadosApi(response.data)
  toast.success('Cidade encontrada com sucesso!!')
  openModal();
}
catch(e){
  console.log('voce digitou a cidade errada'+e)
  toast.error("Digite o nome da cidade correta!!")
  setIsOpen(false);
  setCidade('')
  return;
  

}finally{
  console.log('chegou ao final')
}

}  
buscandoDados();

}

 

  function openModal() {
  
    setIsOpen(true);
  }


  function togglePostModal(dadosapi){
    setIsOpen(!modalIsOpen)//trocando de true para false
    setDetail(dadosapi)
    setCidade('')
    setdadosApi(null)
    
}
  
 
  return (
    
    <Fragment>
      

     
     
     <div className='container-main'>
       <h1>Consulte a temperatura da sua cidade!!!!!</h1>
       <form onSubmit={handleTemp}>
           
       <div className='buscar'>

        <input 
        type="text" 
        required
        value={cidade} 
        onChange={handleInput} 
        
        placeholder="Digite o nome da sua cidade" >
           
  
        </input>
          <div className='button-svg'>
            <button type='submit'  ><FaSearch size={22} color="#FFF"/></button>

          </div>
         
        </div>
         


          
        </form>
     
     </div>
     <ToastContainer autoClose={2000}></ToastContainer>
     {modalIsOpen&&(
                    <ModalTemp  
                    conteudo={dadosapi} 
                    close={togglePostModal}
                    >  
                    </ModalTemp>       
            
            )}
      
     </Fragment>
  )
  }