import { Module } from '@nestjs/common';
import { PageResolver } from './page.resolver';
import { PageRepoModule, SubscribeRepoModule } from '../../infra/repository';
import { PageService, SubscribeService } from './services';

@Module({
  imports: [PageRepoModule, SubscribeRepoModule],
  providers: [PageResolver, PageService, SubscribeService],
})
export class PageModule {}
