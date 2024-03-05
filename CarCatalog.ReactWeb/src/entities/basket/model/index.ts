import { makeAutoObservable } from "mobx";

class BasketStore {
    carIdsSet = new Set<number>();

    constructor() {
        makeAutoObservable(this);
    }

    fetchCars = (userId: number) => {
        const carIds = localStorage.getItem(userId.toString());
        if (carIds === null) {
            return;
        }

        this.carIdsSet = new Set(JSON.parse(carIds) as number[]);
    }

    toggleCar = (carId: number, userId: number) => {
        if (!this.carIdsSet.has(carId)) {
            this.carIdsSet.add(carId);
        }
        else {
            this.carIdsSet.delete(carId);
        }

        localStorage.setItem(userId.toString(), JSON.stringify(Array.from(this.carIdsSet)));
    }

    removeIfContainsCarId = (carId: number, userId: number) => {
        if (!this.carIdsSet.has(carId))
            return;

        this.carIdsSet.delete(carId);
        localStorage.setItem(userId.toString(), JSON.stringify(Array.from(this.carIdsSet)));
    }

    dispose = () => {
        this.carIdsSet = new Set<number>();
    }
}

const basketStore = new BasketStore();

export default basketStore;
