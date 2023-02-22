import { Meteor } from 'meteor/meteor';
import clearWhiteboard from './methods/clearWhiteboard';
import sendWhiteboardUserEvent from './methods/sendWhiteboardUserEvt';
import sendAnnotations from './methods/sendAnnotations';
import sendBulkAnnotations from './methods/sendBulkAnnotations';
import deleteAnnotations from './methods/deleteAnnotations';

Meteor.methods({
  clearWhiteboard,
  sendAnnotations,
  sendBulkAnnotations,
  deleteAnnotations,
  sendWhiteboardUserEvent,
});
