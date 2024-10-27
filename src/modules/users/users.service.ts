import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { hashPassword } from '@/helpers/utils';
import { GetUserParams } from '@/interfaces/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(User.name) private userModelPag: PaginateModel<UserDocument>,
  ) {}

  checkEmail = async (email: string): Promise<boolean> => {
    const user = await this.userModel.exists({ email });
    if (user) return true;

    return false;
  };

  async create(createUserDto: CreateUserDto) {
    const isEmailExist = await this.checkEmail(createUserDto.email);

    if (isEmailExist) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hashPassword(createUserDto.password);

    const createdUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return createdUser;
  }

  async findAll(query: GetUserParams) {
    const users = await this.userModelPag.paginate(
      {},
      { page: +query.page || 1, limit: +query.limit || 10 },
    );

    return users;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
