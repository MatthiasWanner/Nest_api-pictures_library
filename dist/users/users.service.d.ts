import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<import(".prisma/client").User>;
    create(data: CreateUserDto): Promise<User>;
    update(id: string, data: UpdateUserDto): Promise<import(".prisma/client").User>;
    remove(id: string): Promise<{
        messages: string;
    }>;
}
