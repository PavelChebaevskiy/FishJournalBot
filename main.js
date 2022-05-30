
// функция для определения фазы луны (RU)
const getMoonPhase = (d) => { 
    switch(d){
        case 'nw': 
            return  `Северо-западное`
            break;
        case 'n': 
            return  `Северное`
            break;
        case 'ne': 
            return  `Северо-восточное`
            break;
        case 'e': 
            return  `Восточное`
            break;
        case 'se': 
            return  `Юго-восточное`
            break;
        case 's': 
            return  `Южное`
            break;
        case 'sw': 
            return  `Юго-западное`
            break;
        case 'w': 
            return  `Западное`
            break;
        case 'c': 
            return  `Штиль`
            break;
    }
}

console.log(getMoonPhase('c'))