import { useEffect, useRef, useState } from "react";
import { Header } from "../common/components/header";
import { Container, DrawBox, InfoContainer } from "./styles";
import { Button } from "@mui/material";


interface Cordinates{
    x: number,
    y: number
}

export function House() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const[startCordinates, setStartCordinates]=useState<Cordinates>({
    //     x: 0,
    //     y: 0
    // });
    const [cordinates, setCoordinates] = useState<Cordinates>({
        x: 0,
        y: 0
    });
    useEffect(()=>{
        clearCanvas();
        // constructHouse();
    }, []);
    

    

    function clearCanvas(){
        const ctx = canvasRef.current?.getContext('2d');

        if(ctx){
            ctx.clearRect(0, 0, 500, 500);
        }
    }
    function getMousePosition(canvas: HTMLCanvasElement, e: React.MouseEvent ){
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        }
    }

    function paintPixel(x: number,y:number){
        const ctx = canvasRef.current?.getContext('2d');        
        if(ctx){
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.fillRect(x,y, 1,1);
            ctx.closePath();
        }
        
    }


    return (
        <>
            <Header 
                title="Small House"
                />
            <Container>
                <DrawBox 
                    width={500}
                    height={500}
                    ref={canvasRef}
                    onClick={() =>{
                        // setStartCordinates([e.clientX, e.clientY]);
                        paintPixel(cordinates.x, cordinates.y);
                    }}  
                    onMouseDown={() => {
                        // setStartCordinates({x:cordinates.x, y:cordinates.y});
                    }}
                    onMouseMove={(e) => {
                        setCoordinates(getMousePosition(canvasRef.current as HTMLCanvasElement, e));
                    }}

                />
                <InfoContainer>
                    <Button variant="contained" onClick={clearCanvas}>Clear</Button>
                    <p>x: {cordinates.x.toFixed(0)}</p>
                    <p>y: {cordinates.y.toFixed(0)}</p>
                    
                    
                </InfoContainer>
            </Container>
        </>
    )
}