import { Inject, Injectable } from '@nestjs/common';
import {
  PageEntity,
  PageRepoInterface,
  PageRepoInterfaceName,
  SubscribeRepoInterface,
  SubscribeRepoInterfaceName,
} from '../../../infra/repository';
import { PageInput } from '../types';

@Injectable()
export class PageService {
  constructor(
    @Inject(PageRepoInterfaceName)
    private readonly pageRepository: PageRepoInterface,
    @Inject(SubscribeRepoInterfaceName)
    private readonly subscribeRepository: SubscribeRepoInterface,
  ) {}

  async createPage(input: PageInput): Promise<PageEntity> {
    const entity = new PageEntity();
    entity.regionName = input.regionName;
    entity.schoolName = input.schoolName;

    return await this.pageRepository.save(entity);
  }

  async findPages(studentId: string): Promise<PageEntity[]> {
    const subscribes = await this.subscribeRepository.findByStudentIdWithPage(
      studentId,
    );

    return subscribes.map((subscribe) => subscribe.page);
  }
}
