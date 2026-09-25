import './Home.css'
import Time from './Time'
import bg from './assets/OSbg.png'
import WebApps from './webApps'
export default function Home () {
    return <>
    <div className='parentDiv'>
        <img src={bg} alt="background" className='bgImage' />
    <Time/>
    <div style={{width:'40vw',height:'100vh'}}>
        <WebApps/>
    </div>
    </div>
    </>
}
