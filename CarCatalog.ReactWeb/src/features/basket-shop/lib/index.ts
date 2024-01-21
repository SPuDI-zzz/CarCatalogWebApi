import { BasketStore } from "entities/basket";
import { useEffect, useState } from "react";

export const useLoadBasketCars = (userId?: number) => {
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        setIsFetched(false);
        
        if (userId) {
            BasketStore.fetchCars(userId)
            setIsFetched(true);
        }
    }, [userId]);

    return { isFetched }
}
