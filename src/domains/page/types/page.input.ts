import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class PageInput {
  @IsString()
  @MinLength(1)
  @Field(() => String, { description: '학교명' })
  schoolName: string;

  @IsString()
  @MinLength(1)
  @Field(() => String, { description: '지역명' })
  regionName: string;
}
