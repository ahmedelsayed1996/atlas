export interface SelectOption {
  id: number;
  name: string;
  logo?: string | null;
}

export interface SearchSelections {
  country: SelectOption | null;
  state: SelectOption | null;
  city: SelectOption | null;
  major: SelectOption | null;
  languageStudy: SelectOption | null;
  academicDegree: string | null;
}

export interface SearchInputs {
  country: string;
  state: string;
  city: string;
  major: string;
  languageStudy: string;
  keyword: string;
}

export interface DropdownState {
  country: boolean;
  state: boolean;
  city: boolean;
  major: boolean;
  languageStudy: boolean;
  academicDegree: boolean;
}
