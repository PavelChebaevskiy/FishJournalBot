import {} from 'dotenv/config'


// функция для определения направления ветра по буквенным обозначениям (RU)
export const getDirection = function(d) {
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

// функция для определения фазы луны (RU)
export const getMoonPhase = function(code) {  
    switch(code){
        case 0: 
            return `Полнолуние`
            break;
        case 1:
            return `Убывающая луна`
            break;
        case 2:
            return `Убывающая луна`
            break;
        case 3:
            return `Убывающая луна`
            break;
        case 4:
            return `Последняя четверть`
            break;
        case 5:
            return `Убывающая луна`
            break;
        case 6:
            return `Убывающая луна`
            break;
        case 7:
            return `Убывающая луна`
            break;
        case 8: 
            return `Новолуние`
            break;
        case 9:
            return `Растущая луна`
            break;
        case 10:
            return `Растущая луна`
            break;
        case 11:
            return `Растущая луна`
                break;
        case 12:
            return `Первая четверть`
            break;
        case 13:
            return `Растущая луна`
            break;
        case 14:
            return `Растущая луна`
            break;
        case 15:
            return `Растущая луна`
            break;
        }
} 

// функция для опреления цыета по HEX коду (RU)
export const getNameColor = function(code){
    switch (code) {
        case '#FF0000':
            return `Красный 💔`
            break;
        case '#FFFF00':
            return `Желтый 💛`
            break;
        case '#00FF00':
            return `Зеленый 💚`
            break;
        default: 
            return `gegewp`
            break;
    }
}


// module.exports.getDirection = function(d) {
//     if (typeof d !== 'number' || isNaN(d)) {
//         return -1;
//     }

//     // keep within the range: 0 <= d < 360
    
//     if (11.25 <= d && d < 33.75) {
//         return "Север, Северо-восток";
//     } else if (33.75 <= d && d < 56.25) {
//         return "Северо-восток";
//     } else if (56.25 <= d && d < 78.75) {
//         return "Восток, Северо-восток";
//     } else if (78.75 <= d && d < 101.25) {
//         return "Восток";
//     } else if (101.25 <= d && d < 123.75) {
//         return "Восток, Юго-восток";
//     } else if (123.75 <= d && d < 146.25) {
//         return "Юго-восток";
//     } else if (146.25 <= d && d < 168.75) {
//         return "Юг, Юго-восток";
//     } else if (168.75 <= d && d < 191.25) {
//         return "Юг";
//     } else if (191.25 <= d && d < 213.75) {
//         return "Юг, Юго-запад";
//     } else if (213.75 <= d && d < 236.25) {
//         return "Юго-запад";
//     } else if (236.25 <= d && d < 258.75) {
//         return "Запад, Юго-запад";
//     } else if (258.75 <= d && d < 281.25) {
//         return "Запад";
//     } else if (281.25 <= d && d < 303.75) {
//         return "Запад, Северо-Запад";
//     } else if (303.75 <= d && d < 326.25) {
//         return "Северо-Запад";
//     } else if (326.25 <= d && d < 348.75) {
//         return "Север, Северо-запад";
//     } else {
//         return "Север";
//     }
// };

// module.exports.getMoonPhase = function(year, month, day) // функция для определения фазы луны (RU)
// {
//     var c = e = jd = b = 0;
//     if (month < 3) {
//         year--;
//         month += 12;
//     }
//     ++month;
//     c = 365.25 * year;
//     e = 30.6 * month;
//     jd = c + e + day - 694039.09; //jd is total days elapsed
//     jd /= 29.5305882; //divide by the moon cycle
//     b = parseInt(jd); //int(jd) -> b, take integer part of jd
//     jd -= b; //subtract integer part to leave fractional part of original jd
//     b = Math.round(jd * 8); //scale fraction from 0-8 and round
//     if (b >= 8 ) {
//         b = 0; //0 and 8 are the same so turn 8 into 0
//     }
//     switch(b){
//         case 0: 
//             return `Новолуние`
//             break;
//         case 1:
//             return `Молодая луна`
//             break;
//         case 2:
//             return `Первая четверть`
//             break;
//         case 3:
//             return `Прибывающая луна`
//             break;
//         case 4:
//             return `Полнолуние`
//             break;
//         case 5:
//             return `Убывающая луна`
//             break;
//         case 6:
//             return `Последняя четверть`
//             break;
//         case 7:
//             return `Старая луна`
//     }

//     // 0 => Новолуние
//     // 1 => Молодая луна
//     // 2 => Первая четверть
//     // 3 => Прибывающая луна
//     // 4 => Полнолуние
//     // 5 => Убывающая луна
//     // 6 => Последняя четверть
//     // 7 => Старая луна
// }

export const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })

    if(!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`)
    }

    return await response.json()
}

export const pushData = (arr, data) => {
    arr.push(data)
}

export const putBinData = (req, data) => {
    req.open("PUT", `https://api.jsonbin.io/v3/b/${process.env.BIN_TOKEN}`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", `${process.env.BASE_TOKEN}`);
    req.send(JSON.stringify(data));
}
