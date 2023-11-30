

import html2canvas from "html2canvas";
import { useEffect, useState } from "react";

export default function EditorMeme() {

    const [memes, setMemes] = useState([]);
    const [imgmeme, setImgmeme] = useState('https://i.imgflip.com/4acd7j.png');
    const [fontSize, setFontSize] = useState(25);
    const [fontSize2, setFontSize2] = useState(25);
    const [ejex, setEjex] = useState(0);
    const [ejey, setEjey] = useState(0);
    const [ejex2, setEjex2] = useState(0);
    const [ejey2, setEjey2] = useState(0);
    const [color, setColor] = useState('#7b68ee');
    const [color2, setColor2] = useState('#7b68ee');
    const [fontFamily, setFontFamily] = useState("Verdana")
    const [fontFamily2, setFontFamily2] = useState("Verdana")

    /*Pertenece al input/ lo que tenga en setTextmeme (que lo saco de abajo), se lo asigna a textmeme*/
    const [textmeme, setTextmeme] = useState();
    /*La funcipn que esta en el input, se activa cuando písan en el input. e.target.value es lo que se escribe en el input */
    const textomeme = (e) => {
        setTextmeme(e.target.value);
    }
    const [textmeme2, setTextmeme2] = useState();
    const textomeme2 = (e) => {
        setTextmeme2(e.target.value);
    }



    useEffect(() => {
        getMeme();
    }, [])

    async function getMeme() {
        const response = await fetch('https://api.imgflip.com/get_memes');
        //console.log(response) //Control interno 

        const responseData = await response.json();
        //console.log(responseData); //Control interno
        setMemes(responseData.data.memes);


    }

    const seleccionarImg = (e) => {
        setImgmeme(e.target.src);
    }

    const descargar = (e) => {
        html2canvas(document.querySelector("#exportar"),
            { logging: true, letterRendering: 1, allowTaint: false, useCORS: true }).then(function (canvas) {
                let img = canvas.toDataURL("memes/jpg");
                let link = document.createElement("a");
                link.download = "memepropio.jpg";
                link.href = img;
                link.click();
            });
    }


    return (
        <div>
            <div className="contenedor-editor">
                <h1>#Divertite creando tu propio meme </h1>
                <h3>Elegí entre cientos de imagenes!</h3>
                <figure className='meme-elegido' id="exportar">
                    <p className="texto-meme" style={{ fontSize: `${fontSize}px`, transform: `translate(${ejex}px, ${ejey}px)`, color: `${color}`, fontFamily: `${fontFamily}` }}>{textmeme}</p>
                    <p className="texto-meme2" style={{ fontSize: `${fontSize2}px`, transform: `translate(${ejex2}px, ${ejey2}px)`, color: `${color2}`, fontFamily: `${fontFamily2}` }}>{textmeme2}</p>
                    <img src={imgmeme} className="figure-img d-block m-auto" alt="Imagen no encontrada" />
                </figure>

                <div className="contenedor-estilos">
                    <div className='cambios-meme'>
                        <h4>Ingresa el texto:</h4>
                        <input onChange={textomeme} className="input" type="text" placeholder="Ingrese el texto" />

                        <div className="tamaño-letra">
                            <label><h6>Tamaño de la letra</h6></label>
                            <input type="range" min="10" max="100" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
                        </div>

                        <div className="color">
                            <label for="fontColor"><h6>Color</h6></label>
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                        </div>

                        <div className="position-text">
                            <h6>Ubicación</h6>
                            <label>Horizontal:
                                <input type="range" min="0" max="400" value={ejex} onChange={(e) => setEjex(e.target.value)} />
                            </label>
                            <label>Vertical:
                                <input type="range" min="0" max="400" value={ejey} onChange={(e) => setEjey(e.target.value)} />
                            </label>
                        </div>

                        

                        <div className="tipo-letra">
                            <h6>Tipo de letra</h6>
                            <select onChange={(e) => setFontFamily(e.target.value)} className="" >
                                <option value={"Verdana"}>Verdana</option>
                                <option value={"Impact"}>Impact</option>
                                <option value={"Arial"}>Arial</option>
                                <option value={"Comic Sans"}>Comic Sans</option>

                            </select>

                        </div>

                    </div>
                    <div className="cambios-meme-2">
                        <h4>Ingresa el texto:</h4>
                        <input onChange={textomeme2} className="input" type="text" placeholder="Ingrese el texto" />

                        <div className="tamaño-letra">
                            <label><h5>Tamaño de la letra:</h5></label>
                            <input type="range" min="10" max="100" value={fontSize2} onChange={(e) => setFontSize2(e.target.value)} />
                        </div>

                        <div className="color">
                            <label for="fontColor"><h6>Color</h6></label>
                            <input type="color" id="fontColor" value={color2} onChange={(e) => setColor2(e.target.value)} />
                        </div>

                        <div className="position-text">
                            <h6>Ubicación</h6>
                            <label>Horizontal:
                                <input type="range" min="0" max="400" value={ejex2} onChange={(e) => setEjex2(e.target.value)} />
                            </label>
                            <label>Vertical:
                                <input type="range" min="0" max="400" value={ejey2} onChange={(e) => setEjey2(e.target.value)} />
                            </label>
                        </div>
                        

                        <div className="tipo-letra">
                            <h6>Tipo de letra</h6>
                            <select onChange={(e) => setFontFamily2(e.target.value)} className="" >

                                <option value={"Verdana"}>Verdana</option>
                                <option value={"Impact"}>Impact</option>
                                <option value={"Arial"}>Arial</option>
                                <option value={"Comic Sans"}>Comic Sans</option>

                            </select>

                        </div>


                    </div>



                </div>
                <button onClick={descargar} type="button" className="btn btn-primary mt-4 mb-4">Descargar</button>


            </div>

            <div className='contenedor-api'>
                <h3>Selecciona la imagen</h3>
                {memes.map((item) => (

                    <div className="api-meme" key={item.id}>
                        <img src={item.url} onClick={seleccionarImg} alt={item.name} />
                    </div>
                ))}

            </div>




        </div>
    )
}
