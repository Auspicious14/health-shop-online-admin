export interface ICategory {
  _id: string;
  name: string;
  images: ICategoryImage[];
}

export interface ICategoryImage {
  uri: string;
  name: string;
  type: string;
}
