import { useEffect, useState } from 'react'

import moment from 'moment'
import 'moment/locale/pt-br'

import './style.css'

import {FiX}from 'react-icons/fi'
import {AiFillInfoCircle} from 'react-icons/ai'

import Card from '../Card'

import chuva from '../../assets/chuva2.jpg'
import chuvanoite from '../../assets/chuvanoite.jpg'
import diasol from '../../assets/diasol.jpg'
import noitesol from '../../assets/noitesol.jpg'


const COLOR_BLUE='#222a33'
export default function ModalTemp({conteudo,close}){
  
    const [background,setBackground]=useState('#222a33')
    const [corModal,setCorModal]=useState('red')

    const[color,setColor]=useState(COLOR_BLUE)

   

    useEffect(()=>{
        if(conteudo){
   
    const isday=conteudo.current.is_day
    const condition= conteudo.forecast.forecastday[0].day.condition.code
    

    switch(true){
        case isday===0 &&condition>=1030:
            setBackground(chuvanoite)
            setColor('#0f1221')
            setCorModal('#1f2120,#292b2a,#393b39')
            break;


        case isday===1 &&condition>=1030:
            setBackground(chuva)
            setColor('#012752')
            setCorModal('#15365a,#223f5e,#0f2846')
        break;
       

        case isday===1:
            setBackground(diasol)
            setColor('#302507')
            setCorModal('#402a03,#805300,#87701a')
        break;
        case isday===0:
            setBackground(noitesol)
            setColor('#0f1221')
            setCorModal('#070226,#0d0542,#2d445c')
        break;
        

        default:setBackground('')
        
    }
}
},[conteudo])

    

    return(
        
        <div style={{backgroundImage:`linear-gradient(${corModal})`}} className='modal'>
             {conteudo?(
            <div style={
                {backgroundImage: `linear-gradient(to bottom, transparent 5%,${color} 90%), url(${background})`,
                backgroundSize:"100% 100%",
                backgroundRepeat: "no-repeat"}} className='container'>
                
                <button className='close' onClick={close}> 
                    <FiX size={23} color="FFF"> </FiX>
                  
                </button>
                <div>
                   
                    <h1>{`${conteudo.location.name}`}</h1>

                    <div className='row'>
                        <div className='clima-atual'>

                            <h5>Clima atual<br/>{moment(conteudo.location.localtime). format('HH:mm')}</h5>

                        </div>
                    </div>

                    <div className='row'>
                        
                        <div className='clima'>
                            <img src={conteudo.current.condition.icon}></img>
                            <span style={{display:'flex'}}>{parseInt(conteudo.current.temp_c)} <div style={{marginLeft:'-2px',marginTop:'-6px',fontSize:'20px'}}>ºC</div></span>
                         
                            <span style={{display:'flex'}}> Sensação Térmica {parseInt(conteudo.current.feelslike_c)} <div style={{marginLeft:'0px',marginTop:'-2px',fontSize:'10px'}}> ºC </div></span>
  
                        </div>
                      
                        
                    </div>
                    <div className='temperatura'>
                        <p style={{display:'flex'}}> {conteudo.forecast.forecastday[0].day.condition.text}, e a temperatura minima será de {parseInt( conteudo.forecast.forecastday[0].day.mintemp_c)}<div style={{marginLeft:'2px',marginTop:'2px',fontSize:'10px'}}>ºC</div></p>
                    </div>
                    <div className='row'>
                        
                         <div className='condicoes-climaticas'>
                            <p  className='vento tooltip'>Vento <AiFillInfoCircle size={12}/>  <br/> { parseInt( conteudo.current.wind_kph)}km/h
                                <p style={{width:'150px'}} className='tooltiptext'>{`${conteudo.current.wind_mph > 0 && conteudo.current.wind_kph <=20  ?`Vento Suave(${parseInt(conteudo.current.wind_mph)}-${parseInt(conteudo.current.wind_kph)})` 
                                :`Vento Forte (${parseInt(conteudo.current.wind_mph)}-${parseInt(conteudo.current.wind_kph)}) `}`}km/h</p>
                            </p>
                            <p className='tooltip'>Umidade <AiFillInfoCircle size={12}/><br/>{conteudo.current.humidity}%
                                <p className='tooltiptext'>A umidade hoje está em presente no ar em relação a quantidade máxima de umidade que o ar pode conter na temperatura atual</p>
                            </p>
                            <p className='tooltip'>Visibilidade <AiFillInfoCircle size={12}/>  <br/>{conteudo.current.vis_km}km/h 
                                <p style={{width:'150%'}} className='tooltiptext'>{`${conteudo.current.vis_miles > 0 && conteudo.current.vis_km <=15  ?`Boa visibilidade(${conteudo.current.vis_miles}-${conteudo.current.vis_km})` :`Mal visibilidade (${conteudo.current.vis_miles}-${conteudo.current.vis_km}) `}`}km</p>
                            </p>
                            <p className='tooltip'>Pressão <AiFillInfoCircle size={12}/>  <br/>{conteudo.current.pressure_mb}mb  
                                <p className='tooltiptext'>A pressão é o peso do ar. A pressão fisica padrão é 1.013.25mb.A pressão mais alta está associada ao clima ensolarado, já a pressão mais baixa quando há chuvas,tempestades</p>
                            </p>
                         </div>
                 
                    </div>
                    
                   <div className='nome-previsao'>
                        <h2>Previsão de 3 dias</h2>
                        <Card dados={conteudo}  />
                    </div>
                           
            </div>
            
        </div>
         ):null}
        </div>
        
    )
}

