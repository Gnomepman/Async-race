export type carBody = {
  name: string;
  color: string;
};

export type winnerType = {
  id: number;
  wins: number;
  time: number;
};

export type sort = "id" | "winners" | "time";
export type order = "ASC" | "DESC";
