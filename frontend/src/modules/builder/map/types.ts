export type Tag = { name: string };

export type Point = [number, number] | [];

export type MarkerParent = 'MyItems' | 'Published';

export interface MarkerProps {
  lat: number;
  lng: number;
  title: string;
  description: string;
  parent: MarkerParent;
  tags: Tag[];
}

export type Country = {
  name: string;
  maxBoundary: [number, number];
  minBoundary: [number, number];
  alpha2: string;
};

export type ParentCheck = {
  Published: boolean;
  MyItems: boolean;
};
