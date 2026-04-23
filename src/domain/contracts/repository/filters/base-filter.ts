export interface DateRange {
  from?: Date
  to?: Date
}

export interface BaseFilter {
  createdAt?: DateRange
  updatedAt?: DateRange
}