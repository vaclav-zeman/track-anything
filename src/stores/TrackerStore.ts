import { observable, action, flow, autorun, toJS } from 'mobx';
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

  @action.bound
  increment() {
    this.value += 1;
  }
}

class TrackerStore {
  @observable trackers: Array<TrackerModel> = [];
  @observable isLoading: boolean = false;

  // constructor() {
  //   const cached = localStorage.getItem('trackers');

  //   if (cached) {
  //     this.trackers = JSON.parse(cached).map(this.createNewModel);
  //   }
  // }

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
    this.isLoading = true;
    const userId = 5;
    const { data } = await api.get('/users/' + userId + '/trackers');
    
    this.trackers = data.map(this.createNewModel);
    this.isLoading = false;
  }

  @action.bound
  async addTracker(values: IFormValues) {
    const userId = 5;
    const { data } = await api.post('/users/' + userId + '/trackers', {
      
    });
    console.log(data);
  }
}

const store = new TrackerStore();

export default store;
