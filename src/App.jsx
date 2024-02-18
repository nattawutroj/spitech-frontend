
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Components/Home"
import Dashboard from "./Dashboard"
import RouteStudenDash from "./StudentDash"
import Report from "./Components/SubComponets/Report"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/studentdash/*" element={<RouteStudenDash />} />
          <Route path="/testreport/:id/:selectReport" element={<Report />} />
          <Route path="/*" element={<h1>Not Found 404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App