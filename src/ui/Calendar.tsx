import React from 'react';
import styled from 'styled-components';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { colorArray } from '../enums';
import { ICalendarRecord } from '../mobx/TrackerStore';

interface IProps {
  events: ICalendarRecord[];
}

const localizer = BigCalendar.momentLocalizer(moment);

const views = [BigCalendar.Views.MONTH /* BigCalendar.Views.WEEK, BigCalendar.Views.DAY */];

const Container = styled.div`
  flex: 1 1;
  min-height: 800px;

  .rbc-calendar {
    flex: 1 1;
  }
  .rbc-event {
    padding: 0;
    background: none;
  }
`;

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
    ? (colorArray as any)[props.event.color][1]
    : 'gray';

  return (
    <Event
      style={{
        background,
      }}
    >
      {props.title} <EventCount>{props.event.value}</EventCount>
    </Event>
  );
};

export default function Calendar({ events }: IProps) {
  return (
    <Container>
      <BigCalendar
        components={{ event: EventComponent }}
        events={events}
        views={views}
        showMultiDayTimes
        step={60}
        resourceIdAccessor={(event: any) => event.trackerId}
        defaultDate={new Date()}
        localizer={localizer}
      />
    </Container>
  );
}
