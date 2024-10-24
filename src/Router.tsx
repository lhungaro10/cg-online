import { Route, Routes } from "react-router-dom";
import {Home}  from "./home/index";
import { DrawLine } from "./draw-line";
import { ConvertHSL } from "./convert-rsv";
import { DrawCircle } from "./draw-circle";
import { House } from "./house";

export function Router() {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/draw-line" element={<DrawLine />} />
            <Route path="/draw-circle" element={<DrawCircle />} />
            <Route path="/small-house" element={<House />} />
            <Route path="/convert-hsv" element={<ConvertHSL />} />
        </Routes>
    )
}