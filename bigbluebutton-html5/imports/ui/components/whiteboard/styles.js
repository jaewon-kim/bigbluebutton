import styled, { createGlobalStyle, css, keyframes  } from 'styled-components';
import { 
  borderSize, 
  borderSizeLarge,
  lgPaddingX,
  statusIconSize,
  statusInfoHeight,
  presentationMenuHeight } from '/imports/ui/stylesheets/styled-components/general';
import { 
  toolbarButtonColor, 
  colorWhite, 
  colorBlack, 
  colorDanger,
  colorGray,
  colorGrayDark,
  colorSuccess,
  colorGrayLightes } from '/imports/ui/stylesheets/styled-components/palette';
import {
  fontSizeLarger,
} from '/imports/ui/stylesheets/styled-components/typography';
import Button from '/imports/ui/components/common/button/component';
import Icon from '/imports/ui/components/common/icon/component';
import { headingsFontWeight } from '/imports/ui/stylesheets/styled-components/typography';
import {
  
} from '/imports/ui/stylesheets/styled-components/palette';
import {
 
} from '/imports/ui/stylesheets/styled-components/general';

const DropdownButton = styled.button`
  background-color: #FFF;
  border: none;
  border-radius: 7px;
  color: ${colorGrayDark};
  cursor: pointer;
  padding: .3rem .5rem;
  padding-bottom: 6px;
  tab-index: 0;

  &:hover {
    background-color: #ececec;
  }
`;
const Left = styled.div`
  cursor: pointer;
  position: absolute;
  left: 0px;
  right: auto;
  bottom: -35px;
  z-index: 999;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid ${colorWhite};
  height: 30px;

  > div {
    padding: 0px 4px 4px 4px;
    background-color: ${colorWhite};
    width: 110px;
    height: 100%;
  }

  button {
    height: 100%;
    width: 100px;
  }

  [dir="rtl"] & {
    right: auto;
    left : ${borderSize};
  }
`;

const Right = styled.div`
  cursor: pointer;
  position: absolute;
  left: auto;
  right: 0px;
  z-index: 999;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid ${colorWhite};
  height: 44px;

  > div {
    padding: 2px 4px 2px 4px;
    background-color: ${colorWhite};
    width: 50px;
    height: 100%;
  }

  button {
    height: 100%;
    width: 100%;
  }

  [dir="rtl"] & {
    right: auto;
    left : ${borderSize};
  }
`;

const ToastText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
  position: relative;
  top: ${borderSizeLarge};
  width: auto;
  font-weight: ${headingsFontWeight};

  [dir="rtl"] & {
    text-align: right;
  }
`;

const StatusIcon = styled.span`
  margin-left: auto;

  [dir="rtl"] & {
    margin-right: auto;
    margin-left: 0;
  }

  & > i {
    position: relative;
    top: 1px;
    height: ${statusIconSize};
    width: ${statusIconSize};
  }
`;

const rotate = keyframes`
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
`;

const ToastIcon = styled(Icon)`
  position: relative;
  width: ${statusIconSize};
  height: ${statusIconSize};
  font-size: 117%;
  bottom: ${borderSize};
  left: ${statusInfoHeight};

  [dir="rtl"] & {
    left: auto;
    right: ${statusInfoHeight};
  }

  ${({ done }) => done && `
    color: ${colorSuccess};
  `}

  ${({ error }) => error && `
    color: ${colorDanger};
  `}

  ${({ loading }) => loading && css`
    color: ${colorGrayLightest};
    border: 1px solid;
    border-radius: 50%;
    border-right-color: ${colorGray};
    animation: ${rotate} 1s linear infinite;
  `}
`;

const Line = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  padding: ${lgPaddingX} 0;
`;

const ButtonIcon = styled(Icon)`
  width: 1em;
  text-align: center;
`;


const TldrawGlobalStyle = createGlobalStyle`
  ${({ hideContextMenu }) => hideContextMenu && `
    #TD-ContextMenu {
      display: none;
    }
  `}
  ${({ menuOffset }) => `
    #TD-StylesMenu {
      position: relative;
      right: ${menuOffset};
    }
  `}
  #TD-PrimaryTools-Image {
    display: none;
  }
  #slide-background-shape div {
    pointer-events: none;
    user-select: none;
  }
  div[dir*="ltr"]:has(button[aria-expanded*="false"][aria-controls*="radix-"]) {
    pointer-events: none;
  }
  [aria-expanded*="false"][aria-controls*="radix-"] {
    display: none;
  }
  [class$="-side-right"] {
    top: -1px;
  }
  ${({ hasWBAccess, isPresenter, size }) => (hasWBAccess || isPresenter) && `
    #TD-Tools-Dots {
      height: ${size}px;
      width: ${size}px;
    }
    #TD-Delete {
      & button {
        height: ${size}px;
        width: ${size}px;
      }
    }
    #TD-PrimaryTools button {
        height: ${size}px;
        width: ${size}px;
    }
    #TD-Styles {
      border-width: ${borderSize};
    }
    #TD-TopPanel-Undo,
    #TD-TopPanel-Redo,
    #TD-Styles {
      height: 92%;
      border-radius: 7px;

      &:hover {
        border: solid ${borderSize} #ECECEC;
        background-color: #ECECEC;
      }
      &:focus {
        border: solid ${borderSize} ${colorBlack};
      }
    }
    #TD-Styles,
    #TD-TopPanel-Undo,
    #TD-TopPanel-Redo {
      margin: ${borderSize} ${borderSizeLarge} 0px ${borderSizeLarge};
    }
  `}
  ${({ hasWBAccess, isPresenter, panSelected }) => (hasWBAccess || isPresenter) && panSelected && `
    [id^="TD-PrimaryTools-"] {
      &:hover > div,
      &:focus > div {
        background-color: var(--colors-hover) !important;
      }
    }
  `}
  ${({ darkTheme }) => darkTheme && `
    #TD-TopPanel-Undo,
    #TD-TopPanel-Redo,
    #TD-Styles {
      &:focus {
        border: solid ${borderSize} ${colorWhite} !important;
      }
    }
  `}
  ${({ isPresenter }) => (!isPresenter) && `
    #presentationInnerWrapper div{
      cursor: default !important;
    }
  `}

  ${({ isToolbarVisible }) => (!isToolbarVisible) && `
    #TD-Tools {
      visibility: hidden;
    }
    #TD-Styles-Parent {
      visibility: hidden;
    }
    #WhiteboardOptionButton {
      opacity: 0.2;
    }
  `}
`;

const EditableWBWrapper = styled.div`
  &, & > :first-child {
    cursor: inherit !important;
  }
`;

const PanTool = styled(Button)`
  border: none !important;
  padding: 0;
  margin: 0;
  border-radius: 7px;
  background-color: ${colorWhite};
  color: ${toolbarButtonColor};

  & > i {
    font-size: ${fontSizeLarger} !important;
    [dir="rtl"] & {
      -webkit-transform: scale(-1, 1);
      -moz-transform: scale(-1, 1);
      -ms-transform: scale(-1, 1);
      -o-transform: scale(-1, 1);
      transform: scale(-1, 1);
    }
  }
  ${({ panSelected }) => !panSelected && `
    &:hover,
    &:focus {
      background-color: var(--colors-hover) !important;
    }
  `}
`;

export default {
  TldrawGlobalStyle,
  EditableWBWrapper,
  PanTool,
  DropdownButton,
  Right,
  Left,
  ToastText,
  StatusIcon,
  ToastIcon,
  Line,
  ButtonIcon,
};
