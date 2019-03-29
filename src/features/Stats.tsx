import React, { useEffect } from 'react';
import { Observer } from 'mobx-react';
import styled from 'styled-components';

import TrackerStore from '../mobx/TrackerStore';
import Calendar from '../ui/Calendar';

const Container = styled.main`
  max-width: 900px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Stats = () => {
  useEffect(() => {
    TrackerStore.getStats();

    return () => {
      TrackerStore.stats = {};
    };
  }, []);

  return (
    <Container>
      <Observer>
        {() => (
          <>
            {TrackerStore.isLoading && 'Loading...'}

            <Calendar events={TrackerStore.calendarStats} />
          </>
        )}
      </Observer>
    </Container>
  );
};

export default Stats;
