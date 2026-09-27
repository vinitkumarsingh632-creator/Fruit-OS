import { useEffect, useState } from 'react'
import './Home.css'

export default function Time() {
    const [count, setCount] = useState(0)

    const dateObject = new Date()

    const day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => prev + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="clockContainer">
            <p className="date">
                <span style={{color:'yellow'}}>{dateObject.getDate()}{" "}</span>
                {month[dateObject.getMonth()]}{" "}
                {dateObject.getFullYear()}
            </p>

            <p className="day" style={{color:'plum'}}>
                {day[dateObject.getDay()]}
            </p>

            <p className="time">
                {String(dateObject.getHours()).padStart(2, '0')}
                :
                <span style={{color:'red'}}>{String(dateObject.getMinutes()).padStart(2, '0')}</span>
                :
                {String(dateObject.getSeconds()).padStart(2, '0')}
            </p>
        </div>
    )
}