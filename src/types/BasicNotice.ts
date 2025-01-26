export interface BasicNotice {
    date_of_birth: string;
    entity_id: string;
    forename: string;
    name: string;
    nationalities: string[];
    _links: {
        images: {
            href: string;
        };
        self: {
            href: string;
        };
        thumbnail: {
            href: string;
        };
    };
}