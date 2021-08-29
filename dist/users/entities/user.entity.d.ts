declare enum UserRole {
    ADMIN = 0,
    USER = 1
}
declare class User {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly username: string;
    readonly email: string;
    readonly role: 'ADMIN' | 'USER';
}
export { User, UserRole };
