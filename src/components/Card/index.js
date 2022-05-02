
import { useEffect, useState } from 'react'
import './style.css'

import moment from 'moment'
import 'moment/locale/pt-br'
import {FaCloudRain} from 'react-icons/fa'

import chuva2 from '../../assets/chuva2.jpg'
import chuvanoite from '../../assets/chuvanoite.jpg'
import diasol from '../../assets/diasol.jpg'
import noitesol from '../../assets/noitesol.jpg'




export default function Card({dados}){
    const [forecast, setForeCast]=useState([])
        
    useEffect(()=>{
    
        const conteudo=dados.forecast.forecastday
        conteudo.map(item=>{
            return{
                ...item,isExpand:false
            }
        })

        conteudo[0].isExpand=true
      
        setForeCast(conteudo);
       
        
    },[dados])

    
   



    function expandItem(index){
        if(forecast[index].isExpand===true) 
            return;
           
        
      const newForecast=  forecast.map((item,indice)=>{
            return indice===index?{
                ...item,isExpand:true
            }:
            {
            ...item,isExpand:false
            }

        })
        setForeCast(newForecast)

    }
    
        // const cloneForeCast= [...forecast]
        // const itemExpandido=cloneForeCast[index]
        // itemExpandido.isExpand=true
        // const isDisable=cloneForeCast.filter((item,indice)=>indice!==index)
        // isDisable.forEach(item=>item.isExpand=false)
        // const  newForecast=[itemExpandido,...isDisable,]
        // const= 
        //    setForeCast(newForecast)

    function convertDate(date,index){
        
        if(index===0)return 'Hoje'
        moment.locale('pt-br')
        return moment(date).format('ddd')+ '.' + moment(date).date()
    }
    return(
       

                <div className='row-card'>

                            
                                {forecast.map((item,index)=>{
                                    return(
                                    
                                    <div 
                                   style={{opacity:'0.8'}}  onClick={()=>expandItem(index)} className={`previsoes ${item.isExpand?'expand':'' }`} 
                                    key={index}>       
                            <p> {convertDate(item.date,index)}</p>
                                    <div className='wrapper'>
                                        <img src={item.day.condition.icon}></img>
                                        <div className='condition'>
                                            <div className='texto-condition'>
                                                <p> {parseInt(item.day.maxtemp_c)}º</p> 
                                                <p>{item.isExpand? item.day.condition.text:''}</p>
                                            </div>
                                        <div className='texto-condition2'>
                                            <p> {parseInt(item.day.mintemp_c)}º</p>
                                                {item.isExpand?(

                                                <div className='texto-chance-chuva'>
                                                 <p className='tooltip'><FaCloudRain size={20}/>
                                                <p className='tooltiptext'>Probabilidade de chover</p>
                                                 </p> 
                                             <p className='tooltip'>{ item.day.daily_chance_of_rain }%
                                             <p className='tooltiptext'>Probabilidade de chover</p>
                                             </p>
                                             </div>
                                             ):''}
                                            </div>
                                      
                                        </div>
                             
                              </div>
                              </div>
                                    
                                )})}
                              
                          
                            </div>
                
        
    )
}