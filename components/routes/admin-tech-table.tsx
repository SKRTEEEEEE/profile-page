"use client"

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Chip, Tooltip, User, Spinner } from "@nextui-org/react";
import { IJsonTech } from "@/types";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { lenguajesResources } from "@/data/data";
import UserDescAdminTechTable from "./user-desc-admin-tech-table";
import TopContentAdminTechTable from "./top-content-admin-tech-table";
import { deleteTech } from "@/actions/badges";
import { LuDelete } from "react-icons/lu";
import { fetchLenguajes } from "@/data/fetch";
import { flattenProyectos } from "@/utils/badges";

// interface AdminTechTableProps {
//   lenguajes: IJsonTech[];
// }

const AdminTechTable: React.FC = () => {

  const [lenguajes, setLenguajes] = useState<IJsonTech[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const rowsPerPage = 4;
      // const lenguajes = await fetchLenguajes()

    // const initialLenguajes = flattenProyectos(lenguajes)
    useEffect(() => {
      const loadLenguajes = async () => {
        setIsLoading(true);
        try {
          const data = await fetchLenguajes();
          const allLeng = flattenProyectos(data);
          setLenguajes(allLeng);
        } catch (error) {
          setError("Error al cargar las tecnologías");
        } finally {
          setIsLoading(false);
        }
      };
      loadLenguajes();
    }, []);

  // Prepare pagination
  const pages = Math.ceil(lenguajes.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return lenguajes.slice(start, end);
  }, [page, lenguajes]);

  // Manage delete
  const handleDelete = async (name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const deleted = await deleteTech(name);
      if (deleted) {
        console.log(`${name} eliminado correctamente`);
        // Update the state to remove the deleted item
        setLenguajes(prev => prev.filter(item => item.name !== name));
      } else {
        setError(`No se pudo eliminar ${name}`);
      }
    } catch (error) {
      console.error("Error eliminando tech:", error);
      setError("Error al eliminar la tecnología. Por favor, inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

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
            <Tooltip content="Edit user">
              <Link href={`techs/${item.name}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CiEdit size={"45px"} />
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                {isLoading ? <Spinner size="lg" /> : <LuDelete size={"45px"} onClick={() => handleDelete(item.name)} />}
              </span>
            </Tooltip>
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
              {error && <span>Error: {error}</span>}
            </div>
          </div>
        }
        topContent={<TopContentAdminTechTable />}
        topContentPlacement="inside"
        classNames={{
          wrapper: ["min-h-[222px]", "sm:min-w-[50dvw]", "min-w-[100dvw]"],
          table: ["mt-6"],
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
