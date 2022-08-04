noseX=0;
noseY=0;
leftwristX=0;
rightwristX=0;
difference=0;

function setup(){
    video=createCapture(VIDEO);
    video.size(550,500);
    canvas=createCanvas(550,550);
    canvas.position(560,150);
    poseNet=ml5.poseNet(video,model_loaded);
    poseNet.on('pose',gotPoses);
}

function model_loaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        console.log("noseX="+noseX+",noseY="+noseY);
        leftwristX=results[0].pose.leftWrist.x;
        rightwristX=results[0].pose.rightWrist.x;
        difference=floor(leftwristX-rightwristX);
        console.log("leftwristX="+leftwristX+",rightwristX="+rightwristX+",difference="+difference);
    }
}

function draw(){
    background("#fc9803");
    fill("#1703fc");
    stroke("#1703fc");
    square(noseX,noseY,difference);
    document.getElementById("square_side").innerHTML="Size of square will be ="+difference+"px";
}