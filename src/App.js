import React,{memo} from 'react'
import appRouting from './routes/appRouting'
import TopNav from './Containers/TopNav/TopNav';

const App = ()=>{
  return(
    <div>
      <TopNav/>
      {appRouting}
    </div>
  )
}

export default memo(App)