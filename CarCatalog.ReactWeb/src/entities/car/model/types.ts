export interface ICar {
    id: number;
    mark: string;
    model: string;
    color: string;
    userId: number;
}

export interface ICarForm extends Omit<ICar, 'id'> { }
