nose_x = 0;
nose_y = 0;
diffrence = 0;
right_wrist_x = 0;
left_wrist_x = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);
    video.position(10, 110)

    canvas = createCanvas(550, 420);
    canvas.position(1000, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Pose Net is initialized");
}

function gotPoses(results){
    if(results){
        console.log(results);
    }
    nose_x = results[0].pose.nose.x;
    nose_y = results[0].pose.nose.y;
    console.log("noseX = " + nose_x + "noseY = " + nose_y);

    right_wrist_x = results[0].pose.rightWrist.x;
    left_wrist_x = results[0].pose.leftWrist.x;
    diffrence = floor(left_wrist_x - right_wrist_x);
    console.log("Left wrist x = " + left_wrist_x + "right wrist x = " + right_wrist_x + "diffrence = " + diffrence);
}

function draw(){
    word = document.getElementById("text").value;
    background("#FFFFFF");
    document.getElementById("square_side").innerHTML = "width and height of the text is " + diffrence + "px.";
    fill(255, 0, 0);
    stroke(255, 255, 255);
    text(word, nose_x, nose_y);
    textSize(diffrence);
}
