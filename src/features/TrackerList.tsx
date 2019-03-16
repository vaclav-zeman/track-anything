import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import Tracker from '../ui/Tracker';
import TrackerStore, { TrackInterval } from '../stores/TrackerStore';

export type IFormValues = {
  name: string;
  limit: number;
  color: string;
  interval: TrackInterval;
};

const Container = styled.main`
  width: 600px;
  padding: 20px;
  margin: 0 auto;
`;

const TrackerList = () => {
  return (
    <Container>
      {TrackerStore.trackers.map(tracker => (
        <Tracker model={tracker} key={tracker.id} />
      ))}
    </Container>
  );
};

export default observer(TrackerList);
