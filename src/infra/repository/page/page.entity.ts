import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('page')
@Unique(['regionName', 'schoolName'])
export class PageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  schoolName: boolean;
}
