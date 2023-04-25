import styled from 'styled-components';

import { FlexColumn } from '/imports/ui/stylesheets/styled-components/placeholders';
import Styled from '/imports/ui/components/user-list/styles';
import StyledContent from '/imports/ui/components/user-list/user-list-content/styles';
import {
  ScrollboxVertical,
  VirtualizedScrollboxVertical,
} from '/imports/ui/stylesheets/styled-components/scrollable';
import { borderSize, mdPaddingY } from '/imports/ui/stylesheets/styled-components/general';
import { colorPrimary, userListBg } from '/imports/ui/stylesheets/styled-components/palette';

const Container = styled(StyledContent.Container)``;

const SmallTitle = styled(Styled.SmallTitle)``;

const Separator = styled(StyledContent.Separator)``;

const UserListColumn = styled(FlexColumn)`
  min-height: 0;
  flex-grow: 1;
`;

const VirtualizedScrollableList = styled(ScrollboxVertical)`



  &:hover {
    /* Visible in Windows high-contrast themes */
    outline: transparent;
    outline-style: dotted;
    outline-width: ${borderSize};
  }

  &:focus {
    outline: none;
  }

  &:focus,
  &:active {
    box-shadow: inset 0 0 1px ${colorPrimary};
    border-radius: none;
    outline-style: transparent;
  }

  flex-grow: 1;
  flex-shrink: 1;

  margin: 0 0 1px ${mdPaddingY};

  [dir="rtl"] & {
    margin: 0 ${mdPaddingY} 1px 0;
  }
  margin-left: 0;
  padding-top: 1px;
`;

const VirtualizedList = styled(VirtualizedScrollboxVertical)`
  
`;

export default {
  Container,
  SmallTitle,
  Separator,
  UserListColumn,
  VirtualizedScrollableList,
  VirtualizedList,
};
