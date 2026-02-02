export type UniversitiesQueryParams = {
  page: number;
  limit: number;
  search?: string | null;

  country?: string | null;
  state?: string | null;
  city?: string | null;

  majors?: string | null;
  fields?: string | null;

  academic_degree?: string | null;
  recommended?: "true" | "false";
  rating?: number;
  userId?: string;

  language: string;
};
