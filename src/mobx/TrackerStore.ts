import { observable, action, computed } from 'mobx';
import moment from 'moment';

import { IFormValues } from '../features/AddForm';
import api from '../utils/ApiClient';
import TrackerModel from './TrackerModel';

export type ITracker = {
  id: string;
  name: string;
  target: number;
  color: string;
  intervalId: TrackInterval;
  value: number;
};

export type IStatsRecord = {
  id: string;
  trackerId: string;
  color?: string;
  name: string;
  value: number;
  createdAt: Date;
};

export type ICalendarRecord = {
  id: string;
  trackerId: string;
  color?: string;
  title: string;
  value: number;
  start: Date;
  end: Date;
};

export enum TrackInterval {
  DAY = 1,
  WEEK = 2,
  MONTH = 3,
  NEVER = 4,
}

const userId = 5;

class TrackerStore {
  @observable trackers: Array<TrackerModel> = [];
  @observable isLoading: boolean = false;
  @observable stats: { [key: string]: Array<IStatsRecord> } = {};

  createNewModel = (tracker: ITracker): TrackerModel =>
    new TrackerModel(
      tracker.id,
      tracker.name,
      tracker.target,
      tracker.color,
      tracker.intervalId,
      tracker.value
    );

  @computed
  get calendarStats(): ICalendarRecord[] {
    const events = [...Object.entries(this.stats)].reduce((acc: any, [date, records]) => {
      const recArray = Object.values(records).map(record => ({
        id: record.id,
        trackerId: record.trackerId,
        color: record.color,
        title: record.name,
        value: record.value,
        start: moment(record.createdAt).toDate(),
        end: moment(record.createdAt)
          .add('60', 'minutes')
          .toDate(),
      }));
      return [...acc, ...recArray];
    }, []);

    return events;
  }

  @action.bound
  async getTrackers() {
    // Is already fetched?
    if (this.trackers.length) {
      return;
    }

    this.isLoading = true;
    const { data } = await api.get('/users/' + userId + '/trackers');

    this.trackers = data.map(this.createNewModel);
    this.isLoading = false;
  }

  @action.bound
  async addTracker(values: IFormValues) {
    const { data } = await api.post('/users/' + userId + '/trackers', values);

    this.trackers = [this.createNewModel(data), ...this.trackers];
  }

  @action.bound
  async getStats() {
    this.isLoading = true;
    const { data } = await api.get('/users/' + userId + '/records');
    this.stats = data;
    this.isLoading = false;
  }
}

const store = new TrackerStore();

export default store;
