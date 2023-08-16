import { Entity, Column, Unique } from 'typeorm';
import { CommonEntity } from '../common.entity';

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
}
