import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	BarElement,
	LinearScale,
	Tooltip,
	CategoryScale,
	}	from 'chart.js';

ChartJS.register(BarElement, LinearScale, Tooltip, CategoryScale);

// Utility function to get current week's dates
const getCurrentWeekDates = () => {
	const currentDate = new Date();
	const startOfWeek = new Date(
		currentDate.setDate(currentDate.getDate() - currentDate.getDay()) // Sunday
	);
	const dates = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(startOfWeek);
		date.setDate(startOfWeek.getDate() + i);
		dates.push(date.toISOString().split('T')[0]); // Format: YYYY-MM-DD
	}
	return dates;
};

function ScreenTimeChecker() {
	const [screenTime, setScreenTime] = useState([]);
	const [labels, setLabels] = useState([]);
	const [currentDate, setCurrentDate] = useState('');
	const [todayScreenTime, setTodayScreenTime] = useState(0);

	useEffect(() => {
		const currentWeekDates = getCurrentWeekDates();
		const currentDay = new Date().toISOString().split('T')[0];

		setCurrentDate(currentDay);

		// Initialize or reset localStorage for a new week
		const storedWeek = JSON.parse(localStorage.getItem('currentWeekData')) || {
		weekDates: [],
		screenTime: {},
		};

		if (
			!storedWeek.weekDates.length || // If no stored week
			storedWeek.weekDates[0] !== currentWeekDates[0] // If week has changed
		) {
		const newWeekData = {
			weekDates: currentWeekDates,
			screenTime: currentWeekDates.reduce((acc, date) => {
			acc[date] = 0;
			return acc;
			}, {}),
		};
		localStorage.setItem('currentWeekData', JSON.stringify(newWeekData));
		}

		const updatedWeek = JSON.parse(localStorage.getItem('currentWeekData'));
		setLabels(updatedWeek.weekDates);
		setScreenTime( updatedWeek.weekDates.map((date) => updatedWeek.screenTime[date] || 0));
		setTodayScreenTime(updatedWeek.screenTime[currentDay] || 0);
	}, []);

	useEffect(() => {
		const startTime = Date.now();

		const handleUnload = () => {
		const endTime = Date.now();
		const timeSpent = Math.round((endTime - startTime) / 1000);
		
		const storedWeek = JSON.parse(localStorage.getItem('currentWeekData')) || {
			weekDates: [],
			screenTime: {},
		};
		
		const today = new Date().toISOString().split('T')[0];
		if (storedWeek.weekDates.includes(today)) {
			storedWeek.screenTime[today] =
			(storedWeek.screenTime[today] || 0) + timeSpent;
		}
		
		// Reset screentime at 12:00 AM on Sunday
		const currentDay = new Date().getDay();
		if (currentDay === 0 && new Date().getHours() === 0) {
			storedWeek.weekDates.forEach((date) => {
			storedWeek.screenTime[date] = 0;
			});
		}
		
		localStorage.setItem('currentWeekData', JSON.stringify(storedWeek));
		};
		

		window.addEventListener('beforeunload', handleUnload);

		return () => {
		window.removeEventListener('beforeunload', handleUnload);
		handleUnload();
		};
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
		const storedWeek = JSON.parse(localStorage.getItem('currentWeekData')) || {
			weekDates: [],
			screenTime: {},
		};
	
		const today = new Date().toISOString().split('T')[0];
		setLabels(storedWeek.weekDates);
		setScreenTime(
			storedWeek.weekDates.map((date) => storedWeek.screenTime[date] || 0)
		);
		setTodayScreenTime(storedWeek.screenTime[today] || 0);
		}, 5000); // Update every 5 seconds
	
		return () => clearInterval(interval); // Cleanup on unmount
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
		const now = new Date();
		const currentDay = now.getDay();
		const currentHour = now.getHours();
	
		if (currentDay === 0 && currentHour === 0) {
			const storedWeek = JSON.parse(localStorage.getItem('currentWeekData')) || {
			weekDates: [],
			screenTime: {},
			};
	
			storedWeek.weekDates.forEach((date) => {
			storedWeek.screenTime[date] = 0;
			});
	
			localStorage.setItem('currentWeekData', JSON.stringify(storedWeek));
		}
		}, 1000 * 60); // Check every minute
	
		return () => clearInterval(interval); // Cleanup on unmount
	}, []);
  
  

	const data = {
		labels: labels,
		datasets: [
			{
				data: screenTime,
				backgroundColor: labels.map((date) =>
				date === currentDate ? '#60a5fa' : '#232323'
				),
				borderRadius: 5,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false, // Hide the legend
			},
			tooltip: {
				callbacks: {
					title: (context) => `Date: ${context[0].label}`,
					label: (context) => {
						const timeInSeconds = context.raw;
						if (timeInSeconds < 60) {
						return `Screen Time: ${timeInSeconds} seconds`;
						} else if (timeInSeconds < 3600) {
						const minutes = Math.floor(timeInSeconds / 60);
						return `Screen Time: ${minutes} minutes`;
						} else {
						const hours = (timeInSeconds / 3600).toFixed(1);
						return `Screen Time: ${hours} hours`;
						}
					},
				},
				backgroundColor: '#1e293b',
				titleFont: {
					family: 'Kanit',
					size: 14,
				},
				bodyFont: {
					family: 'Kanit',
					size: 12,
				},
				displayColors: false,
			},
		},
		scales: {
			x: {
				grid: { display: false },
				ticks: { display: false }, // Hide X-axis labels
			},
			y: {
				grid: { display: false },
				ticks: { display: false }, // Hide Y-axis labels
			},
		},
		maintainAspectRatio: false,
	};

	return (
		<div
			className="h-full w-full bg-white rounded-3xl p-4"
			style={{
				boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
			}}
		>
			<Bar data={data} options={options} />
		</div>
	);
}

export default ScreenTimeChecker;
