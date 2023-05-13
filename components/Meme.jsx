import React from "react"
import memesData from "../memesData.jsx"

function Memer() {
    const randomNum = Math.floor(Math.random() * memesData.data.memes.length)
    const randomMeme = memesData.data.memes[randomNum]
    const randomMemeUrl = randomMeme.url
    document.getElementsByClassName("meme--image")[0].src = randomMemeUrl
}

function changer() {
    document.getElementById("text-top").innerHTML = document.getElementsByClassName("form--input")[0].value
    document.getElementById("text-bottom").innerHTML = document.getElementsByClassName("form--input")[1].value
}

function downloadMeme() {
    const memeImage = document.getElementsByClassName("meme--image")[0].src;
    const memeTextTop = document.getElementById("text-top").textContent;
    const memeTextBottom = document.getElementById("text-bottom").textContent;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        ctx.font = "bold 36px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.fillText(memeTextTop, canvas.width / 2, 50);
        ctx.strokeText(memeTextTop, canvas.width / 2, 50);
        ctx.fillText(memeTextBottom, canvas.width / 2, canvas.height - 20);
        ctx.strokeText(memeTextBottom, canvas.width / 2, canvas.height - 20);

        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "meme.png";
        link.click();
    };

    image.src = memeImage;
}

export default function Meme() {
    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={changer}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={changer}
                />
                <button
                    className="form--button"
                    onClick={Memer}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img
                    src={memesData.data.memes[4].url}
                    alt="Meme"
                    className="meme--image"
                />
                <h2 className="meme--text meme--text-top" id="text-top">
                    Top text
                </h2>
                <h2 className="meme--text meme--text-bottom" id="text-bottom">
                    Bottom text
                </h2>
            </div>
            <div className="operation">
                <button className="operation--button" onClick={downloadMeme}>
                    Download meme
                </button>
            </div>
        </main>
    )
}