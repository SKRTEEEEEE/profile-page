"use client"

import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Chip, Tooltip, User } from "@nextui-org/react";
import { IJsonTech } from "@/types";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { lenguajesResources } from "@/data/data";
import UserDescAdminTechTable from "./user-desc-admin-tech-table";
import TopContentAdminTechTable from "./top-content-admin-tech-table";
import DeleteTechButton from "./delete-admin-tech-button";
import { useActiveAccount } from "thirdweb/react";
import { useIsAdmin } from "@/utils/isAdmin";


interface AdminTechTableProps {
  lenguajes: IJsonTech[];
}
// export const useIsAdmin = (account:any) => {
//   // const account = useActiveAccount();
  

  

//   return isAdmin;
// };


// El revalidate del delete se hace en su funcion del servidor, pero el revalidate del update y del create se llama desde el componente del cliente
const AdminTechTable: React.FC<AdminTechTableProps> = async ({ lenguajes }) => {
  const [page, setPage] = useState<number>(1);

  const [error, setError] = useState<string | null>(null);
  // const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const rowsPerPage = 4;

  // is Admin - [ ] Ver si funciona sin el useEffect -> NO ES NECESARIO(Solo hay que llamar siempre a la re-asignación)
  // const account = useActiveAccount();

  // const [isAdmin, setIsAdmin] = useState(false);
  // useEffect(() => {
  //   setIsAdmin(account?.address === "0x490bb233c707A0841cA52979Be4D88B6621d1988");
  // }, [account]);
  // const account = useActiveAccount();
  // const isAdmin = account?.address === "0x490bb233c707A0841cA52979Be4D88B6621d1988";
  const { isAdmin, account } = await useIsAdmin();
  console.log("isAdmin (TechTable): ",isAdmin)
  console.log("address: ",account?.address)

  // Prepare pagination
  const pages = Math.ceil(lenguajes.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const items = lenguajes.slice(start, end);

  // Celdas de cada fila "estilos"
  const renderCell = (item: IJsonTech, columnKey: string) => {
    switch (columnKey) {
      case "name":
        const language = lenguajesResources.find(lang => lang.title === item.name);
        return (
          <TableCell>
            <User
              avatarProps={{ radius: "lg", src: language?.img, icon: language?.icon }}
              description={<UserDescAdminTechTable item={item} />}
              name={item.name}
            >
              {item.name}
            </User>
          </TableCell>
        );
      case "color":
        return <TableCell className="hidden sm:table-cell">{getColorChip(getKeyValue(item, columnKey))}</TableCell>;
      case "actions":
        return (
          <TableCell className="relative flex items-center gap-2">
            <Tooltip content="Edit tech">
              <Link href={`techs/${item.name}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CiEdit size={"45px"} />
              </Link>
            </Tooltip>
            
              <span className="text-lg text-danger active:opacity-50">
                <DeleteTechButton  name={item.name} onError={(error) => setError(error)}/>
              </span>
            
          </TableCell>
        );
      case "experiencia":
        return <TableCell className="hidden sm:table-cell">{getKeyValue(item, columnKey)}</TableCell>;
      case "afinidad":
        return <TableCell className="hidden sm:table-cell">{getKeyValue(item, columnKey)}</TableCell>;
      default:
        return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
    }
  };

  const getColorChip = (color: string) => {
    return (
      <Chip
        style={{ backgroundColor: `#${color}`, borderWidth: "1px", borderStyle: "solid" }}
        size="sm"
        variant="flat"
      >
        {color}
      </Chip>
    );
  };

  return (
    <div className="flex justify-center">
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center items-center flex-col">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
            <div className="h-6">
              {error && <span>{error}</span>}
            </div>
          </div>
        }
        topContent={
          <TopContentAdminTechTable account={account}/>
        }
        topContentPlacement="inside"
        classNames={{
          wrapper: ["min-h-[222px]", "sm:min-w-[50dvw]", "min-w-[100dvw]"],
          // table: ["mt-6"],
        }}
      >
        <TableHeader>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="afinidad" className="hidden sm:table-cell">Afinidad</TableColumn>
          <TableColumn key="experiencia" className="hidden sm:table-cell">Experiencia</TableColumn>
          <TableColumn className="hidden sm:table-cell" key="color">Color</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => renderCell(item, columnKey as string)}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTechTable;


