const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}
//dot then chain as implicit returns
// delayedColorChange('red', 1000)
// .then(() => delayedColorChange('orange', 1000))
// .then(() => delayedColorChange('yellow', 1000))
// .then(() => delayedColorChange('red', 1000))
// .then(() => delayedColorChange('purple', 1000))
// .then(() => delayedColorChange('blue', 1000))
// .then(() => delayedColorChange('indigo', 1000))
// .then(() => delayedColorChange('violet', 1000))


//we can do the same with an async function which looks even neater
async function rainbow(){
    await delayedColorChange('red', 1000)
    await delayedColorChange('orange', 1000)
    await delayedColorChange('yellow', 1000)
    await delayedColorChange('green', 1000)
    await delayedColorChange('blue', 1000)
    await delayedColorChange('indigo', 1000)
    await delayedColorChange('violet', 1000)
    return "ALL DONE!"
}

//rainbow().then(() => console.log("END OF RAINBOW!"))

//or we can do another async instead of dot then

async function printRainbow() {
    await rainbow();
    console.log("END OF RAINBOW!")
}
printRainbow();