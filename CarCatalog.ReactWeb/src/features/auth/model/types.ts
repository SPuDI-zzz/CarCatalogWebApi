import { Role } from "entities/user";

export interface IUserClaims {
    userId: number,
    userRoles: Role[]
}
