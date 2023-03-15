export interface FetchedTask {
  [key: string]: {
    text: string;
  };
}

export default interface TaskModel {
  id: string;
  text: string;
}
