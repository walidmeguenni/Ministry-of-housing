export class ConstantsSettings {
  static TOKEN_SECRET = process.env.JWT_SECRET;

  //** REG EXP
  static REG_EXP_PHONE = /^(05[4-6]|06[5-79]|07[7-9])[0-9]{7}$/;
  static REG_EXP_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/;

  //** TYPE USER
  static TYPE_USER_DEFAULT = 'admin';
  static TYPE_USER_LIST = ['admin'];

  //** Entity status
  static ENTITY_STATUS_DEFAULT = 'ACTIVE';
  static ENTITY_STATUS_LIST = ['ACTIVE', 'INACTIVE'];

  //** Collection name
  static USER_COLLECTION = 'User';
  static SALARYBASE_COLLECTION = 'SalaryBase';
}
