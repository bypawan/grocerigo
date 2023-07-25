export interface ModificationNote {
  modifiedOn?: Date;
  modifiedBy?: String;
  modificationNote?: String;
}

export const ModificationNote = {
  modifiedOn: Date,
  modifiedBy: String,
  modificationNote: String,
};

export enum responseStatusCodes {
  success = 200,
  badRequest = 400,
  internalServerError = 500,
  Unauthorized = 401,
  Forbidden = 403,
}
