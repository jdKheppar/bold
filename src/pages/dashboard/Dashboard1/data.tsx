import avatar1 from "../../../assets/images/users/user-2.jpg";
import avatar2 from "../../../assets/images/users/user-3.jpg";
import avatar3 from "../../../assets/images/users/user-4.jpg";
import avatar4 from "../../../assets/images/users/user-5.jpg";
import avatar5 from "../../../assets/images/users/user-6.jpg";

const balances = [
  {
    id: 1,
    avatar: avatar1,
    name: "StellarGrip",
    currency: "BTC",
    balance: 147,
    orders: 436,
  },
  {
    id: 2,
    avatar: avatar2,
    name: "LuxeBloom",
    currency: "ETH",
    balance: 7008,
    orders: 7079,
  },
  {
    id: 3,
    avatar: avatar3,
    name: "VelocityPro",
    currency: "EUR",
    balance: 25.08,
    orders: 12.58,
  },
  {
    id: 4,
    avatar: avatar4,
    name: "ZenithTech",
    currency: "CNY",
    balance: 82.0,
    orders: 30.83,
  },
  {
    id: 5,
    avatar: avatar5,
    name: "Luke J. Sain",
    currency: "BTC",
    balance: 27,
    orders: 1.0,
  },
];

const revenueHistory = [
  {
    id: 1,
    marketplaces: "StellarGrip",
    date: "Oct 15, 2018",
    payouts: "$5848.68",
    status: "Upcoming",
  },
  {
    id: 2,
    marketplaces: "LuxeBloom",
    date: "Oct 12, 2018",
    payouts: "$1247.25",
    status: "Paid",
  },
  {
    id: 3,
    marketplaces: "AquaSoothe",
    date: "Oct 10, 2018",
    payouts: "$815.89",
    status: "Paid",
  },
  {
    id: 4,
    marketplaces: "VelocityPro",
    date: "Oct 03, 2018",
    payouts: "$248.75",
    status: "Overdue",
  },
  {
    id: 5,
    marketplaces: "ZenithTech",
    date: "Sep 21, 2018",
    payouts: "$978.21",
    status: "Upcoming",
  },
  {
    id: 6,
    marketplaces: "Smartwatch",
    date: "Sep 15, 2018",
    payouts: "$358.10",
    status: "Paid",
  },
];

export { balances, revenueHistory };
