import React from "react";
import { Input } from "../ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
  isFetching?: boolean;
};

export default function SearchBox({
  search,
  setSearch,
  isFetching
}: Readonly<Props>) {
  return (
    <div className="flex items-center gap-4">
      <Input
        value={search}
        onChange={(e) =>{ 
          setSearch(e.target.value)
        }}
        placeholder="Search"
        className="rounded-lg"
        prefix="search"
      />
      <span className="">{isFetching && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}</span>
    </div>
  );
}
