document.getElementById("ver").innerHTML = "3.0";
document.getElementById('hour').addEventListener('change', () => {
    input_check('hour');
});

document.getElementById('minute').addEventListener('change', () => {
    input_check2('minute');
});

document.getElementById('secound').addEventListener('change', () => {
    input_check2('secound');
});

function input_check(object) {
    if(document.getElementById(object).value <= 0) {
        document.getElementById("error").innerHTML = "0以下の値に設定することはできません!";
        document.getElementById("start").setAttribute("disabled", true);
    } else {
        document.getElementById("error").innerHTML = "";
        document.getElementById("start").removeAttribute("disabled");
    }
}

function input_check2(object) {
    if(document.getElementById(object).value <= 0 || document.getElementById(object).value >= 60) {
        document.getElementById("error").innerHTML = "0以下の値または59以上に設定することはできません!";
        document.getElementById("start").setAttribute("disabled", true);
    } else {
        document.getElementById("error").innerHTML = "";
        document.getElementById("start").removeAttribute("disabled");
    }
}

function music_set() {
    music = new Audio('lv.mp3');
    music.load();
    start();
}

function start() {
    if(document.getElementById("hour").value === "") {
        if(document.getElementById("minute").value === "") {
            if(document.getElementById("secound").value === "") {
                document.getElementById("error").innerHTML = "時間が入力されていません!";
            } else {
                timer_set();
            }
        } else {
            timer_set();
        }
    } else {
        timer_set();
    }
}

let set_hour = 0
let set_minute = 0
let set_secound = 0
let repeat_count = 0;

function timer_set() {
    document.getElementById("error").innerHTML = "";
    set_hour = Number(document.getElementById("hour").value);
    set_minute = Number(document.getElementById("minute").value);
    set_secound = Number(document.getElementById("secound").value);
    total_time1 = set_hour * 60 * 60;
    total_time2 = set_minute * 60;
    total_time = total_time1 + total_time2 + set_secound;

    if(set_hour >= 1) {
        document.getElementById("nokori_hour").innerHTML = set_hour;
    }
    if(set_minute >= 1) {
        document.getElementById("nokori_minute").innerHTML = set_minute;
    }
    if(set_secound >= 1) {
        document.getElementById("nokori_secound").innerHTML = set_secound;
    }

    console.log(total_time);
    // console.log(total_time1);
    // console.log(total_time2);
    // console.log(set_secound);
    // console.log(set_hour);
    // console.log(set_minute);
    // console.log(set_secound);
    timer = total_time - 1;
    document.getElementById("start").setAttribute("disabled", true);
    document.getElementById("reset").removeAttribute("disabled");
    document.getElementById("stop").removeAttribute("disabled");
    nowtime = 0
    timer_start();
}

function timer_start() {
    timerId = setInterval(function(){
        document.getElementById("start").setAttribute("disabled", true);
        set1 = timer / 60 / 60;
        set2 = timer / 60 % 60;
        set3 = timer % 60;
        // document.getElementById("nokori_secound").innerHTML = set1;
        console.log(timer);
        document.getElementById("nokori_hour").innerHTML = Math.floor(set1);
        document.getElementById("nokori_minute").innerHTML = Math.floor(set2);
        document.getElementById("nokori_secound").innerHTML = set3;
        nowtime++;
        progress = nowtime / total_time * 100;
        document.getElementById("bar").value = progress;
        if(--timer < 0){ 
            clearInterval(timerId)
            music.play();
            start();
            repeat_count++;
            document.getElementById("repeat_count").innerHTML = repeat_count;
        }
    }, 1000)
}

function stop() {
    clearInterval(timerId)
    document.getElementById("stop").innerHTML = "リスタート";
    document.getElementById("stop").setAttribute("onclick", "play()");
}

function play() {
    timer_start();
    document.getElementById("stop").innerHTML = "ストップ";
    document.getElementById("stop").setAttribute("onclick", "stop()");
}

function reset() {
    clearInterval(timerId);
    document.getElementById("start").removeAttribute("disabled");
    document.getElementById("nokori_hour").innerHTML = "0";
    document.getElementById("nokori_minute").innerHTML = "0";
    document.getElementById("nokori_secound").innerHTML = "0";
    repeat_count = 0;
    document.getElementById("repeat_count").innerHTML = repeat_count;
    document.getElementById("stop").setAttribute("disabled", true);
    document.getElementById("reset").setAttribute("disabled", true);
    document.getElementById("stop").innerHTML = "ストップ";
    document.getElementById("stop").setAttribute("onclick", "stop()");
    document.getElementById("bar").value = 0;
    progress = 0;
}

function clear_data() {
    document.getElementById("hour").value = '';
    document.getElementById("minute").value = '';
    document.getElementById("secound").value = '';
}