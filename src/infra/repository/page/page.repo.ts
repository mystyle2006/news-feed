import { Injectable } from '@nestjs/common';
import { PageRepoInterface } from './page.repo.interface';
import { PageEntity } from './page.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PageRepo
  extends Repository<PageEntity>
  implements PageRepoInterface
{
  constructor(private dataSource: DataSource) {
    super(PageEntity, dataSource.createEntityManager());
  }
}
