import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { SubscribeEntity } from '../subscribe';

@Entity('page')
@Unique(['regionName', 'schoolName'])
export class PageEntity extends CommonEntity {
  @Column({
    comment: '지역명',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  regionName: string;

  @Column({
    comment: '학교명',
    nullable: false,
    type: 'varchar',
    width: 255,
  })
  schoolName: string;

  @OneToMany(() => SubscribeEntity, (subscribe) => subscribe.page)
  subscribes: SubscribeEntity[];
}
