import { expect } from 'chai';
import { isCurrentUserCaseAllocator } from './utils';
import { CASE_ALLOCATOR_ROLE, LEGAL_OPS_TYPE } from './constants';

describe('user.utils', () => {
  describe('isCurrentUserCaseAllocator without jurisdiction and location', () => {
    it('should return true', () => {
      const ROLE_ASSIGNMENT_EXAMPLE = {
        id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
        actorIdType: 'IDAM',
        actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
        roleType: 'ORGANISATION',
        roleName: CASE_ALLOCATOR_ROLE,
        classification: 'PUBLIC',
        grantType: 'STANDARD',
        roleCategory: LEGAL_OPS_TYPE,
        readOnly: false,
        created: Date.UTC.toString(),
        attributes: {
          primaryLocation: '231596',
          jurisdiction: 'IA'
        }
      }
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE)).to.equal(true);
    });
    it('should return false', () => {
      const ROLE_ASSIGNMENT_EXAMPLE = {
        id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
        actorIdType: 'IDAM',
        actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
        roleType: 'ORGANISATION',
        roleName: 'ROLE',
        classification: 'PUBLIC',
        grantType: 'STANDARD',
        roleCategory: LEGAL_OPS_TYPE,
        readOnly: false,
        created: Date.UTC.toString(),
        attributes: {
          primaryLocation: '231596',
          jurisdiction: 'IA'
        }
      }
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE)).to.equal(false);
    });

  });

  describe('isCurrentUserCaseAllocator with jurisdiction and location', () => {
    it('should return true', () => {
      const ROLE_ASSIGNMENT_EXAMPLE = {
        id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
        actorIdType: 'IDAM',
        actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
        roleType: 'ORGANISATION',
        roleName: CASE_ALLOCATOR_ROLE,
        classification: 'PUBLIC',
        grantType: 'STANDARD',
        roleCategory: LEGAL_OPS_TYPE,
        readOnly: false,
        created: Date.UTC.toString(),
        attributes: {
          primaryLocation: '231596',
          jurisdiction: 'IA'
        }
      }
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE, 'IA', '231596')).to.equal(true);
    });
    it('should return false', () => {
      const ROLE_ASSIGNMENT_EXAMPLE = {
        id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
        actorIdType: 'IDAM',
        actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
        roleType: 'ORGANISATION',
        roleName: CASE_ALLOCATOR_ROLE,
        classification: 'PUBLIC',
        grantType: 'STANDARD',
        roleCategory: LEGAL_OPS_TYPE,
        readOnly: false,
        created: Date.UTC.toString(),
        attributes: {
          primaryLocation: '231596',
          jurisdiction: 'IA'
        }
      }
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE, 'DIVORCE', '123123')).to.equal(false);
    });
  });
});