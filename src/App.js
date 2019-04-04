import React,{memo} from 'react'
import appRouting from './routes/appRouting'
import TopNav from './Containers/TopNav/TopNav'
import Footer from './Containers/Footer/Footer'
import './App.scss'

const App = ()=>{
  return(
    <div className='App'>
      <TopNav/>
      <div style={{height: '60px'}}/>
      {appRouting}
      <Footer/>
    </div>
  )
}

export default memo(App)