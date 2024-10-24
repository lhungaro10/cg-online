import { Header } from "../common/components/header";
import { FunctionCard } from "./components/function-card";
import { MainContent } from "./styles";

export function Home() {

    const navigator = (key:string)=>{
        window.location.href = key
    }

    return(
        <>
            <Header 
                title="Picasso Online"
            />
            <MainContent>
            <FunctionCard title="Draw Line" onClick={() => navigator('draw-line')} />
            <FunctionCard title="RGB -> HSV" onClick={() => navigator('convert-hsv')} />
            <FunctionCard title="Draw Circle" onClick={() => navigator('draw-circle')} />
            <FunctionCard title="House" onClick={() => navigator('small-house')} />

            </MainContent>
        </>
    )
}
