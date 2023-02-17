import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'

import { Home } from './pages/Home'
import { History } from './pages/History/History'

export function Router() {
    return (
        <Routes>
            <Route path='/02-ignite-timer/' element={<DefaultLayout />} >
                <Route path='/02-ignite-timer/' element={<Home />} />
                <Route path='/02-ignite-timer/history' element={<History />} />
            </Route>
        </Routes>
    )
}