import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Analytics = () => {
    const [data2, setData2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://erp.seopage1.net/api/leads");
                setData2(res.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const processData = () => {
        const bars = [];
        let deadDataCount = 0;

      
        for (let i = 0; i < data2.length; i++) {
            const isDeal = data2[i].deal_status === 1; 
            
            if (i % 25 === 0 && i !== 0) {
             
                bars.push({
                    totalData: 25, 
                    deadData: deadDataCount, 
                });
                deadDataCount = 0; 
            }

           
            if (isDeal) {
                deadDataCount++;
            }
        }

       
        if (deadDataCount > 0 || bars.length === 0) {
            bars.push({
                totalData: 25, 
                deadData: deadDataCount,
            });
        }

        return bars;
    };

    const barsData = processData();

    const chartData = {
        labels: barsData.map((_, index) => `Group ${index + 1}`),
        datasets: [
            {
                label: 'Converted Deal',
                data: barsData.map(bar => bar.deadData),
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 1,
                stack: 'stack1', 
            },
            {
                label: 'Total Deal',
                data: barsData.map(bar => bar.totalData),
                backgroundColor: 'lightblue',
                borderColor: 'lightblue',
                borderWidth: 1,
                stack: 'stack1', 
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
                stacked: true, 
                max: 25, 
            }
        }
    };

    return (
        <div className="mx-5 md:mx-8">
            <div>
                <Link to='/'>
                    <button className="p-2 bg-slate-800 text-white rounded-md mt-2 flex items-center mb-2">
                        <h1>Return</h1>
                        <IoIosArrowRoundBack className="text-[25px]" />
                    </button>
                </Link>
            </div>

            <div>
                <Bar data={chartData} options={chartOptions} />
            </div>

            <div className="py-2 mx-5">
                <h1 className="text-[20px] font-semibold my-5 text-center bg-slate-300">Each bar comprises of 25 leads</h1>
            </div>
        </div>
    );
}

export default Analytics;
