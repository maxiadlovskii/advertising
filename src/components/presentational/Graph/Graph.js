import React from 'react'
import styles from './Graph.module.css'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {dataModel} from '../../../constatnts/models'

export const Graph = ({ graphData }) => <aside className={styles['Graph']}>
    <h4>{'Graph'}</h4>
    <div className={styles['container']}>
        <AreaChart data={graphData} width={1000} height={700}>
            <Area
                  yAxisId="left"
                  dataKey={dataModel.CLICKS}
                  stroke="#8884d8"
                  fill="#8884d8"
            />
            <Area
                yAxisId="right"
                dataKey={dataModel.IMPRESSIONS}
                stroke="#000000"
                fill="#000000"
            />
            <XAxis dataKey={dataModel.DATE} />
            <YAxis
                yAxisId="left"
                dataKey={dataModel.CLICKS}
            />
            <YAxis
                yAxisId="right"
                dataKey={dataModel.IMPRESSIONS}
                orientation="right"
            />
        </AreaChart>
    </div>
</aside>