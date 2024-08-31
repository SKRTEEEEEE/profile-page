"use client"

import { generatePayload, isLoggedIn, login, logout } from "@/actions/auth"
import { client } from "@/core/infrastructure/connectors/thirdweb-auth";
import { ConnectButton, darkTheme } from "thirdweb/react"
import { createWallet, inAppWallet } from "thirdweb/wallets";
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
export const CConectButton =  () =>{
      
    return(
        <ConnectButton
        theme={darkTheme({
          colors: {
            connectedButtonBg: "#6b6b6b",
            connectedButtonBgHover: "#a6a6a6",
            accentButtonText: "#ffffff",
            secondaryButtonText: "#ffffff",
            primaryText: "#ffffff",
            selectedTextColor: "#000000",
            secondaryText: "#000000",
            modalBg: "#2d2a2a",
          },
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
        connectButton={{ label: "Iniciar sesión" }}
        
        auth={{
            isLoggedIn: async (address:string )=> {
                console.log("check if logged in: ", {address})
                return await isLoggedIn()
            },
            doLogin: async (params) => {
                console.log("loggin in!")
                await login(params)
            },
            getLoginPayload: async ({address}) => generatePayload({address}),
            doLogout: async () => {
                console.log("logging out!")
                await logout()
            }
        }}/>
    )
}