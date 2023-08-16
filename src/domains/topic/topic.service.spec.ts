import { Test } from '@nestjs/testing';
import {
  PageMemoryRepo,
  PageRepoInterfaceName,
  TopicRepoInterfaceName,
  TopicMemoryRepo,
  PageRepoInterface,
  PageEntity,
  SubscribeRepoInterfaceName,
  SubscribeRepo,
  SubscribeMemoryRepo,
} from '../../infra/repository';
import { TopicService } from './topic.service';
import { TopicInput } from './types';
import { BadRequestException } from '@nestjs/common';

describe('topic.service.ts', () => {
  let topicService: TopicService;
  let pageRepo: PageRepoInterface;
  let page: PageEntity;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TopicService,
        {
          provide: PageRepoInterfaceName,
          useClass: PageMemoryRepo,
        },
        {
          provide: TopicRepoInterfaceName,
          useClass: TopicMemoryRepo,
        },
        {
          provide: SubscribeRepoInterfaceName,
          useClass: SubscribeMemoryRepo,
        },
      ],
    }).compile();

    topicService = moduleRef.get<TopicService>(TopicService);
    pageRepo = moduleRef.get<PageRepoInterface>(PageRepoInterfaceName);

    // 테스트용 페이지 생성
    const pageEntity = new PageEntity();
    pageEntity.schoolName = '학교명';
    pageEntity.regionName = '지역명';

    page = await pageRepo.save(pageEntity);
  });

  describe('createTopic', () => {
    it('학교명 페이지에 새로운 토픽을 생성한다.', async () => {
      const input: TopicInput = {
        pageId: page.id,
        content: '신규 토픽',
      };

      const result = await topicService.createTopic(input);

      expect(result.content).toBe('신규 토픽');
    });

    it('페이지가 없을 경우 에러 메시지를 띄운다.', async () => {
      const input: TopicInput = {
        pageId: 'empty_page_id',
        content: '신규 토픽',
      };

      await expect(
        async () => await topicService.createTopic(input),
      ).rejects.toThrowError(
        new BadRequestException('페이지가 존재하지 않습니다.'),
      );
    });
  });
});
