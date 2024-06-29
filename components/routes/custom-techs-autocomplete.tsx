"use client"

import { TechBadge } from "@/types/ui";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";


type CustomAsyncAutocompleteProps = {
    items: TechBadge[]; // Puedes ajustar el tipo según sea necesario
    label: string;
    placeholder: string;
    description?: string;
    name: string;
    isRequired?: boolean;
}

const CustomAsyncAutocomplete: React.FC<CustomAsyncAutocompleteProps> = ({
    items,
    label,
    placeholder,
    description, 
    name,
    isRequired = false,
}) => {
    const list = useAsyncList<TechBadge>({
        async load({ signal, filterText }) {
            let searchText = filterText ? filterText.toLowerCase() : "";
            let filteredItems = items.filter(item =>
                item.name.toLowerCase().includes(searchText)
            );
            return {
                items: filteredItems,
            };
        },
    });

    return (
        <Autocomplete
            className="max-w-xs"
            inputValue={list.filterText}
            isLoading={list.isLoading}
            items={list.items}
            label={label}
            description={description}
            placeholder={placeholder}
            variant="bordered"
            onInputChange={list.setFilterText}
            name={name}
            isRequired={isRequired}
        >
            {(item) => (
                <AutocompleteItem key={item.name} className="capitalize">
                    {item.name}
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
};

export default CustomAsyncAutocomplete;