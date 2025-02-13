export interface Country {
  name: string;
  img: string;
}

export async function fetchCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://api.first.org/data/v1/countries?limit=260"
    );
    const data = await res.json();

    return Object.entries(data.data as Record<string, { country: string }>).map(
      ([code, info]) => ({
        name:
          info.country.replace(/\s*\(.*?\)\s*/g, "").trim() ===
          "United Kingdom of Great Britain and Northern Ireland"
            ? "United Kingdom"
            : info.country.replace(/\s*\(.*?\)\s*/g, "").trim(),
        img: code,
      })
    );
  } catch (error) {
    console.error("Error fetching country data:", error);
    return [];
  }
}
