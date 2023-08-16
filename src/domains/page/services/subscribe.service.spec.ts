import { Test } from '@nestjs/testing';
import {
  PageEntity,
  PageMemoryRepo,
  PageRepoInterface,
  PageRepoInterfaceName,
  SubscribeMemoryRepo,
  SubscribeRepoInterfaceName,
} from '../../../infra/repository';
import { SubscribeService } from './subscribe.service';
import { SubscribeInput } from '../types/subscribe.input';

describe('subscribe.service.ts', () => {
  let subscribeService: SubscribeService;
  let pageRepo: PageRepoInterface;
  let page: PageEntity;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SubscribeService,
        {
          provide: PageRepoInterfaceName,
          useClass: PageMemoryRepo,
        },
        {
          provide: SubscribeRepoInterfaceName,
          useClass: SubscribeMemoryRepo,
        },
      ],
    }).compile();

    subscribeService = moduleRef.get<SubscribeService>(SubscribeService);
    pageRepo = moduleRef.get<PageRepoInterface>(PageRepoInterfaceName);

    // 테스트용 페이지 생성
    const pageEntity = new PageEntity();
    pageEntity.schoolName = '학교명';
    pageEntity.regionName = '지역명';

    page = await pageRepo.save(pageEntity);
  });

  describe('subscribePage', () => {
    it('페이지를 성공적으로 구독한다.', async () => {
      const input: SubscribeInput = {
        studentId: 'student1',
        pageId: page.id,
      };

      const message = await subscribeService.subscribePage(input);

      expect(message).toBe('구독되었습니다.');
    });

    it('페이지를 중복 구독할 경우 중복되었다고 메시지를 전달한다.', async () => {
      const input: SubscribeInput = {
        studentId: 'student1',
        pageId: page.id,
      };

      await subscribeService.subscribePage(input);
      const message = await subscribeService.subscribePage(input);

      expect(message).toBe('이미 구독되었습니다.');
    });
  });
});
