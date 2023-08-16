import { BadRequestException, Injectable } from '@nestjs/common';
import { SubscribeRepoInterface } from './subscribe.repo.interface';
import { SubscribeEntity } from './subscribe.entity';
import { DataSource, Repository } from 'typeorm';
import * as dayjs from 'dayjs';

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

  async findOneByIdOrThrow(subscribeId: string): Promise<SubscribeEntity> {
    const entity = await this.findOneBy({
      id: subscribeId,
    });

    if (!entity) {
      throw new BadRequestException('구독 정보가 없습니다.');
    }

    return entity;
  }

  async cancel(subscribeId: string): Promise<SubscribeEntity> {
    await this.update(subscribeId, { cancelledAt: dayjs() });
    return await this.findOne({
      where: {
        id: subscribeId,
      },
    });
  }
}
