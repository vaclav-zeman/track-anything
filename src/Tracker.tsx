import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import TrackerStore, { TrackerModel } from './stores/TrackerStore';

const Box = styled.button`
  padding: 20px;
  margin: 20px;
  height: 150px;
  width: 150px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.4);
  background: ${(props: { bgColor?: string }) => props.bgColor};
`;

type IProps = {
  model: TrackerModel;
};

const Tracker = ({ model }: IProps) => {
  return (
    <Box onClick={model.increment} bgColor={model.color}>
      <span>{model.name}</span>
      <br />
      <strong>
        {model.currentCount} / {model.limit}
      </strong>
    </Box>
  );
};

export default observer(Tracker);
