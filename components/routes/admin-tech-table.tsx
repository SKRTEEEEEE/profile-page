"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Chip, Tooltip, User} from "@nextui-org/react";
import { IJsonTech } from "@/types";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import DeleteTechButton from "./delete-tech-button";
import { lenguajesResources } from "@/data/data";
import UserDescAdminTechTable from "./user-desc-admin-tech-table";
import TopContentAdminTechTable from "./top-content-admin-tech-table";

interface AdminTechTableProps {
  lenguajes: IJsonTech[];
}

const AdminTechTable: React.FC<AdminTechTableProps> = ({ lenguajes }) => {

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(lenguajes.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return lenguajes.slice(start, end);
  }, [page, lenguajes]);

  const renderCell = (item: IJsonTech, columnKey: string) => {
    switch (columnKey) {
      case "name":
        const language = lenguajesResources.find(lang => lang.title === item.name);
        return <TableCell>
          <User
            avatarProps={{ radius: "lg", src: language?.img, icon: language?.icon }}
            // description={item.isFw}
            description={<UserDescAdminTechTable item={item}/>}
            name={item.name}
          // name={cellValue}
          >
            {item.name}
          </User></TableCell>
      case "color":
        return <TableCell className="hidden sm:table-cell">{getColorChip(getKeyValue(item, columnKey))}</TableCell>;
      case "actions":
        return (
          <TableCell className="relative flex items-center gap-2">
            {/* <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <LuDelete />
              </span>
            </Tooltip> */}
            <Tooltip content="Edit user">
              <Link href={`techs/${item.name}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CiEdit size={"45px"} />
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteTechButton name={item.name} />
              </span>
            </Tooltip>
          </TableCell>
        );
      
      case "experiencia":
        return <TableCell className="hidden sm:table-cell">{getKeyValue(item, columnKey)}</TableCell>;
      case "afinidad":
        return <TableCell className="hidden sm:table-cell">{getKeyValue(item, columnKey)}</TableCell>;
      default:
        return <TableCell

        >{getKeyValue(item, columnKey)}</TableCell>;
    }
  };

  const getColorChip = (color: string) => {
    console.log("color: ", color)
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
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        topContent={<TopContentAdminTechTable/>}
        topContentPlacement="inside"
        classNames={{
          wrapper: ["min-h-[222px]", "sm:min-w-[50dvw]", "min-w-[100dvw]"],
          table: [ "mt-6"],
        }}


      >
        <TableHeader>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="afinidad" className="hidden sm:table-cell">Afinidad</TableColumn>
          <TableColumn key="experiencia" className="hidden sm:table-cell">Experiencia</TableColumn>
          <TableColumn className="hidden sm:table-cell" key="color">Color</TableColumn>
          {/* <TableColumn key="isFw" className="hidden sm:table-cell">Is FW</TableColumn>
          <TableColumn key="isLib" className="hidden sm:table-cell">Is Lib</TableColumn> */}
          <TableColumn key="actions" >Actions</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.name}>

              {(columnKey) => (
                renderCell(item, columnKey as string)
              )}
            </TableRow>
          )}
        </TableBody>
      </Table></div>
  );
};

export default AdminTechTable;

