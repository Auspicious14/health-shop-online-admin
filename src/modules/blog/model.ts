export interface IBlog {
  _id: string;
  title: string;
  description: string;
  images?: IBlogImage[];
}

export interface IBlogImage {
  _id?: string;
  uri: string;
  type: string;
  name: string;
}
