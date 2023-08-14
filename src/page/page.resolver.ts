import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Page } from './types/page';

@Resolver(() => Page)
export class PageResolver {
  @Query(() => String)
  async page(@Args('id', { type: () => ID }) id: number) {
    console.log(id);
    return '';
  }
}
