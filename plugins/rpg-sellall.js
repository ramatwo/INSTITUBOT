const xpperlimit = 300
let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let fkontak = { 
        "key": { 
            "participants":"0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net"
    }

    const itemsToSell = {
        esmeralda: { money: pickRandom([1000]) },
        tiketcoin: { money: pickRandom([2, 2, 3, 2]) },
        berlian: { money: pickRandom([1000]) },
        magia: { money: pickRandom([100]) },
        token: { diamante: 10 },
        diamanteplus: { diamante: 5 },
       // agua: {money: pickRandom([500]) },
        trash: {money: pickRandom([200]) },
        wood: { money: pickRandom([1000]) },
    
        rock: { money: pickRandom([500]) },
        batu: { money: pickRandom([100]) },
        string: { money: pickRandom([200]) },
        iron: { money: pickRandom([1000]) },
       // coal: { money: pickRandom([200]) },
        botol: { money: pickRandom([100]) },
        
        kardus: { money: pickRandom([1000]) },

        eleksirb: { money: pickRandom([500]) },
        emas: { money: pickRandom([400]) },
        sampah: { money: pickRandom([3000]) },
        serigala: {money: pickRandom([2, 2, 3,2]) },
        sword: { money: pickRandom([800]) },
        umpan: { money: pickRandom([100]) },
        healtmonster: { money: pickRandom([1000]) },
        pancingan: { money: pickRandom([300]) },
        

        common: { money: pickRandom([100]) },
        uncoommon: { money: pickRandom([1000]) },
        mythic: { money: pickRandom([5000]) },
        pet: { money: pickRandom([1000]) },
       
        gardenboxs: { money: pickRandom([1000]) },
    }

    let totalGanancia = 0
    let soldItems = []
    
    for (let item in itemsToSell) {
        if (user[item]) {
            let paymentMethod = Object.keys(itemsToSell[item]).find(v => v in user)
            let totalItem = user[item]
            let gananciaItem = itemsToSell[item][paymentMethod] * totalItem

            // Actualizamos el saldo del usuario
            user[paymentMethod] += gananciaItem
            totalGanancia += gananciaItem

            // Restamos los ítems vendidos
            user[item] = 0
            soldItems.push(`Vendiste ${totalItem} ${global.rpgshop.emoticon(item)} y ganaste ${gananciaItem} ${global.rpgshop.emoticon(paymentMethod)}`)
        }
    }

    if (soldItems.length === 0) {
        return await conn.reply(m.chat, `No tenés ninguno de los ítems seleccionados para vender.`, fkontak)
    }

    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4201)
    
    let resultMessage = `*––『 ORDEN DE VENTA 』––*\n\n📊 *Ganancia total: ${totalGanancia}*\n${readMore} ${soldItems.join('\n')}`
    await conn.reply(m.chat, resultMessage, fkontak)

    user.lastmiming = new Date * 1
}
handler.help = ['sellall']
handler.tags = ['rpg']
handler.command = /^sellall$/i
handler.disabled = false
handler.register = true
handler.rowner = false
handler.premium = true
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
