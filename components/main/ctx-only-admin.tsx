import { isAdmin } from "@/actions/auth";

const CtxAdminView = async ({ children }: { children: React.ReactNode}) => {
    // let{isAdmin} = useContext(AdminContext)
    // console.log(AdminContext)
    const userIsAdmin = await isAdmin()
    return (
        <div>
            {userIsAdmin&&
            children}
        </div>
    );
  };
  
  export default CtxAdminView;