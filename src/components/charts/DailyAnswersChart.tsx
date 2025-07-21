import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from 'recharts'
import type { DailyAnswerData } from '@/types/chart'
import React, { useEffect, useState } from 'react'
import { useAnswerSubmission } from '@/hooks/useAnswerStats';

import { useAuthContext } from '@/contexts/AuthContext';
import type { User } from '@/types/auth'

import * as styles from '@/styles/components/DailyAnswersChart.module.scss'

export const DailyAnswersChart: React.FC = () => {
  const { user, loading: authLoading } = useAuthContext();

  const { fetchDailyAnswers } = useAnswerSubmission();
  const [dailyAnswers, setDailyAnswers] = useState<DailyAnswerData[]>([]);

  useEffect(() => {
    if (authLoading) {
      return;
    }
    if (!user) {
      return;
    }
    if (dailyAnswers.length > 0) {
      return;
    }

    const load = async () => {
      const data = await fetchDailyAnswers(user as User);
      setDailyAnswers(data);
    };
    load()
  }, [user, authLoading]);

  return (
    <div className={styles.dailyAnswersChart}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={dailyAnswers}
          margin={{
            top: 30,
            right: 10,
            left: 0,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const d = new Date(date);
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }}
            tick={{ fontSize: 14 }} // ←ここで指定
          />
          <YAxis width={40} tick={{ fontSize: 14 }} />
          <Tooltip
            formatter={(value, name) => {
              if (name === '回答数') return [value, '回答数'];
              if (name === '累積回答数') return [value, '累積回答数'];
              return [value, name];
            }} labelFormatter={(label) => `日付: ${label}`}
            wrapperStyle={{ fontSize: 14 }}
          />
          <Legend wrapperStyle={{ fontSize: 14 }} />
          <Bar
            dataKey="answerCount"
            fill="#3b82f6"
            name="回答数"
            radius={[4, 4, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="cumulativeAnswerCount"
            stroke="#f59e42"
            name="累積回答数"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div >
  )
};

export default DailyAnswersChart;