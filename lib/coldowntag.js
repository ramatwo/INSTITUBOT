const cooldowns = {}; // Objeto para almacenar los cooldowns por chat

export const setCooldown = (chatId, duration) => {
    cooldowns[chatId] = Date.now() + duration;
};

export const isCooldownActive = (chatId) => {
    if (!(chatId in cooldowns)) return false;
    const timeLeft = cooldowns[chatId] - Date.now();
    return timeLeft > 0 ? timeLeft : false;
};