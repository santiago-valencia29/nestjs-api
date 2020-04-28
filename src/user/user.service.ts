import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async create(user: User): Promise<{ _id: string; email: string }> {
    const newUser = new this.userModel(user);

    const create = await newUser.save();
    const resUser = {
      _id: create._id,
      email: create.email,
    };

    return resUser;
  }
}
