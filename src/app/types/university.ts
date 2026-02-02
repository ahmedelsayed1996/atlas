export interface University {
    id: number;
    name: string;
    description: string;
    logo?: string;
    country_logo?: string;
    country_name: string;
    visites: number;
    major_count: number;
    program_count: number;
    is_notified: boolean;
    recommend?: boolean;
}