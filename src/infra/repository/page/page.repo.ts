import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findOneByIdOrThrow(pageId: string): Promise<PageEntity> {
    const page = await this.findOne({
      where: {
        id: pageId,
      },
    });
    if (!page) {
      throw new BadRequestException('페이지가 존재하지 않습니다.');
    }

    return page;
  }
}
