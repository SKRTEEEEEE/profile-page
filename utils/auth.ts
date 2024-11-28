import { IAdmins } from '@/models/user-schema';
import { useActiveAccount } from 'thirdweb/react';
import { FlattenAdmin } from './utils.types';

export const useIsSuperAdmin = () => {
  const account = useActiveAccount();

  
  const isAdmin = account?.address === process.env.ADMIN_USER;


  return { isAdmin, account };
};




export const flattenAdmin = (admins: IAdmins[]): FlattenAdmin[] => {
  return admins.map(admin => ({
      userId: admin.userId.toString(),  // Convertir ObjectId a string
      address: admin.address.toString(),
  }));
};
