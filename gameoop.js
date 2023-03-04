
let foodArr=["img/fly.png","img/orange.png","img/lemon.png","img/cherry.png", "img/melon.png", "img/strawberry.png","img/bomb.png"];

let shakeImg=["img/snake.png","img/snakeLeft.png","img/snakeUp.png","img/snakeRight.png"];

let field="img/field.png";
let body="img/shakeBody.png";
let box=50;

class Shake{
	#canvas;
	#shakeImg;
	#shake;
	#shakeBody;
	#box;
	#dir;
	#body;
	
	
	
	constructor(canvas){
		this.#canvas=canvas;
		this.#shakeImg=shakeImg;
		this.#shake=new Image();
		this.#shake.src=this.#shakeImg[0];
		this.#shakeBody=[];
		this.#box=box;
		this.#dir;
	this.#shakeBody[0]={
		x:box,
		y:box
	};
		this.#body=new Image();
		this.#body.src=body;
		
		document.addEventListener("keydown", ()=>this.move(event));
	}
	move(event){
	
		if (event.keyCode==37 && this.#dir!="right"){
		this.#dir="left";
		this.#shake.src=shakeImg[1];
		}
		if(event.keyCode==38 && this.#dir!="down"){
		this.#dir="up";
		this.#shake.src=this.#shakeImg[2];
			}
		if (event.keyCode==39 && this.#dir!="left"){
		this.#dir="right";
		this.#shake.src=this.#shakeImg[3];
		}
		if (event.keyCode==40 && this.#dir!="up"){
		this.#dir="down";
		this.#shake.src=shakeImg[0];
		
		}
		return this.#dir;
	}
	
	getshakeBody(){
		return this.#shakeBody;
	}
	
	getshake(){
		return this.#shake;
	}
	
	getbody(){
		return this.#body;
	}

	

	createNewHead(){
		let xPos=this.#shakeBody[0].x;
		let yPos=this.#shakeBody[0].y;

		if(this.#dir=="left"){
			xPos-=box;}		
		if(this.#dir=="right"){
			xPos+=box;	
			}
		if(this.#dir=="up"){
			yPos-=box;}
		if(this.#dir=="down"){
			yPos+=box;}

		let newHead={
		x:xPos,
		y:yPos
		};

		this.#shakeBody.unshift(newHead);
		

		return this.#shakeBody;
	}

	
}
class Food{
	
	#foodImg;
	#html;
	#canvas;
	#box;
	#count;
	#foodCoord;
	#shakeBody;
	
	timerBomb;
	timerFly;
  
	constructor(shakeBody){
		
		this.#foodImg=new Image();
		this.#html=new HTML("game");
		this.#canvas=this.#html.getCanvas();
		this.#box=box;
		
		
		this.#count=this.changeFood();
		console.log(this.#count);
					
		this.#foodCoord=this.Coord();
		console.log(this.#foodCoord);
		
		
		this.#foodImg.src=foodArr[this.#count];
					
		this.drawFoodPremier();
		this.#shakeBody=shakeBody;
		console.log(this.#shakeBody);
		this.timerBomb;
		this.timerFly;
		
	}
	getFoodImg(){
		return this.#foodImg;
	}
	
	getcount(){
		return this.#count;
	}
	getFoodCoord(){
		return this.#foodCoord;
	}
	Coord(){
		return {
	x: Math.floor(Math.random()*(this.#canvas.width/box-2))+1,
	y: Math.floor(Math.random()*(this.#canvas.height/box-2))+1
	}
	 }

	changeFood(){
		return Math.floor(Math.random()*foodArr.length);
	}
		
	randomFood(){
	
			
		
	}
		
	verifyFoodShake(){
		for (let i=1;i<this.#shakeBody.length;i++){
			if(this.#foodCoord.x*box==this.#shakeBody[i].x && this.#foodCoord.y*this.#box==this.#shakeBody[i].y){
				this.#count=this.drawFood();
			}
		}
	}
	verifyFlyBomb(){
		if(this.#count==foodArr.length-1||this.#count==0){
			
		return true;
		
		 };
	}
		   
	drawFood(){
	this.#count=this.changeFood();
	this.#foodImg.src=foodArr[this.#count];
	this.#foodCoord=this.Coord();
	
	this.verifyFoodShake();
	
	//console.log(" запустилась функция drawFood" + this.#count);
		if(this.#count==foodArr.length-1){
			console.log("включился таймер для бомбы");
	   this.timerBomb=setTimeout(()=>{
       this.drawFood();
	  },10000);
		
		 };
		if(this.#count==0){
	   this.timerFly=setTimeout(()=>{
	   this.drawFood();
		},3000);
			console.log("включился таймер для мухи");
		
		 };
	   
	
}

	
	verifyFoodShake(){
		
		
		for (let i=1;i<this.#shakeBody.length;i++){
			if(this.#foodCoord.x*box==this.#shakeBody[i].x && this.#foodCoord.y*this.#box==this.#shakeBody[i].y){
			 console.log("verifyFoodShake");
				this.#count=this.drawFood();
			}
		}
	}

	drawFoodPremier(){
	
	if(this.#count==foodArr.length-1){
	this.#count=this.drawFoodPremier();
};
	
	if(this.#foodCoord.x==box && this.#foodCoord.y==box){
		this.#foodCoord=this.Coord();
	}
	
}



	}

class Draw{
	#canvas;
	#field;
	#ctx;
	#score;
	#box;
	#html;
	#food;
	#foodImg;
    #foodCoord;
	#shakeBody;
	#shakeObj;
	#shake;
	#body;
	#count;
	
	#button;
	timerId;
	constructor(){
		this.#html=new HTML("game");
		
		this.#canvas=this.#html.getCanvas();
		
		this.#ctx=this.#canvas.getContext("2d");
		
		this.#field=new Image();
		this.#field.src=field;
		this.#score=0;
		this.#box=box;
		
	
		this.#shakeObj=new Shake(this.#canvas);
		this.#shakeBody=this.#shakeObj.getshakeBody();
		
		this.#shake=this.#shakeObj.getshake();
		this.#body=this.#shakeObj.getbody();
		this.#food=new Food(this.#shakeBody);
		
		this.#foodImg=this.#food.getFoodImg();
				
		this.#button=this.#html.getButton();
		
		this.timerId=setInterval(()=>this.drawGame(),250);
	}
		

	drawGame(){
	
	this.#ctx.drawImage(this.#field,0,0);
	this.#ctx.strokeStyle="white";
	this.#ctx.font="italic 24pt Verdana";
	this.#ctx.strokeText("Score: "+this.#score,this.#box,this.#box*0.8);
	this.#ctx.strokeText("Максимальный результат: "+ localStorage.getItem("score"),this.#box,this.#canvas.height-this.#box*0.2);
		
	this.#ctx.drawImage(this.#foodImg, this.#food.getFoodCoord().x*box, this.#food.getFoodCoord().y*box);
	
	
	
	for (let i=0; i<this.#shakeBody.length; i++){
		
		 if (i==0){
		this.#ctx.drawImage(this.#shake,this.#shakeBody[0].x,this.#shakeBody[0].y);	
		}
		else {
		this.#ctx.drawImage(this.#body,this.#shakeBody[i].x,this.#shakeBody[i].y)
		}
		};

	
	this.checkFoodEat();
		this.outField();
	
	}

	checkFoodEat(){
	
	if (this.#food.getFoodCoord().x*box==this.#shakeBody[0].x && this.#food.getFoodCoord().y*box==this.#shakeBody[0].y){
		
		if(this.#food.getcount()!=foodArr.length-1 && this.#food.getcount()!=0){
		this.#score++;
			
		}
		else {
			if(this.#food.getcount()==foodArr.length-1){
				if(this.#score>=5){
			this.#score-=5;}
				else{this.#score=0;};
				
			this.#shakeBody.pop();
		
				clearInterval(this.#food.timerBomb);
		};
			if(this.#food.getcount()==0){
				  this.#score+=5;
				clearInterval(this.#food.timerFly);
				
			  };
		};
		
		this.#food.drawFood();
		
		
		
		this.#shakeObj.createNewHead();
		
			}
	else {
		
			this.#shakeObj.createNewHead();
		this.#shakeBody.pop();
		 if(this.#shakeBody.length>=2){
	this.eatBody(this.#shakeBody);};
		 
		 };

	};
	
	eatBody(){
	
		 for (let i=1;i<this.#shakeBody.length;i++){
		 
			 if(this.#shakeBody[0].x==this.#shakeBody[i].x && this.#shakeBody[0].y==this.#shakeBody[i].y){
				 this.gameOver();

				 console.log("сработала функция eatBody");

				 }
		 }
		}
	outField(){
console.log("outField");
		if (this.#shakeBody[0].x<box || this.#shakeBody[0].x>(this.#canvas.width-box*2) || this.#shakeBody[0].y<box || this.#shakeBody[0].y>(this.#canvas.height-box*2)){
			this.gameOver();
		};
		return false;
		};
		
	gameOver(){
			console.log("game over");
		clearInterval(this.timerId);
		this.#button.style.display="block";
		this.#button.addEventListener("click",()=>{location.reload()});
		let previouScore=localStorage.getItem("score");
			if(previouScore==null){
			localStorage.setItem("score", this.#score);
		}
			else {
				if(this.#score>previouScore){
				localStorage.setItem("score", this.#score);
			}
		}
	}
}
class HTML{
	#canvas;
	#button;
	
	#p;
			 
	constructor(selector){
		this.#canvas=document.getElementById(selector);
		
		this.#button=document.querySelector("button");
		
		this.#p=document.querySelector("p");
		
	}
	getCanvas(){
			return this.#canvas;
		}
	getButton(){
		return this.#button;
	}
	
	
}

let draw=new Draw();

