import React, { useEffect } from 'react';
import { Observer } from 'mobx-react';
import styled from 'styled-components';

import Tracker from '../ui/Tracker';
import TrackerStore, { TrackInterval } from '../stores/TrackerStore';

export type IFormValues = {
  name: string;
  target: number;
  color: string;
  interval: TrackInterval;
};

const Container = styled.main`
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const TrackerList = () => {
  useEffect(() => {
    TrackerStore.getTrackers();
  }, []);

  return (
    <Container>
      <Observer>
        {() => (
          <>
            {TrackerStore.isLoading && `Loading...`}

            {TrackerStore.trackers.map(tracker => (
              <Tracker model={tracker} key={tracker.id} />
            ))}

            {TrackerStore.trackers.length === 0 && (
              <strong style={{ textAlign: 'center' }}>So empty</strong>
            )}
          </>
        )}
      </Observer>
    </Container>
  );
};

export default TrackerList;
