import React from 'react';
import PropTypes from 'prop-types';
import Styled from './styles';
import Left from './left/component';
import Right from './right/component';

const Header = ({
  leftButtonProps,
  rightButtonProps,
  customRightButton,
  'data-test': dataTest,
  ...rest
}) => {
  const renderCloseButton = () => (
    <Right {...rightButtonProps} />
  );

  const renderCustomRightButton = () => (
    <Styled.RightWrapper>
      {customRightButton}
    </Styled.RightWrapper>
  );

  return (
    <>
      <Styled.Header data-test={dataTest ? dataTest : ''} {...rest}>
        {leftButtonProps ? <Left {...leftButtonProps} /> : <div />}
        {customRightButton
          ? renderCustomRightButton()
          : rightButtonProps
            ? renderCloseButton()
            : null}
        
      </Styled.Header>
      <div style={{
        fontFamily:'Josefin Sans',
        fontSize:'2rem',
        fontWeight:600,
        color:'#de7073',
        marginTop:'-14px',
        paddingBottom:'10px'
      }}>
        Chatting
      </div>
    </>
  );
}

Header.propTypes = {
  leftButtonProps: PropTypes.object,
  rightButtonProps: PropTypes.object,
  customRightButton: PropTypes.element,
  dataTest: PropTypes.string,
};

export default Header;
