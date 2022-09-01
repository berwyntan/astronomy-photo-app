import { useState, useEffect } from 'react'

import Card from './components/Card'
import LoadingSpinner from './components/LoadingSpinner'

import data from './data/sampleData'
import daysPerMonth from './data/daysPerMonth'

import './App.css'

import lozad from 'lozad'
import axios from 'axios'

const today = new Date();

function App() {
  const [itemData, setItemData] = useState([])   
  const [isLoading, setIsLoading] = useState(false)
  const [dateForApi, setDateForApi] = useState({ 
    
    startDateString: "",
    
    endDateString: "",
    
  })

  const callApiForToday = (date) => {
    
    // let date = new Date();
    // var d = new Date();
    // d.setDate(d.getDate()-5);
    /*
    if (date !== today) {
      
    }
    */
    console.log(date.getMonth(), date.getDate())
    
    
    // date.setDate(date.getDate()-(0+10*dateForApi.numOfCalls))
    const endDateString = date.toISOString().slice(0, 10);
    console.log("end date: ", endDateString);
    
    // sets date to the last day of previous month
    date.setDate(0)
    const startDateString = date.toISOString().slice(0, 10);
    console.log("start date: ", startDateString);

    console.log(date.getMonth(), date.getDate())

    setDateForApi(prevData => {
      return ({
        ...prevData,
        startDateString: startDateString,
        endDateString: endDateString,
        
      })
    })

    // set the next end date for API to call
    // check Feb
    if (date.getMonth() === 1) {
      // check leap years
      const isLeap = new Date(date.getFullYear(), 1, 29).getMonth() == 1;
      console.log(isLeap)
      if (isLeap) {
        date.setDate(28)
      } else {
        date.setDate(27)
      }
    } 
    // check other months with data in daysPerMonth.js
    for (const month of daysPerMonth) {
      if (month.index === date.getMonth()) {
        date.setDate(month.days - 1)
      }
    }
  }
  
  

  const callApiRandom = () => {
    setIsLoading(true)
    axios.get("https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&count=10")
    .then(function (response) {
      // handle success
      console.log(response.data);
      setItemData(prevData => (
        [
          ...prevData,
          ...response.data
        ]
      ))
      setIsLoading(false)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }


  useEffect(() => {callApiRandom()}, [])
  

  // useEffect(() => setImgData(data), [])
  
  const cards = itemData.map(item => {
    if (item?.media_type === "image") {
      return (
        <Card
        title={item?.title}
        url={item?.url}
        explanation={item?.explanation}
        date={item?.date}
        />
      )
    }
  })

  // lazy load images
  useEffect(() => {
    const observer = lozad('.lozad', {
      rootMargin: '600px 0px', // syntax similar to that of CSS Margin
      threshold: 0.1, // ratio of element convergence
      enableAutoReload: true // it will reload the new image when validating attributes changes
    });
    observer.observe();
  })

  // scroll to bottom event listener
  useEffect(() => {
    const handleScroll = event => {
      // console.log('Math.ceil(document.documentElement.scrollTop)', Math.ceil(document.documentElement.scrollTop));
      // console.log('window.innerHeight', window.innerHeight);      
      // console.log('document.documentElement.offsetHeight', document.documentElement.offsetHeight);
      if (Math.floor(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {
        console.log("infinite scroll v1")     
           
        callApiRandom();
        console.log(itemData);
        return
      } else if (Math.ceil(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {
        console.log("infinite scroll v2")     
           
        callApiRandom();
        console.log(itemData);
        return
      } else if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
        console.log("infinite scroll v1")
        
        callApiRandom();
        console.log(itemData);
        return
      }}

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  console.log(dateForApi)

  return (
    <div className="App bg-neutral-900 text-slate-50">
        <h1 className="font-sans text-xl">Astronomy</h1>
        
        
        <input placeholder='search' />
        <input type='submit' />
        
        <button style={{marginLeft: "20px"}}>View Likes</button> 

        <button onClick={()=>callApiForToday(today)}>Check API</button>      

        {cards}
        {isLoading && <LoadingSpinner />}
        
         
        
    </div>
  )
}

export default App
