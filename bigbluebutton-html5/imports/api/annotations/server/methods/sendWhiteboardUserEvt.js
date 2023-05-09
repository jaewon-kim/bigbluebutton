import RedisPubSub from '/imports/startup/server/redis';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { extractCredentials } from '/imports/api/common/server/helpers';
import Logger from '/imports/startup/server/logger';

export default function sendWhiteboardUserEvent(whiteboardId) {
  const REDIS_CONFIG = Meteor.settings.private.redis;
  const CHANNEL = REDIS_CONFIG.channels.toAkkaApps;
  const EVENT_NAME = 'SendWhiteboardAnnotationsPubMsg';

  try {
    const { meetingId, requesterUserId } = extractCredentials(this.userId);

    check(meetingId, String);
    check(requesterUserId, String);
    check(whiteboardId, String);
    var today = Math.round((new Date()).getTime() / 1000);
    console.log(today);
    const payload = {
      whiteboardId,
      annotations: [ 
        { 
          id:'' + today, 
          annotationInfo:{
            size:[],
            roation:0,
            id:'' + today,
            parentId:'1',
            childIndex:0,
            name:'Image',
            point:[],
            assetId:'',
            style:{},
            userId:requesterUserId,
            type:'event',
          },
          wbId:whiteboardId, 
          userId:requesterUserId,
          isStateful:false,
          type:'event',
        }
      ],
      html5InstanceId: parseInt(process.env.INSTANCE_ID, 10) || 1
    };
    //console.log("publish " + EVENT_NAME);
    Logger.info(`publish ${EVENT_NAME}`)
    console.log(payload)

    return RedisPubSub.publishUserMessage(CHANNEL, EVENT_NAME, meetingId, requesterUserId, payload);
  } catch (err) {
    Logger.error(`Exception while invoking method clearWhiteboard ${err.stack}`);
  }
}
