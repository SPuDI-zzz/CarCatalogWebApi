import { useEffect, useState } from "react";
import { AuthStore } from "../model";

export const useLoadUserClaims = () => {
    const [isFetched, setIsFetched] = useState(false);
    const [data, setData] = useState<boolean>();

    const load = async () => {
        setIsFetched(false);
        const data = await AuthStore.getClaimsAction();
        setData(data);
        setIsFetched(true);
    }

    useEffect(() => {
        load();
    }, []);

    return { isFetched, refresh: load, data: data }
}
