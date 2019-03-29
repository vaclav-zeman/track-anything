import { action, observable } from 'mobx';
import { TrackInterval } from './TrackerStore';
import api from '../utils/ApiClient';

export default class TrackerModel {
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

    // TODO: Add to queue
    await api.post('/users/' + 5 + '/trackers/' + this.id + '/record', { value: 1 });
  }
}
