import {ObjectId} from 'bson';

class Schema {
  static caseStudySchema = {
    name: 'case_study',
    primaryKey: '_id',
    properties: {
      __v: 'int',
      _id: 'objectId',
      Thumbnail: 'objectId',
      Title: 'string',
      campaign: 'objectId?',
      createdAt: 'date',
      updatedAt: 'date?',
      campaigns: 'objectId[]',
      Location: 'string?',
      partitionKey: 'string?',
      slide_ten_video_file: 'objectId?',
      slide_nine_file_video: 'objectId?',
      slide_eight_file_video: 'objectId?',
      slide_seven_file_video: 'objectId?',
      slide_six_video_file: 'objectId?',
      slide_five_video_file: 'objectId?',
      slide_four_video_file: 'objectId?',
      slide_three_file_video: 'objectId?',
      slide_two_video_file: 'objectId?',
      slide_one_file_video: 'objectId?',
      slide_one_media: 'objectId?',
      slide_two_media: 'objectId?',
      slide_three_media: 'objectId?',
      slide_four_media: 'objectId?',
      slide_five_media: 'objectId?',
      slide_six_media: 'objectId?',
      slide_seven_media: 'objectId?',
      slide_eight_media: 'objectId?',
      slide_nine_media: 'objectId?',
      slide_ten_media: 'objectId?',
      // Slides: {type: 'list', objectType: 'slide', optional: true},
    },
  };

  static componentResourceSchema = {
    name: 'components_resource_slide',
    primaryKey: '_id',
    properties: {
      __v: 'int',
      _id: 'objectId',
      createdAt: 'date',
      updatedAt: 'date?',
      Slide: 'objectId?',
      Vimeo_Embed: 'string?',
      partitionKey: 'string?',
    },
  };

  static introductionSchema = {
    name: 'introduction',
    primaryKey: '_id',
    properties: {
      __v: 'int',
      _id: 'objectId',
      Thumbnail: 'objectId',
      Title: 'string',
      createdAt: 'date',
      updatedAt: 'date?',
      Slideshow: 'objectId[]',
      video_file: 'objectId?',
      Video: 'string?',
      partitionKey: 'string?',
    },
  };

  static rewardSchema = {
    name: 'reward',
    primaryKey: '_id',
    properties: {
      __v: 'int',
      _id: 'objectId',
      Title: 'string',
      createdAt: 'date',
      updatedAt: 'date?',
      campaigns: 'objectId[]',
      partitionKey: 'string?',
      case_study: 'objectId?',
    },
  };

  static faqSchema = {
    name: 'faq',
    properties: {
      __v: 'int',
      _id: 'objectId',
      content: 'string',
      title: 'string',
      createdAt: 'date',
      updatedAt: 'date?',
      partitionKey: 'string?',
    },
    primaryKey: '_id',
  };

  static filesSchema = {
    name: 'files',
    properties: {
      name: 'string',
      __v: 'int',
      _id: 'objectId',
      createdAt: 'date',
      url: 'string',
      alternativeText: 'string?',
      caption: 'string?',
      ext: 'string?',
      hash: 'string?',
      height: 'int?',
      mime: 'string?',
      provider: 'string?',
      size: 'double?',
      updatedAt: 'date?',
      width: 'int?',
      partitionKey: 'string?',
    },
    primaryKey: '_id',
  };

  static tutorialSchema = {
    name: 'tutorial',
    properties: {
      __v: 'int',
      _id: 'objectId',
      title: 'string',
      createdAt: 'date',
      vimeo_link: 'string?',
      Thumbnail: 'objectId?',
      updatedAt: 'date?',
      video_file: 'objectId?',
      partitionKey: 'string?',
    },
    primaryKey: '_id',
  };

  static countrySchema = {
    name: 'country',
    properties: {
      __v: 'int',
      _id: 'objectId',
      title: 'string',
      createdAt: 'date',
      region: 'objectId',
      value: 'string',
      updatedAt: 'date?',
      partitionKey: 'string?',
    },
    primaryKey: '_id',
  };

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

  static userSchema = {
    name: 'users',
    properties: {
      __v: 'int',
      _id: 'objectId',
      username: 'string',
      createdAt: 'date',
      email: 'string',
      password: 'string',
      role: 'objectId',
      updatedAt: 'date?',
      assign_country: 'objectId?',
      blocked: 'bool?',
      confirmed: 'bool?',
      country: 'string?',
      provider: 'string?',
      region: 'objectId?',
      partitionKey: 'string?',
    },
    primaryKey: '_id',
  };

  static sessionSchema = {
    name: 'session',
    properties: {
      _id: 'objectId',
      __v: 'int',
      createdAt: 'date',
      title: 'string',
      updatedAt: 'date?',
      user: 'objectId',
      partitionKey: 'string?',
    },
    primaryKey: '_id',
  };

  static zonesSchema = {
    name: 'zone',
    properties: {
      __v: 'int',
      _id: 'objectId',
      createdAt: 'date',
      title: 'string',
      kuula: 'string?',
      thumbnail: 'objectId?',
      updatedAt: 'date?',
      Order: 'int?',
      partitionKey: 'string?',
    },
    primaryKey: '_id',
  };

  static campaignSchema = {
    name: 'campaign',
    properties: {
      __v: 'int',
      _id: 'objectId',
      createdAt: 'date',
      title: 'string',
      zone: 'objectId',
      thumbnail: 'objectId?',
      updatedAt: 'date?',
      game_video: 'objectId?',
      insights: 'objectId?',
      panorama: 'objectId?',
      panorama_background: 'objectId?',
      panorama_execition_five: 'objectId?',
      panorama_execition_four: 'objectId?',
      panorama_execition_three: 'objectId?',
      panorama_execition_two: 'objectId?',
      panorama_execition_one: 'objectId?',
      kuula_execution_five_title: 'string?',
      kuula_execution_four_title: 'string?',
      kuula_execution_three_title: 'string?',
      kuula_execution_two_title: 'string?',
      kuula_execution_one_title: 'string?',
      range: 'string?',
      objectives: 'objectId?',
      video_english_file: 'objectId?',
      activation_slider: 'objectId[]',
      kv: 'objectId[]',
      product_information: 'objectId[]',
      slider: 'objectId[]',
      qr_code_one: 'objectId?',
      qr_code_two: 'objectId?',
      Mobile_Campaign_Thumbnail: 'objectId?',
      position: 'int?',
      partitionKey: 'string?',
    },
    primaryKey: '_id',
  };

  static roleSchema = {
    name: 'roles',
    properties: {
      __v: 'int',
      _id: 'objectId',
      createdAt: 'date',
      name: 'string',
      updatedAt: 'date?',
      partitionKey: 'string?',
      description: 'string?',
      type: 'string?',
    },
    primaryKey: '_id',
  };

  static regionSchema = {
    name: 'regions',
    properties: {
      __v: 'int',
      _id: 'objectId',
      createdAt: 'date',
      title: 'string',
      user: 'objectId',
      updatedAt: 'date?',
      partitionKey: 'string?',
    },
    primaryKey: '_id',
  };
}

// "activation_slider": {
//   "bsonType": "array",
//   "items": {
//     "bsonType": "objectId"
//   }
// }

export {Schema};
