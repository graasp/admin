import { Member } from '@graasp/sdk';

export type PartialMemberDisplay = Pick<Member, 'name' | 'id'>;
