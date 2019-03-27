import { observable, action, transaction } from 'mobx';
import { IFormValues } from '../features/AddForm';
import api from '../utils/ApiClient';

export type ITracker = {
  id: string;
  name: string;
  target: number;
  color: string;
  intervalId: TrackInterval;
  value: number;
};

export enum TrackInterval {
  DAY = 1,
  WEEK = 2,
  MONTH = 3,
  NEVER = 4,
}

export class TrackerModel {
  name: string;
  target: null | number;
  color: string;
  intervalId: TrackInterval;
  id: string;
  @observable value: number;

  constructor(
    id: string,
    name: string,
    target: number,
    color: string,
    intervalId: TrackInterval,
    value?: number
  ) {
    this.id = id;
    this.name = name;
    this.target = target;
    this.color = color;
    this.intervalId = intervalId;
    this.value = value || 0;
  }

  get isTargetReached() {
    if (this.target) {
      return this.value === this.target;
    }

    return false;
  }

  @action.bound
  async increment() {
    this.value += 1;

    await api.post('/users/' + userId + '/trackers/' + this.id + '/record', { value: 1 });
  }
}

const userId = 5;

class TrackerStore {
  @observable trackers: Array<TrackerModel> = [];
  @observable isLoading: boolean = false;
  @observable stats: any = {};

  createNewModel = (tracker: ITracker): TrackerModel =>
    new TrackerModel(
      tracker.id,
      tracker.name,
      tracker.target,
      tracker.color,
      tracker.intervalId,
      tracker.value
    );

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
