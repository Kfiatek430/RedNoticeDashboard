export async function fetchCountryMap() {
    try {
        const res = await fetch("https://api.first.org/data/v1/countries?limit=260");
        const data = await res.json();

        return Object.fromEntries(
            Object.entries(data.data as Record<string, { country: string }>).map(([code, info]) => [
                code,
                info.country
                    .replace(/\s*\(.*?\)\s*/g, "")
                    .trim() === "United Kingdom of Great Britain and Northern Ireland"
                    ? "United Kingdom"
                    : info.country.replace(/\s*\(.*?\)\s*/g, "").trim()
            ])
        );
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
}
