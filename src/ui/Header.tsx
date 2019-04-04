import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { colorArray } from '../enums';

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
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
      background: linear-gradient(to left bottom, ${colorArray.grape.join(',')});
      color: white;
      font-weight: bold;
      border-radius: 30px;
      padding: 13px 23px;
    `}
`;

const Header = () => (
  <Wrap>
    <StyledLink to="/">Trackers</StyledLink>
    <StyledLink primary to="/add">
      Add Tracker
    </StyledLink>
    <StyledLink to="/stats">Stats</StyledLink>
  </Wrap>
);

export default Header;
