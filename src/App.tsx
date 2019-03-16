import React from 'react';
import { observer } from 'mobx-react';
import { Formik, Field, FormikProps } from 'formik';
import './App.css';
import Tracker from './Tracker';
import styled from 'styled-components';
import TrackerStore, { TrackInterval } from './stores/TrackerStore';

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
const colorArray = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
];

const App = () => {
  return (
    <Container>
      <Formik
        initialValues={{ name: '', limit: 0, color: '', interval: TrackInterval.DAY }}
        onSubmit={(values, { resetForm }) => {
          TrackerStore.addTracker(values);
          resetForm();
        }}
      >
        {({ handleSubmit }: FormikProps<IFormValues>) => (
          <form onSubmit={handleSubmit}>
            Add Tracker
            <Field name="name" placeholder="name" type="text" />
            <Field name="limit" placeholder="limit" type="number" />
            <Field component="select" name="interval">
              <option value={TrackInterval.DAY}>Day</option>
              <option value={TrackInterval.WEEK}>Week</option>
              <option value={TrackInterval.MONTH}>Month</option>
              <option value={TrackInterval.NEVER}>Never</option>
            </Field>
            <Field component="select" name="color">
              {colorArray.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </Field>
            <button type="submit">Add</button>
          </form>
        )}
      </Formik>

      {TrackerStore.trackers.map(tracker => (
        <Tracker model={tracker} key={tracker.id} />
      ))}
    </Container>
  );
};

export default observer(App);
