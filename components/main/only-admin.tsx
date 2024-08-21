// "use client"

import CtxAdminView from "./ctx-only-admin";

// useContext no funciona, tampoco traer ninguna funcion, me gustaria probar un estilo el cual sea dynamico usando css

// import { isAdmin } from "@/actions/auth";

// import { useContext } from "react";

// import { AdminContext } from "./custom-connect-button";

// import { createContext } from "react";


 const OnlyAdminView = async ({ children }: { children: React.ReactNode}) => {
    // let{isAdmin} = useContext(AdminContext)
    // console.log(AdminContext)
    // const userIsAdmin = await isAdmin()
    return (
        <div>
            <CtxAdminView>
            <h6>Hola don pepito</h6>
            {children}
            </CtxAdminView>
        </div>
    );
  };
  
  export default OnlyAdminView;
  