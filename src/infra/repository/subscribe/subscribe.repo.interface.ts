import { SubscribeEntity } from './subscribe.entity';

export const SubscribeRepoInterfaceName = 'subscribeRepo';

export interface SubscribeRepoInterface {
  save(entity: SubscribeEntity): Promise<SubscribeEntity>;
  findOneByPageIdAndStudentId(
    pageId: string,
    studentId: string,
  ): Promise<SubscribeEntity>;
}
