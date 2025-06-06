export type ApiResponse = {
  status: number;
  data: any;
};

export type ActionType = {
  type: string;
  payload?: any;
};

export type StateType = {
  loadingList?: boolean;
  loading: boolean;
  error: boolean;
  message: string;
  detail: any;
  info?: any;
  list: any[];
  total?: number;
};

export type TableOptions = {
  username: any;
  page: number;
  limit: number;
  status?: any;
};

export type PostCategory = {
  id: number;
  name: string;
  description: string;
  deleteFlg: number;
  createdTime: string;
  updatedTime: string;
  _count: {
    posts: number;
  };
};

export type OrderItem = {
  tourId: string;
  quantityAdult: number;
  quantityChild: number;
  quantityBaby: number;
  priceSnapshot?: number;
};
