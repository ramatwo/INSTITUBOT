/* Creado/adaptado por Bruno Sobrino (https://github.com/BrunoSobrino) */

import fetch from 'node-fetch'
import axios from 'axios'
import { load } from 'cheerio'
let handler = async (m, {text, usedPrefix, command, conn}) => {
if (!text) throw '╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝘼𝙇𝙂𝙐𝙉𝘼 𝙋𝙀𝙇𝙄𝘾𝙐𝙇𝘼 𝘼 𝘽𝙐𝙎𝘾𝘼𝙍'   
let aaaa = await searchC(text)
if (command == 'pelisplus') aaaa = await searchP(text)
if (aaaa == '') throw '╰⊱❌⊱ *𝙁𝘼𝙇𝙇𝙊́ | 𝙀𝙍𝙍𝙊𝙍* ⊱❌⊱╮\n\n𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝙊 𝙉𝙄𝙉𝙂𝙐𝙉𝘼 𝙋𝙀𝙇𝙄𝘾𝙐𝙇𝘼' 
let img = 'https://cinefilosoficial.com/wp-content/uploads/2021/07/cuevana.jpg'
if (command == 'pelisplus') img = 'https://elcomercio.pe/resizer/RJM30xnujgfmaODGytH1rRVOrAA=/400x0/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/BJ2L67XNRRGHTFPKPDOEQ2AH5Y.jpg'
let res = await aaaa.map((v) => `*🎬 • 𝙉𝙊𝙈𝘽𝙍𝙀:* ${v.title}\n*🍿 • 𝙐𝙍𝙇:* ${v.link}`).join`\n\n───────────────\n\n`
let ads = '*💫 • 𝘽𝙇𝙊𝙌𝙐𝙀𝘼𝘿𝙊𝙍 𝘿𝙀 𝘼𝙉𝙐𝙉𝘾𝙄𝙊𝙎 𝙍𝙀𝘾𝙊𝙈𝙀𝙉𝘿𝘼𝘿𝙊:* Block This\n*⛨ • 𝙇𝙄𝙉𝙆:* https://block-this.com/block-this-latest.apk\n\n≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣\n\n'
conn.sendMessage(m.chat, { image: { url: img }, caption: ads + res }, {quoted: m})
}
handler.command = ['cuevana', 'pelisplus']
handler.level = 2
handler.money = 40
handler.register = true
export default handler

const safeLoad = async(url, options = {}) => {
try {
const { data: pageData } = await axios.get(url, options)
const $ = load(pageData) 
return $
} catch (err) {
if (err.response)
throw new Error(err.response.statusText)
throw err }}

async function searchC(query, numberPage = 1) {
const $ = await safeLoad(`https://cuevana3.info/page/${numberPage}/`, {
params: { s: query }})
const resultSearch = []
$(".results-post > article").each((_, e) => {
const element = $(e)
const title = element.find("header > h2").text()
const link = element.find(".lnk-blk").attr("href")
resultSearch.push({ title: title, link: link })})
return resultSearch }

async function searchP(query, numberPage = 1) { 
const $ = await safeLoad(`https://pelisplushd.cx/search/`, {
params: { s: query, page: numberPage }})
const resultSearch = []
$("a[class^='Posters']").each((_, e) => {
const element = $(e)
const title = element.find(".listing-content > p").text()
const link = element.attr("href")
resultSearch.push({ title: title,  link: link })})
return resultSearch }