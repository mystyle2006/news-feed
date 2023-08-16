import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PageInput, Page } from './types';
import { PageService } from './services/page.service';
import { MessageResponse } from '../common.dto';
import { SubscribeInput } from './types/subscribe.input';
import { SubscribeService } from './services';

@Resolver(() => Page)
export class PageResolver {
  constructor(
    private readonly service: PageService,
    private readonly subscribeService: SubscribeService,
  ) {}
  @Query(() => [Page])
  async pages(
    @Args('studentId', { type: () => ID }) studentId: string,
  ): Promise<Page[]> {
    return await this.service.findPages(studentId);
  }

  @Mutation(() => MessageResponse, { description: '학교 페이지 구독' })
  async subscribePage(
    @Args('input') input: SubscribeInput,
  ): Promise<MessageResponse> {
    const message = await this.subscribeService.subscribePage(input);
    return {
      message,
    };
  }

  @Mutation(() => Page, { description: '학교 페이지 생성' })
  async createPage(@Args('input') input: PageInput): Promise<Page> {
    const result = await this.service.createPage(input);
    return Page.from(result);
  }
}
