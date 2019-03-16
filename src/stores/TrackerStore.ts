import { observable, action, autorun, toJS, ObservableMap } from 'mobx';
import { IFormValues } from '../App';

export type ITracker = {
  name: string;
  totalCount: number;
  color: string;
  interval: TrackInterval;
  currentCount: number;
};

export enum TrackInterval {
  DAY,
  WEEK,
  MONTH,
  NEVER,
}

export class TrackerModel {
  name = '';
  limit = 0;
  color = '';
  interval = TrackInterval.DAY;
  id = '';
  @observable currentCount = 0;

  constructor(name: string, limit: number, color: string, interval: TrackInterval) {
    this.id =
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9);
    this.name = name;
    this.limit = limit;
    this.color = color;
    this.interval = interval;
  }

  @action.bound
  increment() {
    if (this.currentCount < this.limit) {
      this.currentCount += 1;
    }
  }
}

class TrackerStore {
  @observable trackers: Array<TrackerModel> = [];

  constructor() {
    const cached = localStorage.getItem('trackers');

    if (cached) {
      this.trackers = JSON.parse(cached);
    }

    autorun(() => localStorage.setItem('trackers', JSON.stringify(toJS(this.trackers))), {
      delay: 1000,
    });
  }

  @action
  addTracker(values: IFormValues) {
    this.trackers.push(new TrackerModel(values.name, values.limit, values.color, values.interval));
  }
}

const store = new TrackerStore();

export default store;
