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
    function DrawLine(start: Cordinates, end: Cordinates){ {
        const x1 = start.x;
        const y1 = start.y;
        const x2 = end.x;
        const y2 = end.y;

        const deltaY = y2 - y1;
        const deltaX = x2 - x1;
        const m = deltaY/deltaX;

        if(y1 < y2){
            for(let y = y1; y <= y2; y++){
                const x = x1 + (y - y1)/m;
                paintPixel(x, y);
            }
        }
        else{
            for(let y = y1; y >= y2; y--){
                const x = x1 + (y - y1)/m;
                paintPixel(x, y);
            }
        }
        if(x1 < x2){
            for (let x = x1; x <= x2; x++) {
                const y = m * (x - x1) + y1;
                paintPixel(x, y);
            }
        }else{
            for (let x = x1; x >= x2; x--) {
                const y = m * (x - x1) + y1;
                paintPixel(x, y);
            }
        }

    }
    }

    const constructHouse = ():void =>{
        const point00:Cordinates = {
            x: 10,
            y: 10
        }
        const point0100:Cordinates = {
            x: 10,
            y: 100
        }

        const point50150:Cordinates = {
            x: 60,
            y: 150
        }
        
        DrawLine(point00, point0100);
        DrawLine(point0100, point50150);
    }

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
        const webgl = canvasRef.current?.getContext('webgl2');
        
        console.log(webgl);
        
        // if(ctx){
        //     ctx.beginPath();
        //     ctx.fillStyle = 'red';
        //     ctx.fillRect(x,y, 1,1);
        //     ctx.closePath();
        // }
        
    }

    function showMatrix(){
        const ctx = canvasRef.current?.getContext('2d');
        console.log(ctx?.getTransform());
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
                    onClick={(e) =>{
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