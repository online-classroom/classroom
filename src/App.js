import React,{memo, Suspense} from 'react'
import appRouting from './routes/appRouting'
import './App.scss'
import Loader from './Loader'
const TopNav = React.lazy(() => import('./Containers/TopNav/TopNav'))
const Footer = React.lazy(() => import('./Containers/Footer/Footer'))

const App = ()=>{
  return(
    <div className='App'>
      <Suspense fallback={<Loader size={120}/>}>
        <TopNav/>
        <div style={{height: '60px'}}/>
        {appRouting}
        <Footer/>
      </Suspense>
    </div>
  )
}

export default memo(App)