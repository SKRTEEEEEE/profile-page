
import { FullTechData } from "@/types/ui";
import { BreadcrumbItem, Breadcrumbs, Chip } from "@nextui-org/react";

type UserDescAdminTechTableProps = {
  item: FullTechData;
}

const UserDescAdminTechTable: React.FC<UserDescAdminTechTableProps> = ({ item }) => {
  return (
    <div>
      {item?.isFw && item?.isLib ? (
        <Breadcrumbs isDisabled>
          <BreadcrumbItem><i className="text-primary-300/30 text-xs">From: </i>{item.isFw}</BreadcrumbItem>
          <BreadcrumbItem>{item.isLib}<Chip radius="sm" size="sm" color="secondary" variant="bordered" classNames={{
        base: "bg-gradient-to-br from-indigo-500/20 to-pink-500/30 shadow-pink-200/80",
        content: "drop-shadow shadow-black text-white",
      }}>{item.preferencia}</Chip></BreadcrumbItem>
          
        </Breadcrumbs>
      ) : item?.isFw ? (
        <Breadcrumbs isDisabled>
          <BreadcrumbItem><i className="text-primary-300/30 text-xs">From: </i>{item.isFw}<Chip classNames={{
        base: "bg-gradient-to-br from-indigo-500/20 to-pink-500/20 shadow-pink-500/30",
        content: "drop-shadow shadow-black text-white",
      }} radius="sm" size="sm" color="secondary" variant="bordered">{item.preferencia}</Chip></BreadcrumbItem>
          
        </Breadcrumbs>
      ) : null}
    </div>
  );
};

export default UserDescAdminTechTable;
