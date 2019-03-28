import React, { useState } from 'react';
import styled from 'styled-components';
import { Observer } from 'mobx-react';
import posed from 'react-pose';

import { TrackerModel, TrackInterval } from '../mobx/TrackerStore';
import { colorArray } from '../enums';

const Box = styled.button`
  padding: 20px;
  margin: 0 0 20px;
  height: 155px;
  width: 155px;
  border-radius: 10px;
  border: none;
  outline: none;
  background: linear-gradient(
    to left top,
    ${(props: { bgColor: [string, string] }) => props.bgColor && props.bgColor.join(', ')}
  );

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

const PosedCount = posed.div({
  init: { scale: 1 },
  press: { scale: 1.3 },
});

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
  const [clicked, setClicked] = useState(false);

  return (
    <Observer>
      {() => (
        <Box
          onClick={() => {
            model.increment();
            setClicked(true);
            setTimeout(() => setClicked(false), 100);
          }}
          bgColor={(colorArray as any)[model.color]}
        >
          <Name>{model.name}</Name>
          <Interval>{intervals[model.intervalId]}</Interval>
          <Count>
            <PosedCount pose={clicked ? 'press' : 'init'}>
              {model.value}/{model.target}
            </PosedCount>
          </Count>
        </Box>
      )}
    </Observer>
  );
};

export default Tracker;
