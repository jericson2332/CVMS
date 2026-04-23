import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login.jsx'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard.jsx'
import Home from './Components/Home.jsx';
import Subscriber from './Components/Subscriber.jsx';
import Category from './Components/Category.jsx';
import Profile from './Components/Profile.jsx';
import AddCategory from './Components/AddCategory.jsx';
import AddSubscriber from './Components/AddSubscriber.jsx';
import EditSubscriber from './Components/EditSubscriber.jsx';
import SubNavbar from './Components/SubNavbar.jsx';
import HomePage from './Components/Userpages/HomePage.jsx';
import ApplyNow from './Components/Userpages/ApplyNow.jsx';
import Plans from './Components/Userpages/Plans.jsx';
import Coporate from './Components/Userpages/Coporate.jsx';
import Promos from './Components/Userpages/Promos.jsx';
import Internet from './Components/Userpages/Internet.jsx';
import Cable from './Components/Userpages/Cable.jsx';
import Faq from './Components/Userpages/Faq.jsx';

import Requirements from './Components/Userpages/Requirements.jsx';
import Channellineup from './Components/Userpages/Channellineup.jsx';
import Plan888 from './Components/Userpages/Plan888.jsx';
import Plan1 from './Components/Userpages/Plan1.jsx';
import Plan2 from './Components/Userpages/Plan2.jsx';
import Plan3 from './Components/Userpages/Plan3.jsx';
import Digitalcableonly from './Components/Userpages/Digitalcableonly.jsx';
import Support from './Components/Userpages/Support.jsx';
import Aboutus from './Components/Userpages/Aboutus.jsx';
import NewApplication from './Components/NewApplication.jsx';
import Footer from './Components/Footer.jsx';
import ApplicationDetail from './Components/ApplicationDetail.jsx';
import PlanCalculator from './Components/PlanCalculator.jsx';
import Settings from './Components/Settings.jsx';
import Summary from './Components/Summary.jsx';
import SubscriberDetail from './Components/SubscriberDetail.jsx';
import Addendum from './Components/Addendum.jsx';
import Plan550 from './Components/Userpages/Plan550.jsx';
import Gcashguide from './Components/Userpages/Gcashguide.jsx';


function App() {
  return (
    <div>
      <Routes>
        {/* subs page */}
        <Route path='/' element={
          <>
            <SubNavbar />
            <Footer />
          </>

        }>
          <Route index element={<HomePage />}></Route>
          <Route path='/homepage' element={<HomePage />}></Route>
          <Route path='/plans' element={<Plans />}></Route>
          <Route path='/internet' element={<Internet />}></Route>
          {/* <Route path='/cable' element={<Cable />}></Route> */}
          <Route path='/applynow' element={<ApplyNow />}></Route>
          <Route path='/channellineup' element={<Channellineup />}></Route>
          <Route path='/promos' element={<Promos />}></Route>
          <Route path='/corporate' element={<Coporate />}></Route>
          <Route path='/faq' element={<Faq />}></Route>
          <Route path='/support' element={<Support />}></Route>
          <Route path='/aboutus' element={<Aboutus />}></Route>
          <Route path='/requirements' element={<Requirements />}></Route>

          {/** Plan's Pages */}
          <Route path='/plan550' element={<Plan550/>}></Route>
          <Route path='/plan888' element={<Plan888 />}></Route>
          <Route path='/plan1' element={<Plan1 />}></Route>
          <Route path='/plan2' element={<Plan2 />}></Route>
          <Route path='/plan3' element={<Plan3 />}></Route>

          {/* Gcash Guide */}
          <Route path='gcashguide' element={<Gcashguide />}></Route>

          {/** Cable Only Page */}
          {/* <Route path='/digitalcableonly' element={<Digitalcableonly />}></Route> */}

          {/** Login Page */}
          <Route path='/login' element={<Login />}></Route>

        </Route>


        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/subscriber' element={<Subscriber />}></Route>
          <Route path="/dashboard/view_subscriber/:id" element={<SubscriberDetail/>} />
          <Route path='/dashboard/newapplication' element={<NewApplication />}></Route>
          <Route path="/dashboard/application/:id" element={<ApplicationDetail />} />
          <Route path='/dashboard/category' element={<Category />}/>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          {/* <Route path='/dashboard/summary' element={<Summary />}></Route> */}
          <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
          <Route path='/dashboard/add_subscriber' element={<AddSubscriber />}></Route>
          <Route path='/dashboard/edit_subscriber/:id' element={<EditSubscriber />}></Route>
          <Route path='/dashboard/addendum' element={<Addendum/>}></Route>
          <Route path='/dashboard/plancalculator' element={<PlanCalculator />}></Route>
          <Route path='/dashboard/settings' element={<Settings/>}></Route>
         
        </Route>
      </Routes>
    </div>

  )
}

export default App
