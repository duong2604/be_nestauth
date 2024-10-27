import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as paginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  image: string;

  @Prop({ default: 'USER' })
  role: string;

  @Prop()
  accountType: string;

  @Prop({ default: false })
  isActive: string;

  @Prop()
  codeId: string;

  @Prop()
  codeExpired: Date;
}

export interface UserDocument extends User, Document {}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(paginate);
