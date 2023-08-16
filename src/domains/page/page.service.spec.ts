import { Test } from '@nestjs/testing';
import { PageService } from './page.service';
import { PageMemoryRepo, PageRepoInterfaceName } from '../../infra/repository';
import { PageInput } from './types';

describe('topic.service.ts', () => {
  let pageService: PageService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PageService,
        {
          provide: PageRepoInterfaceName,
          useClass: PageMemoryRepo,
        },
      ],
    }).compile();

    pageService = moduleRef.get<PageService>(PageService);
  });

  describe('createPage', () => {
    it('지역명과 학교명으로 새로운 페이지를 생성한다.', async () => {
      const input: PageInput = {
        schoolName: '학교명',
        regionName: '지역명',
      };

      const result = await pageService.createPage(input);

      expect(result.schoolName).toBe('학교명');
      expect(result.regionName).toBe('지역명');
    });
  });
});
