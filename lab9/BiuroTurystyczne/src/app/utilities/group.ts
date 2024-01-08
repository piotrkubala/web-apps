import { UserPermission } from './user-permission';

export interface Group {
  name: string;
  permissions: UserPermission[];
}
