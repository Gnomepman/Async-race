export type carBody = {
  name: string;
  color: string;
};

export type winnerType = {
  id: number;
  wins: number;
  time: number;
};

export type sort = "id" | "wins" | "time";
export type order = "ASC" | "DESC";

export type car = {
    name: string;
    color: string;
    id: number;
};