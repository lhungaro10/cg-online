import { useRef, useState } from "react";
import { Header } from "../common/components/header";
import { Container, DrawBox, InfoContainer } from "./styles";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";


interface Cordinates{
    x: number,
    y: number
}

export function DrawCircle() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const[startCordinates, setStartCordinates]=useState<Cordinates>({
        x: 0,
        y: 0
    });
    const [cordinates, setCoordinates] = useState<Cordinates>({
        x: 0,
        y: 0
    });
    const [selectedMethod, setSelectedMethod] = useState<string>('by-pixel');

    function handleChangeMethod(e: React.ChangeEvent<HTMLInputElement>){
        setSelectedMethod(e.target.value);
    }

    function clearCanvas(){
        const ctx = canvasRef.current?.getContext('2d');

        if(ctx){
            ctx.clearRect(0, 0, 600, 400);
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
    function handleDrawCircleByPixel(start: Cordinates, end: Cordinates){ {
        const x1 = start.x;
        const y1 = start.y;
        const x2 = end.x;
        const xc = x1;
        const yc = y1;

        const radius = Math.abs(x2 - x1);

        for(let x = -radius; x <= radius; x++){
            const y = Math.sqrt(radius*radius - x*x);
            paintPixel(xc+x,yc+y);
            paintPixel(xc+x,yc-y);
        }
    }
    }

    function handleDrawLineByRotation(start: Cordinates, end: Cordinates){
        let x = Math.abs(end.x - start.x);
        let y = 0;
        const cos1 = Math.cos(1);
        const sin1 = Math.sin(1);

        const xc = start.x;
        const yc = start.y;

        for(let i = 1; i <= 360; i++){
            const xn = x*cos1 - y*sin1;
            y = x*sin1 + y*cos1;
            x = xn;
            paintPixel(xc+x,yc+y);
        }
    }
    
    function handleDrawCircleByParametrica(start: Cordinates, end: Cordinates){
        const x1 = start.x;
        const y1 = start.y;
        const x2 = end.x;
        const xc = x1;
        const yc = y1;
        const r = Math.abs(x2 - x1);
        const steps = 100;

        for (let t = 0; t <= 2 * Math.PI; t += 1/steps) {
            const x = r * Math.cos(t);
            const y = r * Math.sin(t);
            paintPixel(xc+x, yc+y);
        }

    }

    function handleDrawCircleByBresehann(start: Cordinates, end: Cordinates){
        const radius = Math.abs(start.x - end.x);
        const xc = start.x;
        const yc = start.y;
        let x = 0;
        let y = radius;
        let h = 1 - radius;
        let dE = 3;
        let dSE = -2*radius+5;
        paintPixel(x,y);
        while(x < y){
            if(h < 0){
                h = h + dE;
                dE = dE + 2;
                dSE = dSE + 2;
            }else{
                h= h + dSE;
                dE = dE + 2;
                dSE = dSE + 4;
                y -= 1;
            }
            x += 1;
            paintSimetricCircle(x,y, xc, yc);
        }
    }

    function paintSimetricCircle(x: number, y: number, xc: number, yc: number){
        paintPixel(xc+x,yc+y);
        paintPixel(xc-x,yc-y);

        paintPixel(xc+x,yc-y);
        paintPixel(xc-x,yc+y);

        paintPixel(xc+y,yc+x);
        paintPixel(xc-y,yc-x);

        paintPixel(xc+y,yc-x);
        paintPixel(xc-y,yc+x);
    }

    return (
        <>
            <Header 
                title="Draw Line"
                />
            <Container>
                <DrawBox 
                    width={600}
                    height={400}
                    ref={canvasRef}
                    onClick={() =>{
                        // setStartCordinates([e.clientX, e.clientY]);
                        paintPixel(cordinates.x, cordinates.y);

                    }}  
                    onMouseDown={() => {
                        setStartCordinates({x:cordinates.x, y:cordinates.y});
                    }}
                    onMouseMove={(e) => {
                        setCoordinates(getMousePosition(canvasRef.current as HTMLCanvasElement, e));
                    }}
                    onMouseUp={() => {
                        switch (selectedMethod) {
                            case 'by-pixel':
                                handleDrawCircleByPixel(startCordinates, cordinates);
                                break;
                            case 'by-rotation':
                                handleDrawLineByRotation(startCordinates, cordinates);
                                break;
                            case 'by-parametrica':
                                handleDrawCircleByParametrica(startCordinates, cordinates);
                                break;
                            case 'by-bresehann':
                                handleDrawCircleByBresehann(startCordinates, cordinates);
                                break;
                        }
                    }}
                />
                <InfoContainer>
                    <Button variant="contained" onClick={clearCanvas}>Clear</Button>
                    <p>x: {cordinates.x.toFixed(0)}</p>
                    <p>y: {cordinates.y.toFixed(0)}</p>
                    <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Circle Drawing type</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="by-pixel"
                        value={selectedMethod}
                        onChange={(e)=> handleChangeMethod(e)}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="by-pixel" control={<Radio />} label="By Pixel" />
                        <FormControlLabel value="by-rotation" control={<Radio />} label="By Rotation" />
                        <FormControlLabel value="by-parametrica" control={<Radio />} label="By Paramétrica" />
                        <FormControlLabel value="by-bresehann" control={<Radio />} label="By Bresehann" />
                    </RadioGroup>
                    </FormControl>
                </InfoContainer>
            </Container>
        </>
    )
}