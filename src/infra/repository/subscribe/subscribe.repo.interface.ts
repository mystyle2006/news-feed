import { SubscribeEntity } from './subscribe.entity';

export const SubscribeRepoInterfaceName = 'subscribeRepo';

export interface SubscribeRepoInterface {
  save(entity: SubscribeEntity): Promise<SubscribeEntity>;
  cancel(subscribeId: string): Promise<SubscribeEntity>;
  findOneByIdOrThrow(subscribeId: string): Promise<SubscribeEntity>;
  findOneByPageIdAndStudentId(
    pageId: string,
    studentId: string,
  ): Promise<SubscribeEntity>;
  findByStudentIdWithPage(studentId: string): Promise<SubscribeEntity[]>;
}
