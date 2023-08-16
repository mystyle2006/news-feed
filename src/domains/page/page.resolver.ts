import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PageInput, Page } from './types';
import { PageService } from './page.service';

@Resolver(() => Page)
export class PageResolver {
  constructor(private readonly service: PageService) {}
  @Query(() => String)
  async page(@Args('id', { type: () => ID }) id: number) {
    console.log(id);
    return '';
  }

  @Mutation(() => Page, { description: '학교 페이지 생성' })
  async createPage(@Args('input') input: PageInput): Promise<Page> {
    const result = await this.service.createPage(input);
    return Page.from(result);
  }
}
