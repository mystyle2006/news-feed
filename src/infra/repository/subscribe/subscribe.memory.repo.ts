import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { SubscribeEntity } from './subscribe.entity';
import { SubscribeRepoInterface } from './subscribe.repo.interface';
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
}
