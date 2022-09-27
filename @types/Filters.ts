export interface Filters {
  model?: string[];
  color?: string[];
  location?: string[];
  dateRange: {
    from: Date;
    to: Date;
  };
}
