export interface LanguageSchool {
    id: number;
    name: string;
    description: string;
    logo?: string;
    countries: [{
        id: number;
        name: string;
        logo: string;
    }]
    is_notified: boolean;
    status: string;
    visites: number;
    number_of_courses: number;
    number_of_branches: number;
    recommend?: boolean;
    rating: number;
    offer: number;
}