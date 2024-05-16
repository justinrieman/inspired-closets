'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { prevQuantity: 43, prevDate: '5/1/24' },
  { prevQuantity: 65, prevDate: '4/2/24' },
  { prevQuantity: 63, prevDate: '2/27/24' },
  { prevQuantity: 84, prevDate: '2/1/24' },
  { prevQuantity: 43, prevDate: '1/17/24' },
  { prevQuantity: 120, prevDate: '1/2/24' },
  { prevQuantity: 63, prevDate: '12/20/23' },
  { prevQuantity: 84, prevDate: '12/1/23' },
  { prevQuantity: 63, prevDate: '11/20/23' },
  { prevQuantity: 84, prevDate: '10/1/23' },
  { prevQuantity: 63, prevDate: '9/20/23' },
  { prevQuantity: 84, prevDate: '8/1/23' },
];

data.reverse();

const InventoryHistoryChart = () => {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart
        data={data}
        margin={{
          top: 40,
          right: 40,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="prevDate" />
        <Tooltip cursor={{ fill: 'none' }} />
        <YAxis />
        <Bar
          dataKey="prevQuantity"
          fill="#9b2c2c"
          activeBar={<Rectangle fill="#c33737" />}
        ></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InventoryHistoryChart;
