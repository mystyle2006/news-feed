import { Injectable } from '@nestjs/common';
import { SubscribeRepoInterface } from './subscribe.repo.interface';
import { SubscribeEntity } from './subscribe.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SubscribeRepo
  extends Repository<SubscribeEntity>
  implements SubscribeRepoInterface
{
  constructor(private dataSource: DataSource) {
    super(SubscribeEntity, dataSource.createEntityManager());
  }

  async findOneByPageIdAndStudentId(
    pageId: string,
    studentId: string,
  ): Promise<SubscribeEntity> {
    return await this.findOneBy({
      page: {
        id: pageId,
      },
      studentId,
    });
  }

  async findByStudentIdWithPage(studentId: string): Promise<SubscribeEntity[]> {
    return await this.find({
      where: {
        studentId,
      },
      relations: ['page'],
    });
  }
}
