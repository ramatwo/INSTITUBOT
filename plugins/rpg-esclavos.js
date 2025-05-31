let handler = async (m, { conn, args, command }) => {
    const now = Date.now();
    let user = global.db.data.users[m.sender];
    if (!user.esclavo) user.esclavo = [];

    // Función para actualizar estado de un esclavo
    function updateEsclavo(esclavo) {
        const elapsedMs = now - (esclavo.lastUpdate || now);
        const hours = elapsedMs / 3600000;
        // Pérdida de recursos
        const foodLoss = Math.floor(hours);
        const waterLoss = Math.floor(hours / 2);
        esclavo.food = Math.max(esclavo.food - foodLoss, 0);
        esclavo.water = Math.max(esclavo.water - waterLoss, 0);
        // Salud si falta comida o agua
        if (esclavo.food === 0 || esclavo.water === 0) {
            const healthLoss = Math.floor(hours);
            esclavo.health = Math.max(esclavo.health - healthLoss, 0);
        }
        // Acumular monedas en el esclavo
        const coins = Math.floor(hours * 2000); // 2000 monedas por hora
        esclavo.minedCoins = (esclavo.minedCoins || 0) + coins;
        esclavo.lastUpdate = now;
    }

    // Generar barra de emojis
    function bar(current, max, emoji) {
        const filled = emoji.repeat(current);
        const empty = '❌'.repeat(max - current);
        return filled + empty;
    }

    // Acción global: retirar de todos los esclavos con monedas pendientes
    if (command === 'esclavo' && args[0]?.toLowerCase() === 'retirar' && args.length === 1) {
        user.esclavo.forEach(updateEsclavo);
        let total = 0;
        user.esclavo.forEach(es => {
            if (es.minedCoins > 0) {
                total += es.minedCoins;
                es.minedCoins = 0;
            }
        });
        if (total === 0) return conn.reply(m.chat, '❌ No hay monedas para retirar de ningún esclavo.', m);
        user.money = (user.money || 0) + total;
        return conn.reply(m.chat, `🏧 Retiraste ${total} monedas de todos tus esclavos.`, m);
    }

    if (command === 'esclavos') {
        if (user.esclavo.length === 0) return conn.reply(m.chat, '❌ No tenés esclavos. Comprá uno con .buy esclavo.', m);
        user.esclavo.forEach(updateEsclavo);

        const action = args[0]?.toLowerCase();
        // Acciones globales para todos los esclavos
        if (['hidratar', 'alimentar', 'curar'].includes(action)) {
            let totalUsed = 0;
            switch (action) {
                case 'hidratar':
                    user.esclavo.forEach(es => {
                        const need = 7 - es.water;
                        const used = Math.min(user.agua, need);
                        es.water += used;
                        user.agua -= used;
                        totalUsed += used;
                    });
                    if (totalUsed === 0) return conn.reply(m.chat, '❌ No tienes agua para hidratar a tus esclavos.', m);
                    return conn.reply(m.chat, `💧 Hidrataste a todos tus esclavos al máximo usando ${totalUsed} agua(s).`, m);
                case 'alimentar':
                    const foods = ['ayamb', 'ayamg', 'sapir', 'ssapi'];
                    user.esclavo.forEach(es => {
                        let need = 7 - es.food;
                        while (need > 0) {
                            const foodItem = foods.find(x => user[x] > 0);
                            if (!foodItem) break;
                            es.food++;
                            user[foodItem]--;
                            need--;
                            totalUsed++;
                        }
                    });
                    if (totalUsed === 0) return conn.reply(m.chat, '❌ No tienes comida para alimentar a tus esclavos.', m);
                    return conn.reply(m.chat, `🍗 Alimentaste a todos tus esclavos al máximo usando ${totalUsed} comida(s).`, m);
                case 'curar':
                    user.esclavo.forEach(es => {
                        const need = 7 - es.health;
                        const used = Math.min(user.potion, need);
                        es.health += used;
                        user.potion -= used;
                        totalUsed += used;
                    });
                    if (totalUsed === 0) return conn.reply(m.chat, '❌ No tienes pociones para curar a tus esclavos.', m);
                    return conn.reply(m.chat, `❤️ Curaste a todos tus esclavos al máximo usando ${totalUsed} poción(es).`, m);
            }
        }

        // Mostrar estado individual
        let status = user.esclavo.map((e, i) => {
            const healthBar = bar(e.health, 7, '❤️');
            const foodBar = bar(e.food, 7, '🍗');
            const waterBar = bar(e.water, 7, '💧');
            return `👩‍🌾 Esclavo ${i + 1}:
 ${healthBar}
${foodBar}
${waterBar}
💰 Minado: ${e.minedCoins} monedas`;
        }).join('\n\n');

        const sugerencias = `\n🔧 Para interactuar:\n• .esclavo <número> hidratar [cantidad]\n• .esclavo <número> alimentar [cantidad]\n• .esclavo <número> curar [cantidad]\n• .esclavo <número> retirar\n• .esclavo retirar\n• .esclavos hidratar\n• .esclavos alimentar\n• .esclavos curar`;

        return conn.reply(m.chat, `*ESCLAVOS ${user.esclavo.filter(e => e.health > 0).length}/10*\n${readMore}\n${status}${sugerencias}`, m);
    }

    if (command === 'esclavo') {
        let idx = parseInt(args[0]) - 1;
        let action = args[1]?.toLowerCase();
        let amount = parseInt(args[2]) || 1;
        if (isNaN(idx) || idx < 0 || idx >= user.esclavo.length) return conn.reply(m.chat, '❌ Esclavo inválido. Usá un número válido o .esclavo retirar para todos.', m);
        let esclavo = user.esclavo[idx];
        updateEsclavo(esclavo);
        if (esclavo.health <= 0) {
            user.esclavo.splice(idx, 1);
            return conn.reply(m.chat, `❌ Tu esclavo ${idx + 1} se murió por negligencia.`, m);
        }
        switch (action) {
            case 'hidratar':
                if (user.agua < amount) return conn.reply(m.chat, `❌ No tienes suficiente agua.`, m);
                const addedWater = Math.min(amount, 7 - esclavo.water);
                esclavo.water += addedWater;
                user.agua -= addedWater;
                return conn.reply(m.chat, `💧 Le diste ${addedWater} agua(s) al esclavo ${idx + 1}.\nAgua: ${bar(esclavo.water, 7, '💧')}`, m);

            case 'alimentar':
                let foods = ['ayamb', 'ayamg', 'sapir', 'ssapi'];
                let foodItem = foods.find(x => user[x] > 0);
                if (!foodItem) return conn.reply(m.chat, '❌ No tienes comida disponible.', m);
                const addedFood = Math.min(amount, 7 - esclavo.food);
                esclavo.food += addedFood;
                user[foodItem] -= addedFood;
                return conn.reply(m.chat, `🍗 Le diste ${addedFood} comida(s) al esclavo ${idx + 1}.\nComida: ${bar(esclavo.food, 7, '🍗')}`, m);

            case 'curar':
                if (user.potion < amount) return conn.reply(m.chat, `❌ No tienes suficientes pociones.`, m);
                const addedHealth = Math.min(amount, 7 - esclavo.health);
                esclavo.health += addedHealth;
                user.potion -= addedHealth;
                return conn.reply(m.chat, `❤️ Curaste ${addedHealth} salud(es) al esclavo ${idx + 1}.\nSalud: ${bar(esclavo.health, 7, '❤️')}`, m);

            case 'retirar':
                let earned = esclavo.minedCoins || 0;
                if (earned === 0) return conn.reply(m.chat, `❌ No hay monedas para retirar de tu esclavo ${idx + 1}.`, m);
                user.money = (user.money || 0) + earned;
                esclavo.minedCoins = 0;
                return conn.reply(m.chat, `🏧 Retiraste ${earned} monedas de tu esclavo ${idx + 1}.`, m);

            default:
                return conn.reply(m.chat, '❌ Acción inválida. Usá: hidratar, alimentar, curar o retirar.', m);
        }
    }
};

handler.help = ['esclavos', 'esclavos <hidratar|alimentar|curar>', 'esclavo <número> <hidratar|alimentar|curar|retirar> [cantidad]', 'esclavo retirar'];
handler.tags = ['rpg'];
handler.command = /^(esclavos|esclavo)$/i;
handler.rowner = false;
handler.register = true;

export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)
