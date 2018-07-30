
var phase;
var phaseName;
var currentDate;

//getMoonPhase function was found on https://gist.github.com/endel/dfe6bb2fbe679781948c
function getMoonPhase(year, month, day)
{


    var c = e = jd = b = 0;

    if (month < 3) {
        year--;
        month += 12;
    }

    ++month;

    c = 365.25 * year;

    e = 30.6 * month;

    jd = c + e + day - 694039.09; //jd is total days elapsed

    jd /= 29.5305882; //divide by the moon cycle

    b = parseInt(jd); //int(jd) -> b, take integer part of jd

    jd -= b; //subtract integer part to leave fractional part of original jd

    b = Math.round(jd * 8); //scale fraction from 0-8 and round

    if (b >= 8 ) {
        b = 0; //0 and 8 are the same so turn 8 into 0
    }

    // 0 => New Moon
    // 1 => Waxing Crescent Moon
    // 2 => First Quarter Moon
    // 3 => Waxing Gibbous Moon
    // 4 => Full Moon
    // 5 => Waning Gibbous Moon
    // 6 => Last Quarter Moon
    // 7 => Waning Crescent Moon



    return b;
}

function getTodaysPhase(){

  var d = new Date();
  phase = getMoonPhase(d.getFullYear(), d.getMonth()+1, d.getDate());



      var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";


    currentDate=month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear();

      return phase
}


function getPhaseName(){
  switch(phase){
    case 0:
    phaseName="New Moon";
    break;
    case 1:
    phaseName="Waxing Crescent Moon";
    break;
    case 2:
    phaseName="First Quarter Moon";
    break;
    case 3:
    phaseName="Waxing Gibbous Moon";
    break;
    case 4:
    phaseName="Full Moon";
    break;
    case 5:
    phaseName="Waning Gibbous Moon";
    break;
    case 6:
    phaseName="Last Quarter Moon";
    break;
    case 7:
    phaseName="Waning Crescent Moon";
    break;
  }
  return phaseName;
}

function showMoon(){
  getTodaysPhase();
  var image = document.getElementById("moon");
  image.src = "moon/"+phase+".svg"
  document.getElementById("moonPhase").innerHTML=currentDate+" - <b>"+getPhaseName();;

  $("#header2").hover(function(){
    $("#moon").css("display", "none");
    $("#moonPhase").css("display", "inline-block");
    }, function(){
      $("#moon").css("display", "inline-block");
      $("#moonPhase").css("display", "none");
  });
}
