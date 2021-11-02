var img="";
objects=[];
status="";
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function modelLoaded(){
console.log("Model Loaded!")
status=true;

}
function preload(){
    var song=loadSound("mixkit-sound-alert-in-hall-1006.wav");
}
function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for (i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status: Object Detected";
            document.getElementById("objectNo").innerHTML="No. of Objects Detected are:"+ objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill(r,g,b);
            stroke("#b784a7");
            rect(objects[i].x,objects[i].y,objects[i].height,objects[i].width);
            if(object[i].label=="person"){
                document.getElementById("objectNo").innerHTML="Baby is in the Room";
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("objectNo").innerHTML="Baby is not in the room";
                console.log("play");
                song.play();
            }
        }
        if(object.length==0){
            document.getElementById("objectNo").innerHTML="Baby is not in the Room";
            console.log("play");
            song.play();
        }
    }

}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
}