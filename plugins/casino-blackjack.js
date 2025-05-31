let handler = async (m, { conn, text, command, usedPrefix, args }) => { 


if (command == 'blackjack' || command == 'bj') {
    let fa = `❌ RECHAZADO:
Debés usar el comando de la siguiente manera
${usedPrefix}blackjack 100000`.trim()

    if (!args[0]) return m.reply(fa)
    if (isNaN(args[0])) return m.reply(fa)
    let apuesta = parseInt(args[0])

    let users = global.db.data.users[m.sender]

    if (apuesta < 10000) throw `❌ RECHAZADO: Debés apostar un mínimo de 10.000.`
    if (apuesta > 1000000) throw `❌ RECHAZADO: No te emocionés apostando tanto. min 1.000.000`
    if (users.kaleng < apuesta) {
        throw `❌ RECHAZADO: No tenés suficientes recursos. .buy kaleng cantidad para jugar.`
    }
    let time = global.db.data.users[m.sender].lastslot + 300000
    if (new Date - users.lastslot < 300000) return m.reply(`❌ RECHAZADO: Volvé en ${msToTime(time - new Date())} para seguir apostando.`) 
    users.lastslot = new Date * 1

    let deck = shuffleDeck(generateDeck()); // Genera y mezcla la baraja
    let playerHand = [deck.pop(), deck.pop()]; // Reparte 2 cartas al jugador
    let dealerHand = [deck.pop(), deck.pop()]; // Reparte 2 cartas al dealer

    let playerScore = calculateScore(playerHand);
    let dealerScore = calculateScore(dealerHand);

    global.db.data.games = global.db.data.games || {};
    global.db.data.games[m.sender] = {
        playerHand,
        dealerHand,
        deck,
        apuesta,
        playerScore,
        dealerScore
    };

    // Mostrar las manos iniciales
    await m.reply(`🃏 Tu mano: ${displayHand(playerHand)} (Total: ${playerScore})\n🤖 Mano del dealer: ${displayHand([dealerHand[0]])}\n\nMandá *.hit* para pedir otra carta o *.stand* para plantarte.`);
}

// Continuación del juego al recibir "hit" o "stand"
if (command === 'hit' || command === 'stand') {
    // Verificar si el usuario tiene un juego en curso
    if (!global.db.data.games || !global.db.data.games[m.sender]) {
        return m.reply('❌ No tenés un juego en curso. Usá el comando blackjack para comenzar una partida.');
    }

    let game = global.db.data.games[m.sender];
    let users = global.db.data.users[m.sender];
    let { playerHand, dealerHand, deck, apuesta, playerScore, dealerScore } = game;

    if (command === 'hit') {
        playerHand.push(deck.pop());
        playerScore = calculateScore(playerHand);
        game.playerScore = playerScore;

        await m.reply(`🃏 Tu mano: ${displayHand(playerHand)} (Total: ${playerScore})`);

        if (playerScore > 21) {
            // El jugador se pasó de 21
            delete global.db.data.games[m.sender]; // Eliminar juego en curso
            users.kaleng -= apuesta;
            return m.reply(`*PERDISTE!!* ❌ -${apuesta} LATAS\ntu mano se pasó de 21.`);
        }

        // Preguntar si quiere más cartas
        return m.reply(`Mandá *.hit* para pedir otra carta o *.stand* para plantarte.`);
    }

    if (command === 'stand') {
        // El jugador decidió plantarse, ahora juega el dealer
        while (dealerScore < 17) {
            dealerHand.push(deck.pop());
            dealerScore = calculateScore(dealerHand);
            game.dealerScore = dealerScore;
        }

        // Mostrar las cartas finales
        await m.reply(`🃏 Tu mano: ${displayHand(playerHand)} (Total: ${playerScore})\n🤖 Mano del dealer: ${displayHand(dealerHand)} (Total: ${dealerScore})`);

        // Determinar el ganador
        let result;
        if (dealerScore > 21 || playerScore > dealerScore) {
            result = `💸 *GANASTE +${apuesta + apuesta} LATAS*`;
            users.kaleng += apuesta;
        } else if (playerScore === dealerScore) {
            result = `*EMPATE!!* No ganás ni perdés EXP.`;
        } else {
            result = `*PERDISTE!!* ❌ -${apuesta} LATAS`;
            users.kaleng -= apuesta;
        }

        delete global.db.data.games[m.sender]; // Eliminar juego en curso

        return m.reply(result);
    }
}

// Funciones auxiliares para el blackjack

// Generar la baraja
function generateDeck() {
    let suits = ['♠️', '♥️', '♣️', '♦️'];
    let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }

    return deck;
}

// Mezclar la baraja
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Calcular la puntuación de una mano
function calculateScore(hand) {
    let score = 0;
    let aces = 0;

    for (let card of hand) {
        if (card.value === 'A') {
            aces++;
            score += 11;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value);
        }
    }

    // Ajustar el valor de los ases si es necesario
    while (score > 21 && aces) {
        score -= 10;
        aces--;
    }

    return score;
}

// Mostrar la mano
function displayHand(hand) {
    return hand.map(card => `${card.value}${card.suit}`).join(' ');
}

}
handler.help = ['ppt']
handler.tags = ['games']
handler.command = /^(blackjack|bj|hit|stand)$/i
handler.group = true
handler.game = true
handler.register = true
handler.owner = false
export default handler


function msToTime(duration) {
var seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " m " + seconds + " s " 
}



