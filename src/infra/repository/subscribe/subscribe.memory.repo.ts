import { BadRequestException, Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { SubscribeEntity } from './subscribe.entity';
import { SubscribeRepoInterface } from './subscribe.repo.interface';
import * as dayjs from 'dayjs';
@Injectable()
export class SubscribeMemoryRepo implements SubscribeRepoInterface {
  store: SubscribeEntity[] = [];
  async save(entity: SubscribeEntity): Promise<SubscribeEntity> {
    entity.id = uuid();
    this.store.push(entity);
    return entity;
  }

  async findOneByPageIdAndStudentId(
    pageId: string,
    studentId: string,
  ): Promise<SubscribeEntity> {
    return this.store.find(
      (subscribe) =>
        subscribe.page.id === pageId && subscribe.studentId === studentId,
    );
  }

  async findByStudentIdWithPage(studentId: string): Promise<SubscribeEntity[]> {
    return this.store.filter((subscribe) => subscribe.studentId === studentId);
  }

  async findOneByIdOrThrow(subscribeId: string): Promise<SubscribeEntity> {
    const entity = this.store.find(
      (subscribe) =>
        subscribe.id === subscribeId && subscribe.deletedAt === null,
    );

    if (!entity) {
      throw new BadRequestException('구독 정보가 없습니다.');
    }

    return entity;
  }

  async cancel(subscribeId: string): Promise<SubscribeEntity> {
    this.store = this.store.map((subscribe) => {
      if (subscribe.id === subscribeId) {
        subscribe.cancelledAt = dayjs();
        return subscribe;
      }

      return subscribe;
    });

    return this.store.find((subscribe) => subscribe.id === subscribeId);
  }
}
