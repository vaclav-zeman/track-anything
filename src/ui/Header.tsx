import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Wrap = styled.header`
  text-align: center;
  padding: 15px 0;
`;

const StyledLink = styled(Link)`
  margin: 0 20px;
  color: black;
  text-decoration: none;
  padding: 6px 10px;
  display: inline-block;

  ${(props: { primary?: boolean }) =>
    props.primary &&
    css`
      background: #00b3e6;
      color: white;
      border-radius: 5px;
    `}
`;

const Header = () => (
  <Wrap>
    <StyledLink to="/">Trackers</StyledLink>
    <StyledLink primary to="/add">
      Add +
    </StyledLink>
    <StyledLink to="/stats">Stats</StyledLink>
  </Wrap>
);

export default Header;
