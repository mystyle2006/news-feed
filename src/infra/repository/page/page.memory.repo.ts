import { BadRequestException, Injectable } from '@nestjs/common';
import { PageRepoInterface } from './page.repo.interface';
import { PageEntity } from './page.entity';
import { v1 as uuid } from 'uuid';
@Injectable()
export class PageMemoryRepo implements PageRepoInterface {
  store: PageEntity[] = [];
  async save(entity: PageEntity): Promise<PageEntity> {
    entity.id = uuid();
    this.store.push(entity);
    return entity;
  }

  async findOneByIdOrThrow(pageId: string): Promise<PageEntity> {
    const page = this.store.find((page) => page.id === pageId);
    if (!page) {
      throw new BadRequestException('페이지가 존재하지 않습니다.');
    }

    return page;
  }
}
