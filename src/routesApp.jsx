import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DailyMeasurements from './pages/dailyMeasurement/index'
import DailyMeasurement from './pages/dailyMeasurement/dailyMeasurement'
import Foods from './pages/foods'
import Food from './pages/foods/food'
import Medicines from './pages/medicines'
import Medicine from './pages/medicines/medicine'
import PhysicalActivities from './pages/physicalActivities'
import PhysicalActivity from './pages/physicalActivities/physicalActivity'
import SleepNights from './pages/sleepNights'
import SleepNight from './pages/sleepNights/sleepNight'

import Login from './pages/users/login'
import Logout from './pages/users/logout'
import Signup from './pages/users/signup'
import ForgotThePassword from './pages/users/forgotThePassword'
import Profile from './pages/users/profile'
import Weights from './pages/weights'
import Weight from './pages/weights/weight'


function RoutesApp() {



    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/dailyMeasurements" element={<DailyMeasurements />} />
                <Route path="/dailyMeasurement/:id" element={<DailyMeasurement />} />

                <Route path="/foods" element={<Foods />} />
                <Route path="/food/:id" element={<Food />} />
                <Route path="/medicines" element={<Medicines />} />
                <Route path="/medicine/:id" element={<Medicine />} />
                <Route path="/physicalActivities" element={<PhysicalActivities />} />
                <Route path="/physicalActivity/:id" element={<PhysicalActivity />} />
                <Route path="/weights" element={<Weights />} />
                <Route path="/weight/:id" element={<Weight />} />
                <Route path="/sleepNights" element={<SleepNights />} />
                <Route path="/sleepNight/:id" element={<SleepNight />} />

                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/forgotThePassword" element={<ForgotThePassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp
