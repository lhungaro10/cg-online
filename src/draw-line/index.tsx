import { useRef, useState } from "react";
import { Header } from "../common/components/header";
import { Container, DrawBox, InfoContainer } from "./styles";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";


interface Cordinates{
    x: number,
    y: number
}

export function DrawLine() {
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
    function handleDrawLineByPixel(start: Cordinates, end: Cordinates){ {
        const x1 = start.x;
        const y1 = start.y;
        const x2 = end.x;
        const y2 = end.y;

        const deltaY = y2 - y1;
        const deltaX = x2 - x1;
        const m = deltaY/deltaX;

        if(y1 < y2){
                console.log("deltaY < deltaX");
            for(let y = y1; y <= y2; y++){
                const x = x1 + (y - y1)/m;
                paintPixel(x, y);
            }
        }
        else{
            for(let y = y1; y >= y2; y--){
                const x = x1 + (y - y1)/m;
                console.log(y);
                
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

    // function handleDrawLineByBresehann(start: Cordinates, end: Cordinates){
    //     const x1 = start.x;
    //     const y1 = start.y;
    //     const x2 = end.x;
    //     const y2 = end.y;

    //     const deltaX = Math.abs(x2 - x1);
    //     const deltaY = Math.abs(y2 - y1);
    //     let d = 2 * deltaY - deltaX;
    //     const dE = 2 * deltaY;
    //     const dNE = 2 * (deltaY - deltaX);
    //     let x = x1;
    //     let y = y1;
    //     paintPixel(x, y);

    //     if(deltaX > deltaY){
    //         if(x <= x2){
    //             while(x <= x2){
    //                 if(d < 0){
    //                     d += dE;
    //                     x += 1;
    //                 }else{
    //                     d = d + dNE;
    //                     x += 1;
    //                     y += 1;
    //                 }
    //                 paintPixel(x, y);
    //             }
    //         }
    //         if(x >= x2){
    //             while(x >= x2){
    //                 if(d < 0){
    //                     d += dE;
    //                     x -= 1;
    //                 }else{
    //                     d = d + dNE;
    //                     x -= 1;
    //                     y += 1;
    //                 }
    //                 paintPixel(x, y);
    //             }
    //         }
    //     }

    //     if(deltaY > deltaX){
    //         if(y <= y2){
    //             while(y <= y2){
    //                 if(d < 0){
    //                     d += dE;
    //                     y += 1;
    //                 }else{
    //                     d = d + dNE;
    //                     x += 1;
    //                     y += 1;
    //                 }
    //                 paintPixel(x, y);
    //             }
    //         }
    //         if(y >= y2){
    //             while(y >= y2){
    //                 if(d < 0){
    //                     d += dE;
    //                     y -= 1;
    //                 }else{
    //                     d = d + dNE;
    //                     x -= 1;
    //                     y -= 1;
    //                 }
    //                 paintPixel(x, y);
    //             }
    //         }
    //     }

        

        
        
    // }

    function handleDrawLineByBresehann(start: Cordinates, end: Cordinates){
      const x1 = start.x;
      const y1 = start.y;
      const x2 = end.x;
      const y2 = end.y;
    
      const deltaX = Math.abs(x2 - x1);
      const deltaY = Math.abs(y2 - y1);
      let d = 2 * deltaY - deltaX;
      const dE = 2 * deltaY;
      const dNE = 2 * (deltaY - deltaX);
      let x = x1;
      let y = y1;
      paintPixel(x, y);
    
      if (deltaX > deltaY) {
        if (x1 <= x2) {
          console.log('x1 <= x2');
          
          while (x <= x2) {
            if (d < 0) {
              d += dE;
              x += 1;
            } else {
              d = d + dNE;
              x += 1;
              if (y1 <= y2) {
                y += 1;
              } else {
                y -= 1;
              }
            }
            paintPixel(x, y);
          }
        } else {
          console.log('x1 > x2');
          while (x >= x2) {
            if (d < 0) {
              d += dE;
              x -= 1;
            } else {
              d = d + dNE;
              x -= 1;
              if (y1 <= y2) {
                y += 1;
              } else {
                y -= 1;
              }
            }
            paintPixel(x, y);
          }
        }
      } else {
        if (y1 <= y2) {
          console.log('y1 <= y2');
          while (y <= y2) {
            if (d < 0) {
              d += dE;
              y += 1;
            } else {
              d = d + dNE;
              y += 1;
              if (x1 <= x2) {
                x += 1;
              } else {
                x -= 1;
              }
            }
            paintPixel(x, y);
          }
        } else {
          console.log('y1 > y2');
          while (y >= y2) {
            if (d < 0) {
              d += dE;
              y -= 1;
            } else {
              d = d + dNE;
              y -= 1;
              if (x1 <= x2) {
                x += 1;
              } else {
                x -= 1;
              }
            }
            paintPixel(x, y);
          }
        }
      }
    }
    
    function handleDrawLineByParametrica(start: Cordinates, end: Cordinates){
        const x1 = start.x;
        const y1 = start.y;
        const x2 = end.x;
        const y2 = end.y;

        const steps = 100;
        
        for (let t = 0; t <= 1; t += 1 / steps) {
            const x = x1 + t * (x2 - x1);
            const y = y1 + t * (y2 - y1);
            paintPixel(x, y);
        }

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
                                handleDrawLineByPixel(startCordinates, cordinates);
                                break;
                            case 'by-bresehann':
                                handleDrawLineByBresehann(startCordinates, cordinates);
                                break;
                            case 'by-parametrica':
                                handleDrawLineByParametrica(startCordinates, cordinates);
                                break;
                        }
                    }}
                />
                <InfoContainer>
                    <Button variant="contained" onClick={clearCanvas}>Clear</Button>
                    <p>x: {cordinates.x.toFixed(0)}</p>
                    <p>y: {cordinates.y.toFixed(0)}</p>
                    <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Rect Drawing type</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="by-pixel"
                        value={selectedMethod}
                        onChange={(e)=> handleChangeMethod(e)}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="by-pixel" control={<Radio />} label="By Pixel" />
                        <FormControlLabel value="by-bresehann" control={<Radio />} label="By Bresehann" />
                        <FormControlLabel value="by-parametrica" control={<Radio />} label="By Paramétrica" />
                    </RadioGroup>
                    </FormControl>
                </InfoContainer>
            </Container>
        </>
    )
}