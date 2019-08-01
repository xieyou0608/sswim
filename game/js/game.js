// start the game
var score = 0;
var ans;
var tt;
var numQuestion = 1;
var questions = {};
var name;
/*
const URL = "https://script.google.com/macros/s/AKfycbwgJiyfx57cqCtpPxBcie5AqjYONmhSnu-CfBVt8KSKfpFkibE/exec"
            "https://script.google.com/macros/s/AKfycbxVjS6iapa01z0jew2Cvd87q6GXcylEqNDcF8vjgx2CJ5R2WZ8s/exec"
            "https://script.google.com/macros/s/AKfycbwgJiyfx57cqCtpPxBcie5AqjYONmhSnu-CfBVt8KSKfpFkibE/exec"*/
const getURL = "https://script.google.com/macros/s/AKfycbxKXjhn8KHFuHl4ypvohceNVWjDc7Z7Bbc2OrbFQNNSLtHZBBZ_/exec"
const postURL = "https://script.google.com/macros/s/AKfycbxVjS6iapa01z0jew2Cvd87q6GXcylEqNDcF8vjgx2CJ5R2WZ8s/exec"


function restart() {
    $("#loader").show();
    $("#bg-blur").show();

    // get 5 different numbers
    var number = [];
    for (i = 0; i < 5; i++){
        var temp = Math.floor((Math.random() * 5) + 2);
        while (number.includes(temp) == true)
        {
            temp = Math.floor((Math.random() * 5) + 2);
        }
        number[i] = temp;
    }

    var k = 0;
    for (i = 0; i < 5; i++) {
        var num = number[i];
        // console.log(num);
        var data = {
            number: num,
        }

        $.ajax({
            type: "get",
            url: "https://script.google.com/macros/s/AKfycbxKXjhn8KHFuHl4ypvohceNVWjDc7Z7Bbc2OrbFQNNSLtHZBBZ_/exec",
            dataType: 'json',
            data: data,
            success: function(data) {
                k++;
                questions[k] = data;
                // console.log(data);
                if (k == 1) {
                    // console.log(questions);
                    $(".option").removeAttr("disabled");
                    numQuestion = 1;
                    score = 0;
                    $("#loader").hide();
                    $("#bg-blur").hide();
                    $("#score").html("分數：0");
                    start(1);
                }
                else if (k == 5) {
                    console.log(questions);
                }
            },
            error: function(e){
                console.log(e);
            }
        });
    }

}

function endGame(){
    $(".alert").hide();
    // display the result to users
    $(".alert:eq(1)").fadeIn()
                     .html("遊戲結束！恭喜你獲得" + score + "分。" + "<button type=\"button\" class=\"btn btn-link\" onclick=restart()>再玩一次</button>");
    $("#restart").show();
    // send result to google sheet
    var data = {
        name: name,
        score: score,
    }
    $.ajax({
        type: "get",
        url: "https://script.google.com/macros/s/AKfycbxVjS6iapa01z0jew2Cvd87q6GXcylEqNDcF8vjgx2CJ5R2WZ8s/exec",
        data: data,
        dataType: 'json',
        error: function(e) {
            console.log(e);
        }
    });
    var firebaseData = {}
    firebaseData[name] = score
    endGameSendData(firebaseData)
}

function start(k) {
    var time = 8;
    ans = questions[k].ans.charAt(3);

    $(".alert").hide();
    $("#timer").html("時間還剩8秒鐘")
               .css("color", "black");
    $("#question").html(questions[k].question);
    for (var i = 0; i < 4; i++) {
        $(".option:eq(" + i + ")").html(questions[k].opt[i]);
    }
    $("#cate").html(questions[k].cate);
        
    tt = setInterval(function() {
        time--;
        if (time < 0) {
            $(".alert:eq(0)").fadeIn();
            $(".alert:eq(0)").html("時間到！");
            $(".option").attr("disabled", "true");

            clearInterval(tt);

            setTimeout(function() {
                $(".alert:eq(0)").fadeOut();
                if (k + 1 <= 5) {
                    $(".option").removeAttr("disabled");
                    numQuestion = k + 1;
                    start(k + 1);
                }
                else
                {
                    endGame();
                }
            }, 2000);
        }
        else
        {
            $("#timer").html("時間還剩" + time + "秒鐘");
            if (time == 3) {
                $("#timer").css("color", "orange");
            }
            else if (time == 2) {
                $("#timer").css("color", "purple");
            }
            else if (time == 1) {
                $("#timer").css("color", "red");
            }
        }
    }, 1000);
}

// ansering
$(".option").click(function(){
    // console.log($(this).attr("data-id"));
    $(this).removeClass("bg-primary");

    // correct
    if ($(this).attr("data-id") == ans) {
        $(this).addClass("btn-success");
        $(".alert:eq(1)").fadeIn()
                         .html("答對了！！！");
        score++;
    }
    // incorrect
    else
    {
        $(".alert:eq(0)").fadeIn()
                         .html("答錯了...");
        $(this).addClass("btn-danger");
    }

    $("#score").html("分數：" + score);
    $(".option").attr("disabled", "true");
    clearInterval(tt);
    setTimeout(function() {
        $(".option").removeClass("btn-success btn-danger")
                    .addClass("btn-primary");
        if (numQuestion + 1 <= 5) 
        {
            numQuestion++;
            $(".option").removeAttr("disabled");
            start(numQuestion);
        }
        else
        {
            clearInterval(tt);
            endGame();
        }
    }, 2000);
});

// prepare the game
$("#button-addon2").click(function() {
    // Get the questions
    $(".alert:eq(0)").hide();
    
    name = $("#start-game-btn>input").val();
    if (name.length == 0) {
        $(".alert:eq(0)").fadeIn();
        $(".alert:eq(0)").html("請先填寫真實姓名");
        return;
    }
    $("#name").html(name);

    // get 5 different numbers
    var number = [];
    for (i = 0; i < 5; i++){
        var temp = Math.floor(Math.random() * 5) + 2;
        while (number.includes(temp) == true)
        {
            temp = Math.floor(Math.random() * 5) + 2;
        }
        number[i] = temp;
    }

    var k = 0;
    for (i = 0; i < 5; i++) {
        var num = number[i];
        var data = {
            number: num,
        }

        $.ajax({
            type: "get",
            url: "https://script.google.com/macros/s/AKfycbxKXjhn8KHFuHl4ypvohceNVWjDc7Z7Bbc2OrbFQNNSLtHZBBZ_/exec",
            dataType: 'json',
            data: data,
            success: function(data) {
                k++;
                questions[k] = data;
                if (k == 1) {
                    // console.log(questions);
                    $(".option").removeAttr("disabled");
                    $("#loader").hide();
                    $("#bg-blur").hide();
                    start(1);
                }
                else if (k == 5) {
                    console.log(questions);
                }
            },
            error: function(e){
                console.log(e);
            }
        });
    }

    $("#game-shape").fadeIn();
    $("#loader").show();
    $("#bg-blur").show();
    $(".option").attr("disabled", "true");
    $("#start-game-btn").hide();
});