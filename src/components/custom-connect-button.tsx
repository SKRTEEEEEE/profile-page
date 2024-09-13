"use client"

import { generatePayload, isLoggedIn, login, logout } from "@/actions/auth"
import { rd } from "@/actions/revrd";
import { client } from "@/core/infrastructure/connectors/thirdweb-auth";
import { ConnectButton, darkTheme } from "thirdweb/react"
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
const wallets = [
    inAppWallet({
      auth: {
        options: [
          "google",
          "discord",
          "telegram",
          "email",
          "facebook",
          "passkey",
          "phone",
          "apple",
        ],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
    createWallet("app.hashpack"),
    createWallet("org.uniswap"),
    createWallet("com.okex.wallet"),
    createWallet("ai.hacken"),
    createWallet("com.trusteeglobal"),
    createWallet("com.thirdweb"),
    createWallet("com.coinsdo"),
    createWallet("us.binance"),
    createWallet("dev.auroracloud"),
    createWallet("zone.bitverse"),
    createWallet("co.xellar"),
    createWallet("app.subwallet"),
    createWallet("com.kraken"),
    createWallet("com.alphawallet"),
    createWallet("org.mathwallet"),
    createWallet("com.bitget.web3"),
    createWallet("com.trustwallet.app"),
    createWallet("com.ledger"),
    createWallet("com.bybit"),
    createWallet("com.safepal"),
    createWallet("pro.tokenpocket"),
    createWallet("xyz.timelesswallet"),
    createWallet("global.safe"),
    createWallet("io.1inch.wallet"),
    createWallet("com.robinhood.wallet"),
    createWallet("com.crypto"),
    createWallet("com.exodus"),
    createWallet("im.token"),
    createWallet("com.blockchain"),
    createWallet("com.zengo"),
    createWallet("com.mewwallet"),
    createWallet("app.keyring"),
    createWallet("xyz.frontier.wallet"),
    createWallet("app.omni"),
    createWallet("app.onto"),
    createWallet("com.fireblocks"),
    createWallet("technology.obvious"),
    createWallet("co.lobstr"),
    createWallet("com.ambire"),
    createWallet("com.bitcoin"),
    createWallet("io.internetmoney"),
    createWallet("app.walletnow"),
    createWallet("com.mtpelerin"),
    createWallet("io.alpha-u.wallet.web"),
  ];
//   detailsButton={{
//     render: () => <p>🧠</p>
// }}

// Definir el tipo de las claves del diccionario
// type PrimaryThemeKey = "primary-light-gray" | "primary-dark-gray" | "primary-light-gold" | "primary-dark-gold" | "primary-light-neon" | "primary-dark-neon" | "primary-light-sky" | "primary-dark-sky" | "primary-light-soft" | "primary-dark-soft";

// // Diccionario de colores primarios en formato hexadecimal
// const primaryThemeColors: Record<PrimaryThemeKey, string> = {
//   "primary-light-gray": "#d3d3d3", // Color primario para el tema "primary-light-gray"
//   "primary-dark-gray": "#404040",  // Color primario para el tema "primary-dark-gray"
//   "primary-light-gold": "#ffdd57", // Color primario para el tema "primary-light-gold"
//   "primary-dark-gold": "#b8860b",  // Color primario para el tema "primary-dark-gold"
//   "primary-light-neon": "#39ff14", // Color primario para el tema "primary-light-neon"
//   "primary-dark-neon": "#0b3d0b",  // Color primario para el tema "primary-dark-neon"
//   "primary-light-sky": "#87cefa",  // Color primario para el tema "primary-light-sky"
//   "primary-dark-sky": "#1e90ff",   // Color primario para el tema "primary-dark-sky"
//   "primary-light-soft": "#ffb6c1", // Color primario para el tema "primary-light-soft"
//   "primary-dark-soft": "#a52a2a"   // Color primario para el tema "primary-dark-soft"
// };


export const CConectButton =  ({connectButtonLabel="Iniciar session"}:{connectButtonLabel?:string}) =>{
// Obtén el valor de HSL desde CSS
// const theme = document.documentElement.getAttribute('data-theme') as PrimaryThemeKey | null;; // Obtener el tema actual
// console.log("theme: ",theme)
// // Verificar si el tema existe en el diccionario
// let backgroundColor;
// if (theme && primaryThemeColors[theme]) {
//   backgroundColor = primaryThemeColors[theme];
// } else {
//   backgroundColor = "#FFFFFF"; // Valor por defecto si el tema no existe o es null
//   console.warn("Tema no definido o inválido: ", theme,". Usando color por defecto: ", backgroundColor);
// }
// console.log("primaryHex: ", backgroundColor)
    return(
        <ConnectButton
        
        theme={darkTheme({
          // colors: {
          //   connectedButtonBg: "#a8a8a8",
          //   connectedButtonBgHover: "#a6a6a6",
          //   accentButtonText: "#ffffff",
          //   secondaryButtonText: "#ffffff",

          //   selectedTextColor: "#000000",
          //   secondaryText: "#000000",
          //   modalBg: "#2d2a2a",
          // },
        })}
        client={client}
        wallets={wallets}
        connectModal={{
            size: "compact",
            showThirdwebBranding: false,
          }}
        locale={"es_ES"}
        detailsModal={{
            footer: () => <p>SKRT👾</p>,
        }}
        // El style parece que si modifica el connectButton w y height
        connectButton={{ label: connectButtonLabel, style:{
          height:  "2.25rem",
          width: "100%",
          borderRadius: "0.25rem",
          fontSize: "0.875rem",
          lineHeight:  "1.25rem",
        }, className: "bg-background hover:shadow-xl hover:shadow-primary h-9 px-4 py-2 " }}
        // 💡 El render lo podemos hacer dinamico para que en mobile muestre el original, podríamos mirar si es necesario/efectivo unificar con Configurar usuario button que tambien es dinamico por props
        detailsButton={{
          render: () => <Button variant={"outline"} className="w-full px-2">    <Wallet width={20} height={20} />
          <span className="inline-block sm:hidden px-2">Tu cartera</span>
          <p className="hidden sm:sr-only">Configuración de tu cartera</p></Button>,
        }}
        auth={{
            isLoggedIn: async (address:string )=> {
                console.log("check if logged in: ", {address})
                return await isLoggedIn()
            },
            doLogin: async (params) => {
                console.log("loggin in!")
                await login(params)
                rd("/academia")
            },
            getLoginPayload: async ({address}) => generatePayload({address}),
            doLogout: async () => {
                console.log("logging out!")
                await logout()
                rd("/academia")
            }
        }}/>
    )
}