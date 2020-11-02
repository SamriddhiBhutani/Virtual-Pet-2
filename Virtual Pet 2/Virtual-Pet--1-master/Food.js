class Food{
    constructor(){  
    
        this.image = loadImage("./images/Milk.png")
        this.foodStock = foodStock;
        this.lastFed = lastFed;
    }
    getFood(){
        var foodCounteRef = database.ref("/food");
        foodCounteRef.on("value",function(data){
            data.val();
        })
    }

    updateFood(food){
        database.ref("/").update({
            food: food
        })
    }

    deductFood(){

    }

    display(){
        var x = 80, y = 100;
        imageMode(CENTER);
        this.image(this.image,720,220,70,70);

        if(this.foodStock !== 0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30
            }
        }
    }
}