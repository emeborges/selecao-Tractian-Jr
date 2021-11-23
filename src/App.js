import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Dashboard from "../src/pages/Dashboard"
import Assets from "../src/pages/Assets"
import Maquinas from "../src/pages/Maquinas"
import Descritivo from "../src/pages/Descritivo"



const App = () => {
    return(
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/maquinas" element={<Maquinas />} />
     
                <Route path="/detalhado/:maquina" element={<Descritivo />} />
            
            <Route path="/" element={<Home />} />
        </Routes>
    )
}

export default App