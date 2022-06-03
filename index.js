import { Telegraf, Markup } from "telegraf";
import {} from 'dotenv/config'
import express from 'express'
import * as func from './functions.js'
import cors from 'cors'
import fetch from 'cross-fetch'
import 'node-fetch'

const bot = new Telegraf(process.env.BOT_TOKEN);

// global variabls 
let fishJournal = [];
let fishData = {};


const app = express();
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json(fishJournal)
});
app.listen(3000);



bot.start(ctx => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'X-Yandex-API-Key': `${process.env.YANDEX_API}`
                }
        };
        fetch('https://api.weather.yandex.ru/v2/informers?lat=59.938951&lon=30.315635', options)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                let weather = {
                    date: data.forecast.date.slice(0, 10).split('-').reverse().join('.'),
                    temp: `${data.forecast.parts[0].temp_avg}℃`,
                    pressure: `${data.forecast.parts[0].pressure_mm} мм рт.стб`,
                    windSpeed: `${data.forecast.parts[0].wind_speed} м/с`,
                    windDir: func.getDirection(data.forecast.parts[0].wind_dir),
                    humidity: `${data.forecast.parts[0].humidity}%`,
                    moonPhase: func.getMoonPhase(data.forecast.moon_code)
                }
                fishData = weather
                // console.log(weather)
                ctx.replyWithHTML(`Приветствую тебя ${ctx.message.first_name ? ctx.message.first_name : 'рыбак'}\n\nВведи количecтво рыбёх за ${weather.date.slice(0, 10).split('-').reverse().join('.')}:`);
            })
            // End .then
            .catch(err => console.error(err));
        } 
        catch(e){
            console.log(e)
        }
    });

// =========================================================================== Text handlers =============================================================================//

bot.hears(/^\d+$/, ctx => {
        try {
            if(typeof fishData['count'] === "undefined"){
                fishData['count'] = ctx.message.text;
                    ctx.replyWithHTML(`${fishData.count < 3 ? "Мда.. Рыбалка сегодня не удалась... \n\nНо ты не расстраивайся и выбери цветовую оценку дня!" : "Ухх.. как неожиданно и приятно!\n\nРыбалка удалась, Молодец! \nТеперь выбери цветовую оценку дня!"}`, Markup.inlineKeyboard([
                        [Markup.button.callback('Красный', 'redMark_btn'), Markup.button.callback('Желтый', 'yellowMark_btn'), Markup.button.callback('Зеленый', 'greenMark_btn')]
                    ]));
                } 
                else {
                    ctx.reply('Вы уже вводили ко-во своего улова!\n\nВернитесь к цветовой оценки дня или перезапустите бота!')
                }
        } 
        catch (error) {
            console.log(error)
        }
    });

bot.hears(/[а-яА-Я]/, ctx => {
        try {
            if(typeof fishData['description'] === "undefined"){
                fishData['description'] = ctx.message.text;
                    ctx.replyWithHTML(`<b>Замечательно!</b>\n\nДоп. информация <i><b>${fishData.description}</b></i> записана!`, Markup.inlineKeyboard([
                        [Markup.button.callback('Просмотр записи', 'seeReg')]
                    ]))
                    //console.log(weather);
                    } 
                    else {
                        ctx.replyWithHTML(`Вы уже внесли доп.информацию!\n\n<b>${fishData.date}</b> вводить ни чего не надо!\n\nПриходите завтра!`); // Переписать 
                    } 
        } 
        catch (error) {
            console.log(error);
        }
    });

// =============================================== btn handlers =====================================================//

bot.action('redMark_btn', async ctx => {
        try {
            await ctx.answerCbQuery()
            if(typeof fishData['colorRating'] === "undefined"){
                fishData['colorRating'] = '#FF0000';
                    await ctx.replyWithHTML(`<b>Замечательно!</b>\n\nДень оценен как ${func.getNameColor(fishData.colorRating)} видимо рыбалка не удалась!\n\nНе расстраивайся в следуйщий раз повезет!\n\nТеперь можно посмотреть запись или добавить доп. информацию!`, Markup.inlineKeyboard([
                        [Markup.button.callback('Просмотр записи без доп. информации', 'seeReg')]
                    ]))
                    //console.log(weather)
                    }
                    else {
                        await ctx.reply('Вы уже оценили свой день!\n\nПерезапустите бота!'); // Переписать 
                    } 
        } 
        catch (error) {
            console.log(error);
        }
    })
bot.action('yellowMark_btn', async ctx => {
        try {
            await ctx.answerCbQuery()
            if(typeof fishData['colorRating'] === "undefined"){
                fishData['colorRating'] = '#FFFF00';
                    await ctx.replyWithHTML(`<b>Замечательно!</b>\n\nДень оценен как ${func.getNameColor(fishData.colorRating)} видимо рыбалка сегодня средненькая\n\nНу чтож будем надеяться на лучшее!\n\nТеперь можно посмотреть запись или добавить доп. информацию!`, Markup.inlineKeyboard([
                        [Markup.button.callback('Просмотр записи без доп. информации', 'seeReg')]
                    ]))
                    //console.log(weather)
                    } 
                    else {
                        await ctx.reply('Вы уже оценили свой день!\n\nПерезапустите бота!'); // Переписать 
                    } 
        } 
        catch (error) {
            console.log(error);
        }
    })
bot.action('greenMark_btn', async ctx => {
        try {
            await ctx.answerCbQuery()
            if(typeof fishData['colorRating'] === "undefined"){
                fishData['colorRating'] = '#00FF00';
                    await ctx.replyWithHTML(`<b>Замечательно!</b>\n\nДень оценен как ${func.getNameColor(fishData.colorRating)} видимо рыбалка сегодня суперская. Поздравляю!\n\nТы превзошел сам себя! Класс!\n\nТеперь можно посмотреть запись или добавить доп. информацию!`, Markup.inlineKeyboard([
                        [Markup.button.callback('Просмотр записи без доп. информации', 'seeReg')]
                    ]))
                    //console.log(weather)
                    } 
                    else {
                        await ctx.reply('Вы уже оценили свой день!\n\nПерезапустите бота!'); // Переписать 
                    } 
        }
        catch (error) {
            console.log(error);
        }
    })
bot.action('seeReg', async ctx=> {
        try {
            await ctx.answerCbQuery()
            if(typeof fishData['description'] === "undefined"){
                fishData['description'] = 'Нет';
            }
            else {
            await ctx.replyWithHTML(`
📆 Дата:   ${fishData.date}
⛅ Температура:    ${fishData.temp}
📡 Давление:   ${fishData.pressure}
💨 Скорость ветра: ${fishData.windSpeed}
⛳ Направление ветра:  ${fishData.windDir}
💦 Влажность:  ${fishData.humidity}
🌑 Фаза луны:  ${fishData.moonPhase}
🐟 Кол-во улова:   ${fishData.count}
✅ Цвет.оценка:    ${func.getNameColor(fishData.colorRating)}
📝 Доп. информация: ${typeof fishData.description === "undefined" ? "Нет" : fishData.description}`, 
                Markup.inlineKeyboard([
                    [Markup.button.callback('Добавить запись в дневник', 'addReg')]
                ]));
            }
        } 
        catch (error) {
            console.log(error);
            }
    })
bot.action('addReg', async ctx => {
    try {
        ctx.answerCbQuery()
        if(fishJournal.some(item => item.date === `${fishData.date.slice(0, 10).split('-').reverse().join('.')}`)){
            ctx.reply('Запись на сегодня уже была добавлена! Перезапустите бота!');
        }
        else {
            await fishJournal.push(fishData)
            await ctx.replyWithHTML(`Отлично! Запись добавлена в дневник. Ждем вас завтра!`, ctx => {})
        }
    } 
        catch (error) {
            console.log(error);
            }
    });

// =============================================== dwnload fish journal =====================================================//

bot.command('mynotes', async ctx => {
        try {
            await ctx.telegram.sendDocument(ctx.from.id, {
                        source: './index.html',
                        filename: 'index.html'
                    }).catch(function(error){ console.log(error); });

            
            // console.log(JSON.stringify(db))
        }
        catch (error) {
            console.log(error)
        }
    }
);

// Оформить и закончить + еще раз все проверить

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

