import { PieChart, Pie, Tooltip } from 'recharts';

const Chart = ({ data = {} }) => {
  let arr = [];
  Object.keys(data).forEach((k) => {
    arr.push({ name: k, value: data[k] });
  });

  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey='value'
        isAnimationActive={false}
        data={arr}
        cx={200}
        cy={200}
        outerRadius={80}
        fill='#8884d8'
        label
      />
      <Tooltip />
    </PieChart>
  );
};

export default Chart;
