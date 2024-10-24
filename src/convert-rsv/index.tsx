import { useState } from "react";
import { Header } from "../common/components/header";
import { Container, Form, Input, Radio, RadioContainer } from "./styles";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@mui/material";

type RGB = {
    R: number
    G: number
    B: number
}

type HSL = {
    H: number
    S: number
    L: number
}

export function ConvertHSL() {
    const [RGB, setRGB] = useState<RGB>({
        R: 0,
        G: 0,
        B: 0
    })

    const [HSL, setHSL] = useState<HSL>({
        H: 0,
        S: 0,
        L: 0
    })

    const [isRGBConvertSelected, setRGBConvertSelected] = useState(false)

    function rgbToHsl(r:number, g:number, b:number) {
        // Converte os valores RGB (0-255) para a escala (0-1)
        r /= 255;
        g /= 255;
        b /= 255;
    
        // Obtém os valores máximo e mínimo dos componentes RGB
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h=0, s=0, l=0;
    
        // Calcula o valor de Lightness
        l = (max + min) / 2;
    
        // Se o valor máximo e mínimo são iguais, não há saturação
        if (max === min) {
            h = s = 0; // Acromático (cinza)
        } else {
            const delta = max - min;
    
            // Saturação
            s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    
            // Matiz (Hue)
            switch (max) {
                case r:
                    h = (g - b) / delta + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / delta + 2;
                    break;
                case b:
                    h = (r - g) / delta + 4;
                    break;
            }
            h /= 6;
        }
    
        // Ajuste para os novos intervalos
        h = Math.round(h * 239); // De 0-1 para 0-239
        s = Math.round(s * 240); // De 0-1 para 0-240
        l = Math.round(l * 240); // De 0-1 para 0-240
        setHSL( {
            H: h,
            S: s,
            L: l
        })
    }
    
    function hslToRgb(h:number, s:number, l:number) {
        // Ajuste os valores para a escala original (h: 0-239, s: 0-240, l: 0-240)
        h = h / 239;
        s = s / 240;
        l = l / 240;
    
        // Função auxiliar para converter as cores
        function hueToRgb(p:number, q:number, t:number) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
    
        let r, g, b;
    
        if (s === 0) {
            // Se não houver saturação, a cor é acromática (cinza)
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hueToRgb(p, q, h + 1/3);
            g = hueToRgb(p, q, h);
            b = hueToRgb(p, q, h - 1/3);
        }
    
        // Converte para a escala de 0-255 e retorna os valores RGB
        
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);
        
        setRGB( {
            R: r,
            G: g,
            B: b
        })
    }

    const handleChangeConvertType = ()=>{
        setRGBConvertSelected(!isRGBConvertSelected)
    }

    const handleConvertColor = ()=>{

        if(!isRGBConvertSelected){
            rgbToHsl(RGB.R, RGB.G, RGB.B);
        }else{
            hslToRgb(HSL.H, HSL.S, HSL.L);
        }
    }
    
    return (
        <>
            <Header 
                title="RGB <-> HSL"
                />

            <Container>
                <RadioContainer>
                    <Radio>R</Radio>
                    <Radio>G</Radio>
                    <Radio>B</Radio>
                </RadioContainer>
                <Form>

                    <Input 
                        type="number"
                        placeholder="R"
                        onChange={e => setRGB({...RGB, R: parseInt(e.target.value)})}
                        value={RGB.R.toString()}
                        max={255}
                        disabled={isRGBConvertSelected}
                    />
                    <ArrowRight size={32} />
                    <Input 
                        type="number"
                        placeholder="H"
                        onChange={e => setHSL({...HSL, H: parseInt(e.target.value)})}
                        value={HSL.H.toString()}
                        disabled={!isRGBConvertSelected}

                    />
                    
                    <Input 
                        type="number"
                        placeholder="G"
                        onChange={e => setRGB({...RGB, G: parseInt(e.target.value)})}
                        value={RGB.G.toString()}
                        max={255}
                        disabled={isRGBConvertSelected}
                    />
                    <ArrowRight size={32} />
                    
                    <Input 
                        type="number"
                        placeholder="S"
                        onChange={e => setHSL({...HSL, S: parseInt(e.target.value)})}
                        value={HSL.S.toString()}
                        disabled={!isRGBConvertSelected}

                    />
                    <Input 
                        type="number"
                        placeholder="B"
                        onChange={e => setRGB({...RGB, B: parseInt(e.target.value)})}
                        value={RGB.B.toString()}
                        max={255}
                        disabled={isRGBConvertSelected}

                    />
                    
                    <ArrowRight size={32} />
                    <Input 
                        type="number"
                        placeholder="V"
                        onChange={e => setHSL({...HSL, L: parseInt(e.target.value)})}
                        value={HSL.L.toString()}
                        disabled={!isRGBConvertSelected}

                    />
                    
                </Form>
                <RadioContainer>
                    <Radio>H</Radio>
                    <Radio>S</Radio>
                    <Radio>L</Radio>
                </RadioContainer>
                    <RadioContainer>
                        <Button variant="contained" color="primary" onClick={handleConvertColor}>Convert</Button>
                        <Button variant="contained" color="primary" onClick={handleChangeConvertType}>Change Convertion</Button>
                    </RadioContainer>
            </Container>
        </>
    )
}