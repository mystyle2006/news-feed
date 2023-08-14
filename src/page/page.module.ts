import { Module } from '@nestjs/common';
import { PageResolver } from './page.resolver';

@Module({
  imports: [],
  providers: [PageResolver],
})
export class PageModule {}
