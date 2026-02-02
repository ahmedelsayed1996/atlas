import { useState } from "react";
import {
  initialSelections,
  initialSearchInputs,
  initialDropdowns,
} from "@/app/constants/searchInitialState";
import {
  SearchSelections,
  SearchInputs,
  DropdownState,
} from "@/app/types/search";

export const useNewSearch = () => {
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<"UNI" | "INS">("UNI");

  const [selections, setSelections] =
    useState<SearchSelections>(initialSelections);

  const [searchInputs, setSearchInputs] =
    useState<SearchInputs>(initialSearchInputs);

  const [dropdowns, setDropdowns] =
    useState<DropdownState>(initialDropdowns);

  return {
    // state
    error,
    activeTab,
    selections,
    searchInputs,
    dropdowns,

    // setters
    setError,
    setActiveTab,
    setSelections,
    setSearchInputs,
    setDropdowns,
  };
};
