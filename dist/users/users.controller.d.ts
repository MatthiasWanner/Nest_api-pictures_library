import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<import(".prisma/client").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").User>;
    remove(id: string): Promise<{
        messages: string;
    }>;
}
