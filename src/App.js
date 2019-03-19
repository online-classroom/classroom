import React,{memo} from 'react'
import appRouting from './routes/appRouting'
import TopNav from './Containers/TopNav/TopNav'
import Footer from './Containers/Footer/Footer'

const App = ()=>{
  return(
    <div>
      <TopNav/>
      {appRouting}
      <Footer/>
    </div>
  )
}

export default memo(App)