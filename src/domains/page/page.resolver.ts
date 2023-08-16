import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PageInput, Page } from './types';
import { MessageResponse } from '../common.dto';
import { SubscribeInput } from './types/subscribe.input';
import { SubscribeService, PageService } from './services';

@Resolver(() => Page)
export class PageResolver {
  constructor(
    private readonly service: PageService,
    private readonly subscribeService: SubscribeService,
  ) {}
  @Query(() => [Page], { description: '구독 중인 페이지 목록 가져오기' })
  async pages(
    @Args('studentId', { type: () => ID }) studentId: string,
  ): Promise<Page[]> {
    const pageEntities = await this.service.findPages(studentId);
    return pageEntities.map((entity) => Page.from(entity));
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

  @Mutation(() => MessageResponse, { description: '구독 취소' })
  async cancelSubscribe(
    @Args('subscribeId', { type: () => ID }) subscribeId: string,
  ): Promise<MessageResponse> {
    const message = await this.subscribeService.cancelSubscribe(subscribeId);
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
