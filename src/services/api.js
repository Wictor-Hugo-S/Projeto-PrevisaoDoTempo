import axios from "axios"



const api=axios.create({
    baseURL:'https:/api.openweathermap.org/data/2.5/weather?q=São Paulo&appid=19171dd36794cb695d56f1ea1fa2e855',
})

//chave 19171dd36794cb695d56f1ea1fa2e855

export default api
//&city_name=${cidade}


//chave 4c3a1438


//lat=${lat}&lon=${long}&units=imperial&APPID=95b11822eb429c84c1143a19251b1881`;