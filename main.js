var parent = document.getElementById('parent');
var child = document.getElementById('child');
child.style.paddingRight = child.offsetWidth - child.clientWidth + "px";



var mq = window.matchMedia( "(max-width: 1024px)" );
if (mq.matches) {
    // window width is at less than 570px
}
else {
    // window width is greater than 570px
    document.addEventListener("mousemove", function(event) {
      const x = event.pageX
      const y = event.pageY + 20

      const cursor = document.querySelector("div.cursor")

      cursor.style.left = x + "px"
      cursor.style.top = y + "px"
    })
}


function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM ";
    var zone = "EST";

    if(h == 0){
        h = 12;
    }

    if(h > 12){
        h = h - 12;
        session = "PM ";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session + zone;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();

var today = new Date();

var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();

if (day < 10) {
  day = '0' + day
}
if (month < 10) {
  month = '0' + month
}

var out = document.getElementById("date");

out.innerHTML = month + "." + day + "." + year;
