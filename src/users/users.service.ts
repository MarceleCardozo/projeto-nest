import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto/user.dto';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: UserDTO) {
    const { username, email, password } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
      return {
        message: 'Username already exists',
        error: 'Username must be unique',
      };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        username,
        email,
        password: hashedPassword,
      },
    });

    return {
      message: 'Usuário Criado com sucesso',
      data: user,
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async findOne(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    return user;
  }

  async update(id: string, updateUserDTO: UserDTO) {
    const { username, email, password } = updateUserDTO;

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        password,
      },
    });

    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: 'Usuário deletado com sucesso.',
      data: user,
    };
  }
}
