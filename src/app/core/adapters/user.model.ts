export class UserGroupsAdapterModel {
  constructor(
    public id?: string,
    public name?: string,
    public path?: string,
    public parentId?: string,
    public realmRoles?: string[]
  ) {}
}

export class UserAdapterModel {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public username?: string,
    public groups?: UserGroupsAdapterModel[],
    public roles?: string[],
    public id?: string
  ) {}
}
