class SessionSchema {
  constructor({
    title,
    user,
    sessionId,
    partition,
    password,
    createdAt = new Date(),
    updatedAt = new Date(),
    v = 0,
  }) {
    this._id = sessionId;
    this.partitionKey = partition;
    this.title = title;
    this.__v = v;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.password = password;
  }
  static sessionSchema = {
    name: 'session',
    properties: {
      _id: 'objectId',
      __v: 'int',
      createdAt: 'date',
      title: 'string',
      user: 'objectId',
      updatedAt: 'date?',
      partitionKey: 'string?',
      password: 'string?',
    },
    primaryKey: '_id',
  };
}
export {SessionSchema};
