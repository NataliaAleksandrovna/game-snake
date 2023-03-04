const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
const button=document.querySelector("button");
let p=document.querySelector("p");
let box=50;
let field=new Image();
	field.src="img/field.png";
let foodArr=["img/fly.png","img/orange.png","img/lemon.png","img/cherry.png", "img/melon.png", "img/strawberry.png","img/bomb.png"];

let snakeImg=["img/snake.png","img/snakeLeft.png","img/snakeUp.png","img/snakeRight.png"];

let foodImg=new Image();
let snake=new Image();
	snake.src=snakeImg[0];
let snakeBody=[];
	snakeBody[0]={
	x:box,
	y:box
};

let body=new Image();
	body.src="img/shakeBody.png";
let dir;
let score=0;
let count;

let timerFly;
let timerBomb;

document.addEventListener("keydown", move);



function move(event){
	
	if (event.keyCode==37 && dir!="right"){
		dir="left";
		snake.src=snakeImg[1];
	}
	if(event.keyCode==38 && dir!="down"){
		dir="up";
		snake.src=snakeImg[2];
			}
	if (event.keyCode==39 && dir!="left"){
		dir="right";
		snake.src=snakeImg[3];
	}
	if (event.keyCode==40 && dir!="up"){
		dir="down";
		snake.src=snakeImg[0];
		
	}
	return dir;
}

function drawFood(){
	 count=changeFood();
	foodImg.src=foodArr[count];
	foodCoord=Coord();
	verifyFoodSnake();
	
	
	console.log(" запустилась функция drawFood" + count);
		if(count==foodArr.length-1){
			console.log("включился таймер для бомбы");
	   timerBomb=setTimeout(drawFood,10000);
		 };
		if(count==0){
	   timerFly=setTimeout(drawFood,3000);
			console.log("включился таймер для мухи");
		 };
	   
	return count;
}



function drawFoodPremier(){
	 count=changeFood();
	foodImg.src=foodArr[count];
	foodCoord=Coord();
	verifyFoodSnake();
	if(count==foodArr.length-1){
	count=drawFoodPremier();
};
	
	if(foodCoord.x==box && foodCoord.y==box){
		foodCoord=Coord();
	}
	return count;
}
count=drawFoodPremier();




function Coord(){
	return {
	x: Math.floor(Math.random()*(canvas.width/box-2))+1,
	y: Math.floor(Math.random()*(canvas.height/box-2))+1
}
 }



function changeFood(){
	
return Math.floor(Math.random()*foodArr.length);

}

function eatBody(){
	
	 for (let i=1;i<snakeBody.length;i++){
		 
		 if(snakeBody[0].x==snakeBody[i].x && snakeBody[0].y==snakeBody[i].y){
			 gameOver();
			
			 console.log("сработала функция eatBody");
			 
		 }
		 
	 }
	
	
}

function gameOver(){
	clearInterval(timerId);
	button.style.display="block";
	button.addEventListener("click",()=>{location.reload()});
	let previouScore=localStorage.getItem("score");
		if(previouScore==null){
		localStorage.setItem("score", score);
	}
		else {
		if(score>previouScore){
		localStorage.setItem("score", score);
		}
	}
}







function drawGame(){
	
	ctx.drawImage(field,0,0);
	
	ctx.strokeStyle="white";
	ctx.font="italic 24pt Verdana";
	ctx.strokeText("Score: "+score,50,40);
	ctx.strokeText("Максимальный результат: "+ localStorage.getItem("score"),50,canvas.height-10);
		
	ctx.drawImage(foodImg, foodCoord.x*box, foodCoord.y*box);
	
	
	for (let i=0; i<snakeBody.length; i++){
		if (i==0){
		ctx.drawImage(snake,snakeBody[0].x,snakeBody[0].y);	
		}
		else {
		ctx.drawImage(body,snakeBody[i].x,snakeBody[i].y)
		}
	};
console.log(count);
	
checkFoodEat();
	
		
 }

function checkFoodEat(){
	
	if (foodCoord.x*box==snakeBody[0].x && foodCoord.y*box==snakeBody[0].y){
		if(count!=foodArr.length-1 && count!=0){
		score++;
			
		}
		else {
			if(count==foodArr.length-1){
				if(score>=5){
			score-=5;}
				else{score=0;};
				
			snakeBody.pop();
				clearInterval(timerBomb);
		};
			if(count==0){
				  score+=5;
				clearInterval(timerFly);
				
			  };
		};
		
		count=drawFood();
		createNewHead();
			}
	else {createNewHead();
		snakeBody.pop();
		 if(snakeBody.length>=2){
	eatBody(snakeBody);};
		 
		 };

	};

function outField(){

	if (snakeBody[0].x<box ||snakeBody[0].x>(canvas.width-box*2) ||
	   snakeBody[0].y<box || snakeBody[0].y>(canvas.height-box*2)){
		gameOver();
	};
	return false;
	};

function createNewHead(){
	let xPos=snakeBody[0].x;
	let yPos=snakeBody[0].y;
	
	if(dir=="left"){
		xPos-=box;}		
	if(dir=="right"){
		xPos+=box;	
		}
	if(dir=="up"){
		yPos-=box;}
	if(dir=="down"){
		yPos+=box;}
		
	let newHead={
	x:xPos,
	y:yPos
	};

	snakeBody.unshift(newHead);
	outField();
	
		return snakeBody;
	}

function verifyFoodSnake(){
	for (let i=1;i<snakeBody.length;i++){
		if(foodCoord.x*box==snakeBody[i].x && foodCoord.y*box==snakeBody[i].y){
			count=drawFood();
		}
	}
}
let timerId=setInterval(drawGame,250);
