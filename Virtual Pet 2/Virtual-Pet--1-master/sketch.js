var dog, happydog, image1, image2, database, foodS, foodStock;
var lastFed, fedTime;
var foodObj;

function preload()
{
  //load images here
  image1 = loadImage("images/Dog.png");
  image2 = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(220,300,10,10);
  dog.addImage(image1);
  dog.scale = 0.25;
  
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  foodObj = new Food();

  feed = createButton("Feed Your Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}


function draw() {  
  background(46,139,87);
     drawSprites();
    fill ("orange")
    textSize(15)
    text ("Food Remaining: "+ foodS, 100,170);

    foodObj.display();

    fedTime = database.ref("FeedTime");
    fedTime.on("value",function(data){
      lastFed = data.val();
    })

    fill(255,255,254);
    textSize(15);
    if(lastFed >= 12){
      text("Last Feed: "+lastFed%12 + " PM", 350,30);
    } 
    else if(lasstFed === 0){
      text("Last Feed : 12 AM", 350, 30);
    }
    else{
      text("Last Feed: "+ lastFed + " AM", 350, 30);
    }
  }

  function addFoods(){
    foodS ++;
    database.ref("/").update({
      Food: foodS
    })
  }

  function feedDog(){
    dog.addImage(happydog);

    foodObj.updateFood(foodObj.getFood()-1);
    database.ref("/").update({
      Food: foodObj.getFood(),
      FeedTime: hour()

    })
  }

  function readStock(data){
    foodS = data.val();
  }

  function writeStock(x){
    if(x<=0){
      x=0;
    }
    else{
      x=x-1;
    }

    database.ref('/').update({
      Food: x
    })
  }
