export interface ExtendedNotice {
    name: string;
    forename: string;
    date_of_birth: string;
    nationalities: string[];
    entity_id: string;

    place_of_birth: string | null;
    country_of_birth_id: string | null;

    sex_id: string | null;
    weight: number | null;
    height: number | null;
    eyes_colors_id: string | null;
    hairs_id: string | null;

    distinguishing_marks: string | null;

    languages_spoken_ids: string[] | null;

    arrest_warrants: {
        charge: string;
        issuing_country_id: string | null;
        charge_translation: string | null;
    }[];

    _embedded: {
        links: {
            forename: string;
            color: string;
            name: string;
            entity_id: string;
            _links: {
                self: {
                    href: string;
                };
                thumbnail: {
                    href: string;
                };
            };
        }[];
    };

    _links: {
        self: {
            href: string;
        };
        images: {
            href: string;
        };
        thumbnail: {
            href: string;
        };
    };
}