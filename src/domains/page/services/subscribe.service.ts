import { Inject, Injectable } from '@nestjs/common';
import {
  PageRepoInterface,
  PageRepoInterfaceName,
  SubscribeEntity,
  SubscribeRepoInterface,
  SubscribeRepoInterfaceName,
} from '../../../infra/repository';
import { SubscribeInput } from '../types/subscribe.input';

@Injectable()
export class SubscribeService {
  constructor(
    @Inject(PageRepoInterfaceName)
    private readonly pageRepository: PageRepoInterface,
    @Inject(SubscribeRepoInterfaceName)
    private readonly subscribeRepository: SubscribeRepoInterface,
  ) {}

  async subscribePage(input: SubscribeInput): Promise<string> {
    const page = await this.pageRepository.findOneByIdOrThrow(input.pageId);
    const subscribeEntity = new SubscribeEntity();
    subscribeEntity.page = page;
    subscribeEntity.studentId = input.studentId;

    const oldSubscribeEntity =
      await this.subscribeRepository.findOneByPageIdAndStudentId(
        subscribeEntity.page.id,
        subscribeEntity.studentId,
      );

    if (oldSubscribeEntity?.isDuplicate()) {
      return '이미 구독되었습니다.';
    }

    if (oldSubscribeEntity?.cancelledAt) {
      oldSubscribeEntity.cancelledAt = null;
    }

    await this.subscribeRepository.save(
      oldSubscribeEntity ? oldSubscribeEntity : subscribeEntity,
    );
    return '구독되었습니다.';
  }
}
