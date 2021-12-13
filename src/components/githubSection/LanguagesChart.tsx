import React from 'react';

import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface Props {
  languages: GithubLanguage[];
}

const CHART_OPTIONS: ChartOptions<'pie'> = {
  plugins: {
    legend: {
      position: 'right',
    },
  },
};

const LanguageChart: React.FC<Props> = function LanguageChart({
  languages,
}) {
  const total = languages.reduce((prev, { count }) => prev + count, 0);
  const percentage = languages.map(({ count }) => ((count * 100) / total).toFixed(1));
  const data = {
    labels: languages.map(({ name }) => name),
    datasets: [
      {
        data: percentage,
        backgroundColor: languages.map(({ color }) => color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="rounded border border-gray-800 divide-y px-2 w-11/12 sm:w-5/12">
      <h4 className="text-sm text-center">Most used languages</h4>
      <Pie
        data={data}
        options={CHART_OPTIONS}
      />
    </div>
  );
};

export default LanguageChart;
