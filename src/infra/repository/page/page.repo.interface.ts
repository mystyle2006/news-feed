import { PageEntity } from './page.entity';
export const PageRepoInterfaceName = 'pageRepo';

export interface PageRepoInterface {
  save(entity: PageEntity): Promise<PageEntity>;
}
