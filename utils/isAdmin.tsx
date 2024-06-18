import { IAdmins } from '@/models/user-schema';
import { useActiveAccount } from 'thirdweb/react';

export const useIsAdmin = () => {
  const account = useActiveAccount();

  
  const isAdmin = account?.address === process.env.ADMIN_USER;


  return { isAdmin, account };
};


export interface FlattenedAdmin {
  userId: string;
  address: string;
}

export const flattenAdmin = (admins: IAdmins[]): FlattenedAdmin[] => {
  return admins.map(admin => ({
      userId: admin.userId.toString(),  // Convertir ObjectId a string
      address: admin.address.toString(),
  }));
};
