import { AxiosScrapeBackend } from "./../axios";

export function getApexTournaments() {
    return AxiosScrapeBackend.get("/api/v1/scrape/apex/tournaments");
}

