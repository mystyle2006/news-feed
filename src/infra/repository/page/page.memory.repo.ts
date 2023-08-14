import { Injectable } from '@nestjs/common';
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
}
