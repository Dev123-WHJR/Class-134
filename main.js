img = "";
status = "";
objects = [];


function preload()
{
   
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    //video.center();
}

function modelLoaded()
{
    console.log("Model Loaded!!!11")
    status = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}



function draw()
{
    image(video, 0, 0, 380, 380);

    if (status != "")
    {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);

        for (i =0;  i < objects.length; i++) 
        {
        
        document.getElementById("status").innerHTML = "Status: Detected Objects";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected = " + objects.length;

        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }

    }
//Old code
    //fill("#FF0000");
    //text("Dog", 45, 75);
    //noFill();
    //stroke("#FF0000");
    //rect(30, 60, 450, 350);

    //fill("#FF0000");
    //text("Cat", 320, 120);
    //noFill();
    //stroke("#FF0000");
    //rect(300, 90, 270, 320);
}
