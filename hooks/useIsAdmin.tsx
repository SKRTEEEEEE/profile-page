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
