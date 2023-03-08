import { withTracker } from 'meteor/react-meteor-data';
import React, { useContext } from 'react';
import {
  ColorStyle,
  DashStyle,
  SizeStyle,
  TDShapeType,
} from '@tldraw/tldraw';
import {
  getShapes,
  getCurrentPres,
  initDefaultPages,
  persistShape,
  removeShapes,
  isMultiUserActive,
  hasMultiUserAccess,
  changeCurrentSlide,
  notifyNotAllowedChange,
  notifyShapeNumberExceeded,
  sendTestEvent,
} from './service';
import Whiteboard from './component';
import { UsersContext } from '../components-data/users-context/context';
import Auth from '/imports/ui/services/auth';
import PresentationToolbarService from '../presentation/presentation-toolbar/service';
import { layoutSelect } from '../layout/context';
import FullscreenService from '/imports/ui/components/common/fullscreen-button/service';
import Meetings from '/imports/api/meetings';

const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;
const WHITEBOARD_CONFIG = Meteor.settings.public.whiteboard;

const WhiteboardContainer = (props) => {
  const usingUsersContext = useContext(UsersContext);
  const isRTL = layoutSelect((i) => i.isRTL);
  const width = layoutSelect((i) => i?.output?.presentation?.width);
  const height = layoutSelect((i) => i?.output?.presentation?.height);
  const { users } = usingUsersContext;
  const currentUser = users[Auth.meetingID][Auth.userID];
  const isPresenter = currentUser.presenter;
  const isModerator = currentUser.role === ROLE_MODERATOR;
  const { maxStickyNoteLength, maxNumberOfAnnotations } = WHITEBOARD_CONFIG;
  const fontFamily = WHITEBOARD_CONFIG.styles.text.family;
  const handleToggleFullScreen = (ref) => FullscreenService.toggleFullScreen(ref);

  const { shapes } = props;
  const hasShapeAccess = (id) => {
    const owner = shapes[id]?.userId;
    const isBackgroundShape = id?.includes('slide-background');
    const hasAccess = !isBackgroundShape
      && ((owner && owner === currentUser?.userId) || !owner || isPresenter || isModerator);
    return hasAccess;
  };
    // set shapes as locked for those who aren't allowed to edit it
  Object.entries(shapes).forEach(([shapeId, shape]) => {
    if (!shape.isLocked && !hasShapeAccess(shapeId)) {
      shape.isLocked = true;
    }
  });

  return (
    <Whiteboard
      {... {
        isPresenter,
        isModerator,
        currentUser,
        isRTL,
        width,
        height,
        maxStickyNoteLength,
        maxNumberOfAnnotations,
        fontFamily,
        hasShapeAccess,
        handleToggleFullScreen,
      }}
      {...props}
      meetingId={Auth.meetingID}
    />
  );
};

export default withTracker(({
  whiteboardId,
  curPageId,
  intl,
  slidePosition,
  svgUri,
  podId,
  presentationId,
  darkTheme,
}) => {
  console.log("=======withTracker============");
  const shapes = getShapes(whiteboardId, curPageId, intl);
  const curPres = getCurrentPres();
  const usingUsersContext = useContext(UsersContext);
  const { users } = usingUsersContext;
  const currentUser = users[Auth.meetingID][Auth.userID];

  const meetingT = Meetings.findOne({ meetingId: Auth.meetingID });

  console.log(meetingT); //meetingT의 meta를 통해서 필요한 정보 전달 및 확인 가능
  console.log(currentUser.extId); //외부에서 전달된 사용자 아이디 API의 userID를 통하여 전달되는 아이디로 NotaryWeb의 Key 로 사용가능

  shapes['slide-background-shape'] = {
    assetId: `slide-background-asset-${curPageId}`,
    childIndex: -1,
    id: 'slide-background-shape',
    name: 'Image',
    type: TDShapeType.Image,
    parentId: `${curPageId}`,
    point: [0, 0],
    isLocked: true,
    size: [slidePosition?.width || 0, slidePosition?.height || 0],
    style: {
      dash: DashStyle.Draw,
      size: SizeStyle.Medium,
      color: ColorStyle.Blue,
    },
  };

  const assets = {};
  assets[`slide-background-asset-${curPageId}`] = {
    id: `slide-background-asset-${curPageId}`,
    size: [slidePosition?.width || 0, slidePosition?.height || 0],
    src: svgUri,
    type: 'image',
  };

  return {
    initDefaultPages,
    persistShape,
    isMultiUserActive,
    hasMultiUserAccess,
    changeCurrentSlide,
    shapes,
    assets,
    curPres,
    removeShapes,
    zoomSlide: PresentationToolbarService.zoomSlide,
    skipToSlide: PresentationToolbarService.skipToSlide,
    nextSlide: PresentationToolbarService.nextSlide,
    previousSlide: PresentationToolbarService.previousSlide,
    numberOfSlides: PresentationToolbarService.getNumberOfSlides(podId, presentationId),
    notifyNotAllowedChange,
    notifyShapeNumberExceeded,
    sendTestEvent,
    darkTheme,
  };
})(WhiteboardContainer);
