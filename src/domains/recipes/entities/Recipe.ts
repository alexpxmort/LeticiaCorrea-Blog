export interface Recipe {
  id?: string;
  image?:
    | {
        name: string;
        buffer: any;
        type: string;
      }
    | any;
  name: string;
  linkName: string;
  description: string;
  sections?: any[];
}
