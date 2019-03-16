import React from 'react';
import { observer } from 'mobx-react';
import { Formik, Field, FormikProps } from 'formik';

import styled from 'styled-components';
import TrackerStore, { TrackInterval } from '../stores/TrackerStore';
import { colorArray } from '../enums';

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
    </Container>
  );
};

export default observer(App);
