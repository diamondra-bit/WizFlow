import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Acceuil/Navbar'
import NavbarHorizontal from '../../components/Acceuil/NavbarHorizontal'
import axios from 'axios'
import CircleProgressBar from './CircleProgressBar'

import { Bar } from 'react-chartjs-2';


function Chart() {
  const userId =localStorage.getItem('userId');

  /*Obtenir la date de cette semaine*/
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const difference = currentDay - 1; // Suppose que la semaine commence un lundi (lundi = 1, dimanche = 0)
    
    currentDate.setDate(currentDate.getDate() - difference);
    setCurrentWeekStartDate(currentDate.toISOString().split('T')[0]);
  }, []);

  /*Percentage*/
  const [progress, setProgress] = useState(0);
   useEffect(() => {
    // Simulate progress update
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

/*DEfaultData*/
  const defaultData = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
 
  /*CHart1*/
   const [chartData, setChartData]=useState(defaultData)
   useEffect(() => {
   const fetchData = async () => {
    try {
    
      const response = await axios.get(`http://localhost:3003/chartEnt/${userId}`, {
        params: {
          currentWeekStartDate:currentWeekStartDate
        }
      });

      const data = response.data;
      console.log(data)
      const dates = data.map(entry => entry.date_ent);
      const counts = data.map(entry => entry.somme)

      setChartData({
        labels: dates,
          datasets: [
            {
              label: '',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
      })

      } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };
    fetchData();
  }, [currentWeekStartDate]);

 /*CHart2*/
  const [chartData2, setChartData2]=useState(defaultData)
  useEffect(() => {
  const fetchData = async () => {
   try {

    const response = await axios.get(`http://localhost:3003/chartSort/${userId}`, {
      params: {
        currentWeekStartDate:currentWeekStartDate
      }
    });const data = response.data;

     const dates = data.map(entry => entry.date_sort);
     const counts = data.map(entry => entry.somme)

     setChartData2({
       labels: dates,
         datasets: [
           {
             label: '',
             data: counts,
             backgroundColor: 'rgba(75, 192, 192, 0.2)',
             borderColor: 'rgba(75, 192, 192, 1)',
             borderWidth: 1,
           },
         ],
     })

     } catch (error) {
     console.error('Erreur lors de la récupération des données :', error);
   }
 };
   fetchData();

 }, [currentWeekStartDate]);

 /*total PercentageParIdEnt*/
 const [totalperc2,setTotalperc2]=useState(0);
 useEffect(() => {
  const fetchData = async () => {
    await axios.get(`http://localhost:3003/PercEnt/${userId}`)
   .then((response)=>{
    setTotalperc2(response.data[0].total);
   })
   console.log(totalperc2)  
 };
   fetchData();
 }, []);

  /*total Percentage*/
  const [totalperc,setTotalperc]=useState(0);
  useEffect(() => {
   const fetchData = async () => {
     await axios.get(`http://localhost:3003/PercEntTotal`)
    .then((response)=>{
     setTotalperc(response.data[0].total);
    })
    console.log(totalperc)  
  };
    fetchData();
  }, []);
 
  /*Calcul*/
  const percentage = totalperc !== 0 ? Math.round((100 * totalperc2) / totalperc) : 0;


 /*total PercentageParIdSort*/
 const [totalpercSortId,setTotalpercSortId]=useState(0);
 useEffect(() => {
  const fetchData = async () => {
    await axios.get(`http://localhost:3003/PercSort/${userId}`)
   .then((response)=>{
    setTotalpercSortId(response.data[0].total);
   })
 };
   fetchData();
 }, []);

  /*total PercentageSort*/
  const [totalpercSort,setTotalpercSort]=useState(0);
  useEffect(() => {
   const fetchData = async () => {
     await axios.get(`http://localhost:3003/PercSortTotal`)
    .then((response)=>{
     setTotalpercSort(response.data[0].total);
    })
  };
    fetchData();
  }, []);
 
  /*CalculSort*/
  const percentageSort = totalpercSort !== 0 ? Math.round((100 * totalpercSortId) / totalpercSort) : 0;


  return (
    <>
    <div className='container-home'>
      <div className='navbar'>
      <Navbar/>
      </div>

      <div>
            <NavbarHorizontal show={true} />
      <div> 
         
         </div>

            <h1 className='title-card3'></h1>
            <div className='ligne'></div> <br/> <br/> <br/> <br/>


        <div className='main-chart'>
                    
        <h2 className='history-title-entry'>Entrées effectuées récemment</h2>
        <div className='card-flex'>
            <div className='card-chart'>
             
              <Bar data={chartData}/>
            </div>
            <div className='pourcentage'>
                <CircleProgressBar percentage={percentage} />
                <p className='circleBarText'>Matériels entrées</p>
            </div>
        </div>
          
            <h2 className='history-title-entry'>Sorties effectuées récemment</h2>
            <div className='card-flex'>
            <div className='card-chart'>
            <Bar data={chartData2}/>
            </div>
            <div className='pourcentage'>
                 <CircleProgressBar percentage={percentageSort} />
                <p className='circleBarText'>Matériels sorties</p>
            </div>
        </div>

        </div>

      </div>
      
    </div>
          
    </>
  )
}

export default Chart