import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'posts', schema: PostSchema }])],
  controllers: [],
  providers: [],
  exports: [],
})
export class PostModule {}
