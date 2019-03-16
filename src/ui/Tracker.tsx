import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { TrackerModel } from '../stores/TrackerStore';

const Box = styled.button`
  padding: 20px;
  margin: 0 0 20px;
  height: 165px;
  width: 165px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.4);
  background: ${(props: { bgColor?: string }) => props.bgColor};
`;

const Name = styled.strong`
  text-transform: uppercase;
  font-size: 20px;
  color: white;
  font-weight: 800;
`;

const Interval = styled.span`
  text-transform: uppercase;
  display: block;
  margin: 5px 0 10px;
  font-weight: 600;
`;

const Count = styled.span`
  font-size: 30px;
  font-weight: 800;
`;

type IProps = {
  model: TrackerModel;
};

const Tracker = ({ model }: IProps) => {
  return (
    <Box onClick={model.increment} bgColor={model.color}>
      <Name>{model.name}</Name>
      <Interval>this {model.interval}</Interval>
      <Count>
        {model.currentCount} / {model.limit}
      </Count>
    </Box>
  );
};

export default observer(Tracker);
