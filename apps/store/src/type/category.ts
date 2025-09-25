export type CategoryNode = {
  id: string;
  name: string;
  slug: string | null;
  children: CategoryNode[];
};
