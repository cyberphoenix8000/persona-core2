
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

interface PersonalityChartProps {
  scores: {
    Extraversion: number;
    Sensing: number;
    Thinking: number;
    Judging: number;
  };
}

const PersonalityChart: React.FC<PersonalityChartProps> = ({ scores }) => {
  const data = [
    { name: 'Mind', value: scores.Extraversion, color: '#6366f1' },
    { name: 'Energy', value: scores.Sensing, color: '#10b981' },
    { name: 'Nature', value: scores.Thinking, color: '#f59e0b' },
    { name: 'Tactics', value: scores.Judging, color: '#8b5cf6' },
  ];

  return (
    <div className="w-full h-80 mt-6 -ml-4 pr-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#f1f5f9" />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            width={60}
            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800, textAnchor: 'end' }}
          />
          <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PersonalityChart;
