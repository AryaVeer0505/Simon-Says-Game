const countValue=document.querySelector("#count")
const colorPart=document.querySelectorAll(".color-part")
const container =document.querySelector(".container")
const startButton=document.querySelector("#start")
const result =document.querySelector("#result")
const wrapper=document.querySelector(".wrapper")

const colors={
    color1:{
        current:"rgb(2, 196, 2)",
        new:"rgb(1, 133, 1)",
    },
    color2:{
        current:"rgb(222, 5, 5)",
        new:"red",
    },
    color3:{
        current:"rgb(2, 2, 189)",
        new:"blue",
    },
    color4:{
        current:"rgb(201, 201, 0)",
        new:"yellow",
    }
}
let randomColors=[];
let pathGeneratorBool=false
let count,clickcount=0

startButton.addEventListener("click",()=>{
    count=0
    clickcount=0
    randomColors=[]
    pathGeneratorBool=false
    pathGenerate();
    wrapper.classList.remove("hide")
    container.classList.add("hide")
})

const pathGenerate=()=>{
    randomColors.push(generateRandomValue(colors))
    count=randomColors.length
    pathGeneratorBool=true
    pathDecide(count)
}

const generateRandomValue=(obj)=>{
    let arr=Object.keys(obj)
    return arr[Math.floor(Math.random()*arr.length)]
}

const pathDecide=async(count)=>{
    countValue.innerText=count
    for(let i of randomColors){
        let currentColor=document.querySelector(`.${i}`)
        await delay(500)
        currentColor.style.backgroundColor=`${colors[i]["new"]}`
        await delay(600)
        currentColor.style.backgroundColor=`${colors[i]["current"]}`
        await delay(600)

    }
    pathGeneratorBool=false
}


async function delay(time) {
    return await new Promise((resolve)=>{
        setTimeout(resolve,time)
    })
}

colorPart.forEach((element)=>{
    element.addEventListener("click",async(e)=>{
        if(pathGeneratorBool){
            return false
        }
        if(e.target.classList[0]==randomColors[clickcount]){
            e.target.style.backgroundColor=`${colors[randomColors[clickcount]]["new"]}`
            await delay(500)
            e.target.style.backgroundColor=`${colors[randomColors[clickcount]]["current"]}`
            clickcount+=1
            if(clickcount==count){
                clickcount=0
                pathGenerate()

            }
        }
        else{
            lose()
        }
    })
})

const lose=()=>{
    result.innerHTML=`<span>Your score:</span>
    ${count}`
    result.classList.remove("hide")
    container.classList.remove("hide")
    wrapper.classList.add("hide")
    startButton.classList.remove("hide")
    startButton.innerText="play Again"
}