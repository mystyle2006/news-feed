import {
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { DateTransformer } from './transformer';

export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    transformer: DateTransformer,
  })
  createdAt: dayjs.Dayjs;

  @UpdateDateColumn({
    transformer: DateTransformer,
  })
  updatedAt: dayjs.Dayjs;

  @DeleteDateColumn({
    transformer: DateTransformer,
    nullable: true,
  })
  deletedAt: dayjs.Dayjs;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = dayjs();
  }

  @BeforeInsert()
  setUpdatedAt() {
    this.updatedAt = dayjs();
  }
}
