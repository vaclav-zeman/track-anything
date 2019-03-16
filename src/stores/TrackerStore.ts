import { observable, action, autorun, toJS, ObservableMap } from 'mobx';
import { IFormValues } from '../App';

export type ITracker = {
  name: string;
  limit: number;
  color: string;
  interval: TrackInterval;
  currentCount: number;
};

export enum TrackInterval {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  NEVER = 'never',
}

export class TrackerModel {
  name = '';
  limit = 0;
  color = '';
  interval = TrackInterval.DAY;
  id = '';
  @observable currentCount = 0;

  constructor(
    name: string,
    limit: number,
    color: string,
    interval: TrackInterval,
    currentCount?: number
  ) {
    this.id =
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9);
    this.name = name;
    this.limit = limit;
    this.color = color;
    this.interval = interval;

    if (currentCount) {
      this.currentCount = currentCount;
    }
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
      this.trackers = JSON.parse(cached).map(
        (tracker: ITracker) =>
          new TrackerModel(
            tracker.name,
            tracker.limit,
            tracker.color,
            tracker.interval,
            tracker.currentCount
          )
      );
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
