export interface ImagesResponse {
    _embedded: {
        images: {
            picture_id: string;
            _links: {
                self: {
                    href: string;
                };
            };
        }[];
    };
    _links: {
        self: {
            href: string;
        };
        notice: {
            href: string;
        };
        thumbnail: {
            href: string;
        };
    };
}
