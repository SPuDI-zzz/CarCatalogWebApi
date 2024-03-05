import { BasketStore } from "entities/basket";
import { useEffect, useState } from "react";

const { fetchCars } = BasketStore;

export const useLoadBasketCars = (userId?: number) => {
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        setIsFetched(false);
        
        if (userId) {
            fetchCars(userId);
            setIsFetched(true);
        }
    }, [userId]);

    return { isFetched }
}
