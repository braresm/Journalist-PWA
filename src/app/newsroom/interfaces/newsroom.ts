import { NewsroomCategory } from '../enums/newsroom-category';

export interface Newsroom {
  id?: string;
  title: string;
  message: string;
  category: NewsroomCategory;
  files: string[]; // list of archive ids
  createdDate: any;
}
