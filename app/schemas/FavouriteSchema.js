import {ObjectId} from 'bson';

class FavouriteSchema {
  constructor({
    title,
    campaign,
    session,
    partition,
    id = new ObjectId(),
    v = 0,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this._id = id;
    this.partitionKey = partition;
    this.title = title;
    this.__v = v;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.campaign = campaign;
    this.session = session;
  }
  static favouriteSchema = {
    name: 'favourite',
    properties: {
      __v: 'int',
      _id: 'objectId',
      title: 'string',
      createdAt: 'date',
      campaign: 'objectId',
      session: 'objectId?',
      updatedAt: 'date?',
      partitionKey: 'string?',
    },
    primaryKey: '_id',
  };
}
export {FavouriteSchema};
