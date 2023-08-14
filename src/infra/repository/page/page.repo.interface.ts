import { PageEntity } from './page.entity';
import { Repository } from 'typeorm';
export const PageRepoInterfaceName = 'pageRepo';

export type PageRepoInterface = Repository<PageEntity>;
