import { Header } from "../common/components/header";
import { FunctionCard } from "./components/function-card";
import { MainContent } from "./styles";

export function Home() {
    return(
        <>
            <Header 
                title="Picasso Online"
            />
            <MainContent>
            <FunctionCard title="Draw Line" nav={'/draw-line'}/>
            <FunctionCard title="RGB -> HSV" nav={'/convert-hsv'} />
            <FunctionCard title="Draw Circle" nav={'/draw-circle'} />
            <FunctionCard title="House" nav={'/small-house'} />

            </MainContent>
        </>
    )
}
