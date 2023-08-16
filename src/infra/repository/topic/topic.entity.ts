import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CommonEntity } from '../common.entity';
import { PageEntity } from '../page';

@Entity('topic')
export class TopicEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '페이지 내의 소식',
    nullable: false,
    type: 'text',
  })
  content: string;

  @ManyToOne(() => PageEntity)
  @JoinColumn({ name: 'page_id' })
  page: PageEntity;
}
