import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend, ChartOptions,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

interface LineChartProps {
    coinHistory: any
    currentPrice: string
    coinName: string
}

const LineChart: React.FC<LineChartProps> = ({ coinHistory, currentPrice, coinName }) => {

    const coinPrice: any[] = []
    const coinTimestamp: string[] = []

    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory?.data?.history[i]?.price)
        coinTimestamp.push(new Date(coinHistory?.data?.history[i]?.timestamp * 1000).toLocaleDateString())
    }

    const data = {
        labels: coinTimestamp.reverse(),
        datasets: [
            {
                labels: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#333',
                borderColor: '#333'
            }
        ]
    }

    const options: ChartOptions<any> = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Crypto Value",
            },
        },
        stacked: false,
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    return (
        <div className='line-chart'>

            <div className='chart-header'>
                <h3>{coinName} USD Price Chart</h3>

                <div className='chart-price'>
                    <span>Change: {coinHistory?.data?.change} %</span>
                    <span>Current {coinName} Price: $ {currentPrice}</span>
                </div>
            </div>

            <Line data={data} options={options} />

        </div>
    )
}

export default LineChart