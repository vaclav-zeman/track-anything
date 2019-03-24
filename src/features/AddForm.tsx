import React from 'react';
import { observer } from 'mobx-react';
import { Formik, FormikProps } from 'formik';

import styled from 'styled-components';
import TrackerStore, { TrackInterval } from '../stores/TrackerStore';
import { colorArray } from '../enums';
import { history } from '../App';

export type IFormValues = {
  name: string;
  target: number;
  color: string;
  intervalId: TrackInterval;
};

const Container = styled.main`
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
`;

const Input = styled.input`
  background: white;
  border-radius: 5px;
  border: 2px solid #e2e2e2;
  display: block;
  font-size: 18px;
  height: 50px;
  margin: 0 0 20px;
  padding: 0 10px;
  width: 100%;
`;

const ColorBox = styled.label`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px 10px;
  text-align: center;

  input {
    opacity: 0.3;
  }
`;

const Color = (props: any) => (
  <ColorBox style={{ backgroundColor: props.value }}>
    <input {...props} type="radio" />
  </ColorBox>
);

const Button = styled.button`
  display: block;
  width: 100%;
  height: 70px;
  background: #6a5db8;
  font-size: 18px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  margin: 20px 0;
`;

const AddForm = () => {
  return (
    <Container>
      <Formik
        initialValues={{ name: '', target: 0, color: '', intervalId: TrackInterval.DAY }}
        onSubmit={async (values, { resetForm }) => {
          await TrackerStore.addTracker(values);
          history.push('/');
          resetForm();
        }}
      >
        {({ handleSubmit, handleChange, values }: FormikProps<IFormValues>) => (
          <form onSubmit={handleSubmit}>
            <h1>Add Tracker</h1>
            <Input
              name="name"
              placeholder="Name (e.g. Yoga)"
              type="text"
              onChange={handleChange}
              value={values.name}
            />
            <Input
              name="target"
              placeholder="Target"
              type="number"
              onChange={handleChange}
              value={values.target}
            />
            <Input name="intervalId" onChange={handleChange} value={values.intervalId} as="select">
              <option value={TrackInterval.DAY}>Day</option>
              <option value={TrackInterval.WEEK}>Week</option>
              <option value={TrackInterval.MONTH}>Month</option>
              <option value={TrackInterval.NEVER}>Never</option>
            </Input>
            {colorArray.map(color => (
              <Color
                key={color}
                onChange={handleChange}
                name="color"
                checked={color === values.color}
                value={color}
              />
            ))}
            <Button type="submit">Create Tracker</Button>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default observer(AddForm);
