import { check } from 'meteor/check';
import AnnotationsStreamer from '/imports/api/annotations/server/streamer';

import clearAnnotations from '../modifiers/clearAnnotations';
import Logger from '/imports/startup/server/logger';

export default function handleWhiteboardUserEvent({ body }, meetingId) {
  Logger.info(`event getgetget`);
  console.log(body);
}
