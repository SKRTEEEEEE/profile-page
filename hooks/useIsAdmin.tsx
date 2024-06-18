"use client"

import { FlattenedAdmin } from '@/utils/isAdmin';
import { useState, useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react';



const useIsAdmin = (admins: FlattenedAdmin[]) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const account = useActiveAccount();

    useEffect(() => {
        const checkIsAdmin = async () => {
            try {
                if (account?.address) {
                    const isAdminUser = admins.some(admin => admin.address === account.address);
                    setIsAdmin(isAdminUser);
                    console.log("isAdmin (TechTable): ", isAdminUser);
                    console.log("address: ", account.address);
                }
            } catch (error) {
                console.error('Error al verificar si la cuenta es administrador', error);
            }
        };

        checkIsAdmin();
    }, [admins, account]);

    return {isAdmin, account};
};

export default useIsAdmin;

//==============================================================================================================
// "use client"

// import { useState, useEffect } from 'react';
// import { useActiveAccount } from 'thirdweb/react';
// import { fetchAdmins } from '@/data/fetch'; // Ajusta la ruta según tu estructura de archivos
// import { flattenAdmin } from '@/utils/isAdmin';

// interface FlattenedAdmin {
//     userId: string;
//     address: string;
// }

// const useIsAdmin = () => {
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [admins, setAdmins] = useState<FlattenedAdmin[]>([]);
//     const account = useActiveAccount();

//     useEffect(() => {
//         const fetchAndSetAdmins = async () => {
//             try {
//                 const fetchedAdmins = await fetchAdmins();
//                 const flattenAdmins = flattenAdmin(fetchedAdmins)
//                 setAdmins(flattenAdmins);
//             } catch (error) {
//                 console.error('Error al obtener la lista de administradores', error);
//             }
//         };

//         fetchAndSetAdmins();
//     }, []);

//     useEffect(() => {
//         if (admins.length > 0 && account?.address) {
//             const isAdminUser = admins.some(admin => admin.address === account.address);
//             setIsAdmin(isAdminUser);
//             console.log("isAdmin (TechTable): ", isAdminUser);
//             console.log("address: ", account.address);
//         }
//     }, [admins, account]);

//     return { isAdmin, account };
// };

// export default useIsAdmin;

