import React,{Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './../Pages/Home/Home';
import Dashboard from './../Pages/Dashboard/Dashboard';
import Classroom from './../Pages/Classroom/Classroom';
import AddCourseModal from './../Containers/AddCourseModal/AddCourseModal';
import AddLectureModal from '../Containers/AddCourseModal/AddLectureModal';
import Loader from '../Loader';
const BrowseClasses = React.lazy(() => import('../Pages/BrowseClasses/BrowseClasses'));


export default (
  <Switch>
      <Route path='/browseclasses/:subject' component={()=><div><Suspense fallback={<Loader size={150}/>}><BrowseClasses/></Suspense></div>}/>
      <Route path='/browseclasses' component={BrowseClasses}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/classroom/:course_id' component={Classroom}/>
      <Route path='/addCourse' component={AddCourseModal}/>
      <Route path='/addLecture' component={AddLectureModal} />
      <Route path='/' component={Home}/>
  </Switch>
);
