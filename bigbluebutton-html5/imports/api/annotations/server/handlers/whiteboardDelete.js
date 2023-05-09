import { check } from 'meteor/check';

import AnnotationsStreamer from '/imports/api/annotations/server/streamer';
import removeAnnotation from '../modifiers/removeAnnotation';
import Logger from '/imports/startup/server/logger';

export default async function handleWhiteboardDelete({ body }, meetingId) {
  const { whiteboardId } = body;
  const shapesIds = body.annotationsIds;

  Logger.info(`handleWhiteboardDelete ${whiteboardId}`);
  Logger.info(`delete Annotations ${shapesIds}`);

  check(whiteboardId, String);
  check(shapesIds, Array);

  const result = await Promise.all(shapesIds.map(async (shapeId) => {
    AnnotationsStreamer(meetingId).emit('removed', { meetingId, whiteboardId, shapeId });
    await removeAnnotation(meetingId, whiteboardId, shapeId);
  }));
  return result;
}
