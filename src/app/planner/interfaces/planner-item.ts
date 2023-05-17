import { PlannerItemStatus } from '../enums/planner-item-status';

export interface PlannerItem {
  id?: string;
  type: string;
  title: string;
  date: any;
  status: PlannerItemStatus;
  author: string;
  location: string;
  contactPerson: string;
  category: string;
  active: Boolean;
  createdDate: any;
  feedId: string;
}
