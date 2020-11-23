const addButton = document.querySelector('button');
const container = document.querySelector('#container');
const remove = document.querySelector('#remove');

remove.addEventListener('click', removeBox);


function removeBox(){
    if(container.hasChildNodes(box) && box !== null){
        container.removeChild(box);
        box = null;
    }
}

addButton.onclick = function(){
    let newRect = document.createElement('div');
    newRect.classList.add('rect');
    const red = Math.floor(Math.random() * (256 - 120) + 120);
    const green = Math.floor(Math.random() * (256 - 120) + 120);
    const blue = Math.floor(Math.random() * (256 - 120) + 120);
    newRect.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.4)`;
    newRect.style.border = `1px solid rgb(${red}, ${green}, ${blue})`;
    makeResize(newRect);
    moveRect(newRect);
    container.appendChild(newRect);
}

function makeResize(rect){
    let resize = document.createElement('div');
    resize.classList.add('resize');
    resize.addEventListener('mousedown', clickResize);
    rect.appendChild(resize);
}

let mouseX, mouseY, isRectClicked = false, box = null;

const eventsRect = {
    mousedown(){
        if(isRectClicked){
            isRectClicked = false;
            this.style.zIndex = 0;
        }
        else{
            box = this;
            isRectClicked = true;
            this.style.zIndex = 1;
        }
        let {clientX, clientY} = event;
        mouseX = clientX;
        mouseY = clientY;
    },
    mousemove(){
        let {clientX, clientY} = event;
        if(isRectClicked && !isResizeClicked){
            mouseX = clientX;
            mouseY = clientY;
            midHeight = this.offsetHeight / 2;
            midWidth = this.offsetWidth / 2;
            this.style.top = (mouseY - midHeight) + 'px';
            this.style.left = (mouseX - midWidth) + 'px';
        }
    },
    mouseleave(){
        isRectClicked = false;
        this.style.zIndex = 0;
    }
}

let startX, startY, endX, endY, isResizeClicked = false, width, height;

function moveRect(newRect) {
    for(eventName in eventsRect){
        newRect.addEventListener(eventName, eventsRect[eventName]);
    }
}

function clickResize(){
    isResizeClicked = true;
    box = this.parentElement;
    const {clientX, clientY} = event;
    startX = clientX;
    startY = clientY;
    width = +box.offsetWidth;
    height = +box.offsetHeight;
}

const eventsWindow = {
    mousemove(){
        if(isResizeClicked){
            const {clientX, clientY} = event;
            endX = clientX;
            endY = clientY;
            width += +(endX - startX);
            height += +(endY - startY);
            box.style.width = width + 'px';
            box.style.height = height + 'px'; 
            startX = clientX;
            startY = clientY;
        }
    },
    mouseup(){
        isResizeClicked = false;
    }
}

for(eventName in eventsWindow){
    window.addEventListener(eventName, eventsWindow[eventName]);
}