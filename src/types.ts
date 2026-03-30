export interface Spark {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

export interface SparkStore {
  sparks: Spark[];
  addSpark: (spark: Spark) => void;
  removeSpark: (id: string) => void;
}
