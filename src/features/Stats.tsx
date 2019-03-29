import React, { useEffect } from 'react';
import { Observer } from 'mobx-react';
import styled from 'styled-components';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import TrackerStore from '../mobx/TrackerStore';
import { colorArray } from '../enums';

const Container = styled.main`
  width: 900px;
  height: 900px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .rbc-calendar {
    flex: 1 1;
  }
  .rbc-event {
    padding: 0;
    background: none;
  }
`;
const localizer = BigCalendar.momentLocalizer(moment);

const views = [BigCalendar.Views.MONTH /* BigCalendar.Views.WEEK, BigCalendar.Views.DAY */];

const Event = styled.div`
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 5px;
  font-size: 12px;
`;

const EventCount = styled.strong`
  color: black;
  font-size: 10px;
`;

const EventComponent = (props: any) => {
  const background = Array.isArray((colorArray as any)[props.event.color])
    ? (colorArray as any)[props.event.color]
    : ['gray', 'black'];

  return (
    <Event
      style={{
        background: `gray linear-gradient(to bottom right, ${background.join(',')})`,
      }}
    >
      {props.title} <EventCount>{props.event.value}</EventCount>
    </Event>
  );
};

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

            <BigCalendar
              components={{ event: EventComponent }}
              events={TrackerStore.calendarStats}
              views={views}
              showMultiDayTimes
              step={60}
              resourceIdAccessor={(event: any) => event.trackerId}
              defaultDate={new Date()}
              localizer={localizer}
            />
          </>
        )}
      </Observer>
    </Container>
  );
};

export default Stats;
