type WorkDay = {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
};

type FriendsItemType = {
  _id: string;
  address: string;
  addressUrl: string;
  email: string;
  imageUrl: string;
  phone: string;
  title: string;
  url: string;
  workDays: WorkDay[];
};

export default FriendsItemType;
