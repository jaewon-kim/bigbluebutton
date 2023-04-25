import styled, { css, keyframes } from 'styled-components';
import {
  userIndicatorsOffset,
  mdPaddingY,
  indicatorPadding,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  colorPrimary,
  colorWhite,
  userListBg,
  colorSuccess,
  colorDanger,
  colorOffWhite,
} from '/imports/ui/stylesheets/styled-components/palette';

const Content = styled.div`
  color: ${colorWhite};
  top: 50%;
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  font-size: 110%;
  text-transform: capitalize;

  &,
  & > * {
    line-height: 0; // to keep centralized vertically
  }
`;

const Image = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const Img = styled.img`
  object-fit: cover;
  overflow: hidden;

  ${({ moderator }) => moderator && `
    border-radius: 3px;
  `}

  ${({ moderator }) => !moderator && `
    border-radius: 50%;
  `}
`;

const pulse = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
`;

const Talking = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: inherit;

  ${({ talking }) => talking && css`
    background-color: currentColor;
  `}

  ${({ talking, animations }) => talking && animations && css`
    animation: ${pulse} 1s infinite ease-in;
  `}

  &::before {
    ${({ talking, animations }) => talking && !animations && `
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: currentColor;
      border-radius: inherit;
      box-shadow: 0 0 0 4px currentColor;
      opacity: .5;
    `}
  }
`;

const Avatar = styled.div`
  position: relative;
  height: 2.25rem;
  width: 2.25rem;
  text-align: center;
  font-size: .85rem;
  border: 2px solid transparent;
  user-select: none;
  border-radius: 20px;
  

  ${({ animations }) => animations && `
    transition: .3s ease-in-out;
  `}


  ${({ moderator }) => moderator && `
    border-radius: 20px;
  `}

  

  ${({
    presenter, isChrome, isFirefox, isEdge,
  }) => presenter && (isChrome || isFirefox || isEdge) && `
    &:before {
      padding: ${indicatorPadding} !important;
    }
  `}

  

  ${({
    whiteboardAccess, isChrome, isFirefox, isEdge,
  }) => whiteboardAccess && (isChrome || isFirefox || isEdge) && `
    &:before {
      padding: ${indicatorPadding};
    }
  `}


`;

const Skeleton = styled.div`
  & .react-loading-skeleton {    
    height: 2.25rem;
    width: 2.25rem;
  }
`;

export default {
  Content,
  Image,
  Img,
  Talking,
  Avatar,
  Skeleton,
};
