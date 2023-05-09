import { Meteor } from 'meteor/meteor';
import RedisPubSub from '/imports/startup/server/redis';
import { extractCredentials } from '/imports/api/common/server/helpers';
import { check } from 'meteor/check';
import Logger from '/imports/startup/server/logger';

export default function deleteAnnotations(annotations, whiteboardId) {
  const REDIS_CONFIG = Meteor.settings.private.redis;
  const CHANNEL = REDIS_CONFIG.channels.toAkkaApps;
  const EVENT_NAME = 'DeleteWhiteboardAnnotationsPubMsg';

  try {
    const { meetingId, requesterUserId } = extractCredentials(this.userId);
    
    check(meetingId, String);
    check(requesterUserId, String);
    check(whiteboardId, String);
    check(annotations, Array);


    Logger.info(`delete Annotations meetingId ${meetingId}`);
    Logger.info(`delete Annotations requestUserId ${requesterUserId}`);
    Logger.info(`delete Annotations WHITEBOARD ${whiteboardId}`);
    Logger.info(`delete Annotations ${annotations}`);

    
    const payload = {
      whiteboardId,
      annotationsIds: annotations,
    };

    return RedisPubSub.publishUserMessage(CHANNEL, EVENT_NAME, meetingId, requesterUserId, payload);
  } catch (err) {
    Logger.error(`Exception while invoking method deleteAnnotation ${err.stack}`);
  }
}
