let cooldowns = {};

const ipAddresses = [
    '192.28.211.234', '186.169.1.25', '172.16.0.1', '192.168.1.65'
];

const ssNumbers = [
    '6979191519182016', '4817895615901011', '4587282937592385', '12i84178461508132'
];

const macAddresses = [
    '5A:78:3E:7E:00', '00:1A:2B:3C:4D:5E', '6F:78:9A:BC:DE:F0', '01:23:45:67:89:AB'
];

const isps = [
    'TORNADO SLK PRODUCTION', 'Ucom Universal', 'Comcast', 'AT&T'
];

const dnsAddresses = [
    '8.8.8.8', '1.1.1.1', '8.8.4.4', '9.9.9.9'
];

const routerVendors = [
    'ERICSSON', 'TP-LINK', 'NETGEAR', 'D-LINK'
];

const deviceVendors = [
    'WIN32', 'LINUX', 'MAC', 'ANDROID'
];

const connectionTypes = [
    'TORNADO SLK PRODUCTION', 'TPLINK COMPANY', 'NETGEAR SYSTEM', 'D-LINK NETWORK'
];

const ports = [
    '8080', '80', '443', '21'
];

const externalMacs = [
    '6U:77:89:ER:O4', '01:23:45:67:89:AB', 'AA:BB:CC:DD:EE:FF', '11:22:33:44:55:66'
];

const modemJumps = [
    '58', '63', '71', '85'
];

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

var handler = async (m, { conn, text }) => {
   // let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }  
    let user = global.db.data.users[m.sender]

    if (!text) throw '*⚠️ INGRESÁ EL @TAG DE ALGUN USUARIO*';
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '*⚠️ INGRESÁ EL @TAG DE ALGUN USUARIO*';

    let start = `*🔍 Buscanddo información...*`;
   // let boost5 = `*${pickRandom(['81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100'])}%*`;

    const { key } = await conn.sendMessage(m.chat, {text: `${start}`}, {quoted: m});

    await delay(3000 * 1);
     let doxeo = `*_✅ Encontré esta información de ${text}_*\n\n*Nombre:* ${text}\n*Ip:* ${pickRandom(ipAddresses)}\n*N:* ${Math.floor(Math.random() * 10000)} ${Math.floor(Math.random() * 10000)}\n*W:* ${Math.random().toFixed(4)}\n*SS NUMBER:* ${pickRandom(ssNumbers)}\n*IPV6:* ${Math.random().toString(16).slice(2, 12)}::${Math.random().toString(16).slice(2, 12)}::${Math.random().toString(16).slice(2, 12)}::${Math.random().toString(16).slice(2, 12)}%\n*UPNP:* ${pickRandom(['Enabled', 'Disabled'])}\n*DMZ:* ${pickRandom(ipAddresses)}\n*MAC:* ${pickRandom(macAddresses)}\n*ISP:* ${pickRandom(isps)}\n*DNS:* ${pickRandom(dnsAddresses)}\n*ALT DNS:* ${pickRandom(dnsAddresses)}\n*DNS SUFFIX:* ${pickRandom(['Tornado Wi-Fi', 'Dlink', 'Network', 'Local'])}\n*WAN:* ${pickRandom(ipAddresses)}\n*WAN TYPE:* ${pickRandom(['private nat', 'public', 'dynamic', 'static'])}\n*GATEWAY:* ${pickRandom(ipAddresses)}\n*SUBNET MASK:* ${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}\n*UDP OPEN PORTS:* ${pickRandom(ports)}\n*TCP OPEN PORTS:* ${pickRandom(ports)}\n*ROUTER VENDEDOR:* ${pickRandom(routerVendors)}\n*DEVICE VENDEDOR:* ${pickRandom(deviceVendors)}\n*CONNECTION TYPE:* ${pickRandom(connectionTypes)}\n*ICMPHOPS:* ${pickRandom(ipAddresses)} ${pickRandom(ipAddresses)} ${pickRandom(ipAddresses)}\n${pickRandom(['host-132.12.32.167.ucom.com', 'host-132.12.111.ucom.com', '36.134.67.189 216.239.78.11', 'Sof02s32inf14.1e100.net'])}\n*HTTP:* ${pickRandom(ipAddresses)}:433-->${pickRandom(ipAddresses)}:80\n*Http:* ${pickRandom(ipAddresses)}-->${pickRandom(ipAddresses)}:80\n*Http:* ${pickRandom(ipAddresses)}-->${pickRandom(ipAddresses)}:971\n*Upd:* ${pickRandom(ipAddresses)}-->${pickRandom(ipAddresses)}:7265288\n*Tcp:* ${pickRandom(ipAddresses)}-->${pickRandom(ipAddresses)}:62227.7\n*Tcp:* ${pickRandom(ipAddresses)}-->${pickRandom(ipAddresses)}:67wu2\n*Tcp:* ${pickRandom(ipAddresses)}-->${pickRandom(ipAddresses)}:8615\n*EXTERNAL MAC:* ${pickRandom(externalMacs)}\n*MODEM JUMPS:* ${pickRandom(modemJumps)}`;
    await conn.sendMessage(m.chat, {text: `${doxeo}`,mentions: conn.parseMention(doxeo), edit: key});
   

   // m.reply(doxeo, null, { mentions: conn.parseMention(doxeo) });

    user.prue = new Date * 1;
};

handler.help = ['doxear'];
handler.tags = ['juegos'];
handler.command = /^Doxxeo|doxxeo|doxxear|Doxxear|doxeo|doxear|doxxeame|doxeame/i;
handler.group = true;
handler.register = true;
handler.rowner = false;
export default handler;
