import { useEffect } from "react";
import { getApexTournaments } from "@/lib/api/scrape";

export function useScrapingApex() {
    // const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        getApexTournaments().then(res => {
            console.log("tournaments : ", res);
        });
    });
}

