import {ObjectId} from 'bson';

class DownloadSchema {
  constructor({
    v = 0,
    downloadId,
    campaigns,
    email,
    session,
    password,
    createdAt = new Date(),
    updatedAt = new Date(),
    downloaded = false,
    partition,
  }) {
    this._id = downloadId;
    this.campaigns = campaigns;
    this.email = email;
    this.session = session;
    this.__v = v;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.downloaded = downloaded;
    this.partitionKey = partition;
  }
  static downloadSchema = {
    name: 'download',
    primaryKey: '_id',
    properties: {
      __v: 'int',
      _id: 'objectId',
      campaigns: 'objectId[]',
      createdAt: 'date?',
      downloaded: 'bool?',
      email: 'string?',
      password: 'string?',
      updatedAt: 'date?',
      session: 'string?',
      partitionKey: 'string?',
    },
  };
}
export {DownloadSchema};
