<script lang="ts">
    export let params: { id: string } = { id: '' };
    $: id = params.id;

    interface ExtendedNotice {
        date_of_birth: string;
        distinguishing_marks: string | null;
        weight: number | null;
        nationalities: string[];
        entity_id: string;
        eyes_colors_id: string | null;
        sex_id: string;
        place_of_birth: string;
        forename: string;
        arrest_warrants: {
            charge: string;
            issuing_country_id: string;
            charge_translation: string | null;
        }[];
        country_of_birth_id: string;
        hairs_id: string | null;
        name: string;
        languages_spoken_ids: string[];
        height: number | null;
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

    class Criminal {
        public name: string;
        public forename: string;
        public dateOfBirth: string;
        public profilePicturePath: string;
        public externalLink: string;
        public distinguishingMarks: string | null;
        public weight: number | null;
        public eyesColorsId: string | null;
        public sexId: string;
        public placeOfBirth: string;
        public arrestWarrants: {
            charge: string;
            issuingCountryId: string;
            chargeTranslation: string | null;
        }[];
        public countryOfBirthId: string;
        public hairsId: string | null;
        public languagesSpokenIds: string[];
        public height: number | null;

        constructor(href: string) {
            this.externalLink = href;

            this.name = "Unknown";
            this.forename = "Unknown";
            this.dateOfBirth = "Unknown";
            this.profilePicturePath = "";
            this.distinguishingMarks = null;
            this.weight = null;
            this.eyesColorsId = null;
            this.sexId = "Unknown";
            this.placeOfBirth = "Unknown";
            this.arrestWarrants = [];
            this.countryOfBirthId = "Unknown";
            this.hairsId = null;
            this.languagesSpokenIds = [];
            this.height = null;
        }

        async run() {
            await this.fetchCriminalData(this.externalLink);
        }

        async fetchCriminalData(href: string) {
            const response = await fetch(href);
            let data: ExtendedNotice = await response.json();

            this.name = data.name;
            this.forename = data.forename;
            this.dateOfBirth = data.date_of_birth;
            this.profilePicturePath = data._links.thumbnail.href;
            this.distinguishingMarks = data.distinguishing_marks;
            this.weight = data.weight;
            this.eyesColorsId = data.eyes_colors_id;
            this.sexId = data.sex_id;
            this.placeOfBirth = data.place_of_birth;
            this.arrestWarrants = data.arrest_warrants.map(warrant => ({
                charge: warrant.charge,
                issuingCountryId: warrant.issuing_country_id,
                chargeTranslation: warrant.charge_translation
            }))
            this.countryOfBirthId = data.country_of_birth_id;
            this.hairsId = data.hairs_id;
            this.languagesSpokenIds = data.languages_spoken_ids;
            this.height = data.height;
        }
    }
</script>
<div>
    <aside>
        <h1>Name + Surname</h1>
    </aside>
</div>