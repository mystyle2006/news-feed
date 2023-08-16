import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribeEntity } from './subscribe.entity';
import { SubscribeRepoInterfaceName } from './subscribe.repo.interface';
import { SubscribeRepo } from './subscribe.repo';

@Module({
  imports: [TypeOrmModule.forFeature([SubscribeEntity])],
  providers: [
    {
      provide: SubscribeRepoInterfaceName,
      useClass: SubscribeRepo,
    },
  ],
  exports: [SubscribeRepoInterfaceName],
})
export class SubscribeRepoModule {}
