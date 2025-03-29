<center><img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=MiyamuraBot&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient"/></center>


# 🎵 Miyamura Music Bot

Un bot de discord para administración ee servers y reproducir música en canales de voz utilizando discord-player y discord.js.

### POR EL MOMENTO ESTA DEPENDENCIA TIENE UN ERROR Y NO PUEDE CONECTAR 
- Fue Eliminada Cuando Funcione Se Volvera A Regresar
```bash
 "discord-player-youtubei": "^1.4.2",
```
## 🚀 Características

- 🎶 Reproducir música desde YouTube

- 🔥 Administrar servers

- 🎩 Rpg Faciles

- 🤖 Comandos extras

- 📢 Y mucho mas de miyamura bot


## 📦 Instalación

### Requisitos
- Node.js v16 o superior
 
- Un bot de Discord con los permisos necesarios

- Un token de bot de Discord
## Requisitos

- Una cuenta de Discord
- Instalar la librerias de Node.js
- Una cuenta en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications)

## Paso 1: Crear una Aplicaci贸n en Discord

1. Ve al [Portal de Desarrolladores de Discord](https://discord.com/developers/applications) e inicia sesión con tu cuenta de Discord.
2. Haz clic en el botón **"New Application"**.
3. Asigna un nombre a tu aplicación y haz clic en **"Create"**.

## Paso 2: Crear un Bot

1. Dentro de tu aplicación recién creada, ve a la pestaña **"Bot"** en el menú de la izquierda.
2. Haz clic en el botón **"Add Bot"** y confirma la acción.
3. Ahora deberías ver tu bot en la sección de **"Bot"**.

## Paso 3: Obtener el Token del Bot

1. En la sección **"Bot"**, haz clic en el botón **"Copy"** debajo del campo **"Token"**. Este token es muy importante ya que es la clave para autenticar tu bot.
2. Guarda el token en un lugar seguro, ya que lo necesitar谩s m谩s adelante.
3. [Abre el archivo index.js](https://github.com/CuervoOFC/MIYAMURABOT/blob/main/index.js#L15) y reemplaza `const Token = "YOUR_BOT_TOKEN"` con el token que acabas de copiar:
   ```javascript
   const token = "YOUR_BOT_TOKEN"; // Reemplaza 'YOUR_BOT_TOKEN' con el token de tu bot
   ```

## Paso 4: Invitar el Bot a un Servidor

1. Ve a la pestaña **"OAuth2"** en el menú de la izquierda.
2. En la sección **"OAuth2 URL Generator"**, marca la casilla **"bot"** en **"SCOPES"**.
3. En **"BOT PERMISSIONS"**, selecciona los permisos que desees otorgarle a tu bot.
4. Copia la URL generada y ábrela en tu navegador. Selecciona el servidor al que deseas invitar el bot y haz clic en **"Authorize"**.


### PASOS
### INSTALACIÓN TERMUX 
[`Instalar termux clic aqui`](https://f-droid.org/es/packages/com.termux/)

 1. Clona este repositorio:
 
 2. Ir a index.js y añade tu token de bot:
```index.js 
  renglon 77 entre las "" poner tu token 
```
![App Screenshot](imagenes/2025_0324_114347_Photo.jpg)

 3. Permite a termux acceso a tu almacenamiento
```bash 
  termux-setup-storage
```

 4. Prepara el termux
```bash 
  apt update && apt upgrade && pkg update && pkg upgrade && pkg install bash && pkg install libwebp && pkg install git -y && pkg install nodejs -y && pkg install ffmpeg -y && pkg install wget && pkg install imagemagick -y && pkg install yarn && pkg install nodejs 
```

 5. Clona El repositorio <el tuyo esto es ejemplo>
```bash
  git clone https://github.com/CuervoOFC/MIYAMURABOT
cd MIYAMURABOT
```

 6. Instala las dependencias:
```bash
  npm install
```

 7. Inicia el bot
```bash
  node index.js
```


    
## 🛠 Comandos

#### Ver Comandos De Miyamura Bot

| Comando         | Descripción                                      |
| :------------- | :---------------------------------------------- |
| `!menu` | **Menu Miyamura Bot**. |
| `!listbot` | **Lista De Comandos Miyamura Bot**. |
| `!mascommands` | **Mas Comandos Miyamura Bot**. |


## 📝 Notas
- El bot debe tener permisos para conectarse y hablar en los canales de voz.

- Asegúrate de configurar correctamente las intenciones en el portal de Discord Developer.

## 📸 Capturas de pantalla

![App Screenshot](imagenes/2025_0318_152649_Photo.jpg)


## 🤖 MiyamuraBot 

- [@MiyamuraBot](https://discord.com/oauth2/authorize?client_id=1351073834148823070&permissions=8&integration_type=0&scope=bot)

## Server Bots Powered By Cuervo-Team-Supreme 

- [server](https://discord.gg/WJZEjQng)
## 👨‍💻 Desarrollado por

- [@CuervoOFC](https://github.com/CuervoOFC)

___

![Stars](https://img.shields.io/github/stars/CuervoOFC/MIYAMURABOT?style=social)&nbsp;&nbsp;![Forks](https://img.shields.io/github/forks/CuervoOFC/MIYAMURABOT?style=social)&nbsp;&nbsp;![License](https://img.shields.io/github/license/CuervoOFC/MIYAMURABOT)

___

[![Card](https://github-readme-stats.vercel.app/api/pin/?username=CuervoOFC&repo=MIYAMURABOT&theme=tokyonight)](https://github.com/CuervoOFC/MIYAMURABOT)

___
