declare class CreateUserDto {
    readonly username: string;
    readonly email: string;
    readonly role: 'ADMIN' | 'USER';
    readonly password: string;
}
export { CreateUserDto };
