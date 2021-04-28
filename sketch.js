//Create variables here
var dog,happyDog,database,foodS=20,foodStock;


var feed,addbottle;

var lastTime,lastFeed=0;
var foodObj;

function preload()
{
	happyDog=loadImage("images/dogImg1.png");
}

function setup() {
 database=firebase.database(); 
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  database.ref('/').update({ Food : 20});
	createCanvas(800, 500);
  dog=createSprite(500,200,20,20);
  dog.addImage(loadImage("images/dogImg.png"));
  dog.scale=0.18;

  feed=createButton("Feed the Dog");
  feed.position(400,95);
  feed.mousePressed(feedDog);

  addbottle=createButton("Add Milk");
  addbottle.position(700,95);
  addbottle.mousePressed(addMilkBottle);

  foodObj=new Food(20);
  
}


function draw() {  

  background(120);
  
  /*if(keyWentDown("UP_ARROW"))
  {
    writeStock(foodS);
  }*/
  lastTime=database.ref('LastFed/LastFed');
  lastTime.on("value",function(data)
  {
    lastFeed=data.val();
  });

  foodObj.display();

  drawSprites();
  fill("red");
  textSize(20);
  text("Food Left :"+ foodS,200,100);

  if(lastFeed>12)
  {
    text("Last Fed: "+(lastFeed-12)+" PM",200,400);
  }
  else if(lastFeed<=12)
  {
    text("Last Fed: "+(lastFeed)+" AM",200,400);
  }
  
}

function readStock(data)
{
  foodS=data.val();
}

/*function writeStock(x)
{
  if(x<=0)
  {
    x=0;
  }
  else
    x=x-1;
  database.ref('/').update({ Food : x});
}*/

function addMilkBottle()
{
  foodS++;
  database.ref('/').update(
    {
      Food:foodS
    }
  );
  time=hour();
  database.ref('LastFed').update(
    {
      LastFed:time
    }
  );
  foodObj.updateFoodStock(foodS);
}

function feedDog()
{
  foodS--;
  if(foodS<=0)
  {
    foodS=0;
  }
  database.ref('/').update(
    {
      Food:foodS
    }
  );
  dog.addImage(happyDog);
  foodObj.deductFood();
}

