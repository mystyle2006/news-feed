import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class CommonEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
