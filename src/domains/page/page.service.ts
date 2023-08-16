import { Inject, Injectable } from '@nestjs/common';
import {
  PageEntity,
  PageRepoInterface,
  PageRepoInterfaceName,
} from '../../infra/repository';
import { PageInput } from './types';

@Injectable()
export class PageService {
  constructor(
    @Inject(PageRepoInterfaceName)
    private readonly pageRepository: PageRepoInterface,
  ) {}

  async createPage(input: PageInput): Promise<PageEntity> {
    const entity = new PageEntity();
    entity.regionName = input.regionName;
    entity.schoolName = input.schoolName;

    return await this.pageRepository.save(entity);
  }
}
