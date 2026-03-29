export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
