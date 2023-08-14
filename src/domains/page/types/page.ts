import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PageEntity } from '../../../infra/repository';

@ObjectType()
export class Page {
  @Field(() => String)
  id: string;

  @Field(() => String, { description: '학교명' })
  schoolName: string;

  @Field(() => String, { description: '지역명' })
  regionName: string;

  static from(data: PageEntity): Page {
    const page = new Page();
    page.regionName = data.regionName;
    page.schoolName = data.schoolName;
    page.id = data.id;

    return page;
  }
}
