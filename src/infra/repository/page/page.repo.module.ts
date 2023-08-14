import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageEntity } from './page.entity';
import { PageRepoInterfaceName } from './page.repo.interface';
import { PageRepo } from './page.repo';

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity])],
  providers: [
    {
      provide: PageRepoInterfaceName,
      useClass: PageRepo,
    },
  ],
  exports: [PageRepoInterfaceName],
})
export class PageRepoModule {}
