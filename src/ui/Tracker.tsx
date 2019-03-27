import React from 'react';
import styled from 'styled-components';
import { Observer } from 'mobx-react';

import { TrackerModel, TrackInterval } from '../stores/TrackerStore';

const Box = styled.button`
  padding: 20px;
  margin: 0 0 20px;
  height: 155px;
  width: 155px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.4);
  background: ${(props: { bgColor?: string }) => props.bgColor};

  @media (min-width: 768px) {
    width: 170px;
    height: 170px;
  }
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

const intervals = {
  [TrackInterval.DAY]: 'Today',
  [TrackInterval.WEEK]: 'This Week',
  [TrackInterval.MONTH]: 'This Month',
  [TrackInterval.NEVER]: '',
};

const Tracker = ({ model }: IProps) => {  
  return (
    <Observer>
      {() => (
        <Box onClick={model.increment} bgColor={model.color}>
          <Name>{model.name}</Name>
          <Interval>{intervals[model.intervalId]}</Interval>
          <Count>
            {model.value} / {model.target}
          </Count>
        </Box>
      )}
    </Observer>
  );
};

export default Tracker;
