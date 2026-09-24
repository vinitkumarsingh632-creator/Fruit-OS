import F from "./assets/F.png";
import R from "./assets/R.png";
import U from "./assets/U.png";
import I from "./assets/I.png";
import T from "./assets/T.png";
import bg from './assets/Bg.png'
import watermelon from './assets/Watermelon.png';
import './App.css'
import {Link} from 'react-router-dom'
export default function App () {
  return (
    <>
    <div style={styles.flex}>
    <div>
      <img src={F} alt="F character" height={200} className="F_char"/>
    </div>
    <div>
      <img src={R} alt="R character" height={130}/>
    </div>
    <div>
      <img src={U} alt="U character" width={200} className="U_char"/>
    </div>
    <div>
      <img src={I} alt="I character" height={240}/>
    </div>
    <div>
      <img src={T} alt="T character" height={120}/>
    </div> 
    <h2 style={{fontSize:'9rem',color:'green'}}>OS</h2>
    </div>
    <div style={{display:'flex',justifyContent:'center'}}>

      <div style={{backgroundImage:`url(${bg})`, backgroundSize:'cover',backgroundRepeat:'no-repeat', width:'60%',borderRadius:'20px'}}>
        <div className="bgCover">
      
      <div style={{display:"flex",justifyContent:'center',alignItems:'center',gap:'20px'}}>
        <img src={watermelon} height={100} style={{rotate:'180deg'}}/>
        <h2 style={{color:'white',fontSize:'3.5rem'}}>We<span className="lc">lc</span>o<span className="m">m</span>e</h2>

        <img src={watermelon} height={100} className="bg" />
        <div className="bgDiv">
          <h3 className="bgText">
          A fresh take on the desktop experience.<span style={{color:'white'}}> Built from the ground up as an experimental project</span>, Fruit OS combines a playful fruit-inspired interface with modern <span style={{color:'yellow'}}>web technologies to explore how an operating system environment can be designed and built.</span>
          <div style={{textAlign:'center',paddingTop:'2rem',paddingBottom:'1rem'}} className="HomePage">
            <Link to={'/home'} style={{textDecoration:"none",backgroundColor:'green',color:'white',borderRadius:'20px',padding:'0.5rem'}}>Enter the OS</Link>
          </div>
        </h3>
        </div>
      </div>
      </div>
    </div>
    
    </div>
    </>
  )
}
const styles = {
  flex:{
    display:"flex",
    height:'40vh',
    justifyContent:'center',
    alignItems:'center',
  }
}