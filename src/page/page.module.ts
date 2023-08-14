import { Module } from '@nestjs/common';
import { PageResolver } from './page.resolver';
import { PageRepoModule } from '../infra/repository';
import { PageService } from './page.service';

@Module({
  imports: [PageRepoModule],
  providers: [PageResolver, PageService],
})
export class PageModule {}
