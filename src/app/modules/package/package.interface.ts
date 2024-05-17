export enum Business_HourDay {
  saturday = 'saturday',
  sunday = 'sunday',
  Monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
}

export interface ISubPackage {
  name: string;
}

export interface IPackage {
  name: string;
  price: number;
  active: boolean;
  description: string;
  start_date: string;
  end_date: string;
  active_days: Business_HourDay[];
  limit: number;
  child_packages?: ISubPackage[];
}
