import './Home.css'
import Time from './Time'
import bg from './assets/OSbg.png'
export default function Home () {
    return <>
    <div className='parentDiv'>
        <img src={bg} alt="background" className='bgImage' />
    <Time/>
    </div>
    </>
}
