import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { PageEntity } from '../page';
import { DateTransformer } from '../transformer';
import * as dayjs from 'dayjs';

@Entity('subscribe')
@Unique(['studentId', 'page'])
export class SubscribeEntity extends CommonEntity {
  @Column({
    comment: '학생 id',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  studentId: string;

  @Column({
    transformer: DateTransformer,
    type: 'timestamp',
    width: 6,
    nullable: true,
  })
  cancelledAt: dayjs.Dayjs;

  @ManyToOne(() => PageEntity, (page) => page.subscribes)
  page: PageEntity;

  isDuplicate(): boolean {
    return this.id && !this.cancelledAt;
  }
}
