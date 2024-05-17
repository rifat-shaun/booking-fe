export interface IParentLocation {
  name: string;
  child_locations?: ILocation[];
}
export interface ILocation {
  start_point_id?: string;
  end_point_id?: string;
  name: string;
}
