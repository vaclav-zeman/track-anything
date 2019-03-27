import React, { useEffect } from 'react';
import { Observer } from 'mobx-react';
import styled from 'styled-components';

import TrackerStore from '../stores/TrackerStore';

const Container = styled.main`
  max-width: 600px;
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
      TrackerStore.stats = [];
    };
  }, []);

  return (
    <Container>
      <Observer>
        {() => (
          <>
            {TrackerStore.isLoading && 'Loading...'}

            {[...Object.entries(TrackerStore.stats)].map(([key, data]: any) => (
              <div key={key}>
                {key}

                {data.map((record: any) => (
                  <pre>
                    {record.name} - {record.value}
                  </pre>
                ))}
              </div>
            ))}
          </>
        )}
      </Observer>
    </Container>
  );
};

export default Stats;
