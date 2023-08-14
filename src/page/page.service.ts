import { Inject, Injectable } from '@nestjs/common';
import {
  PageEntity,
  PageRepoInterface,
  PageRepoInterfaceName,
} from '../infra/repository';
import { Page, PageInput } from './types';

@Injectable()
export class PageService {
  constructor(
    @Inject(PageRepoInterfaceName)
    private readonly pageRepository: PageRepoInterface,
  ) {}

  async createPage(input: PageInput): Promise<Page> {
    const entity = new PageEntity();
    entity.regionName = input.regionName;
    entity.schoolName = input.schoolName;

    const newPage = await this.pageRepository.save(entity);
    return Page.from(newPage);
  }
}
