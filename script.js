

var casted=false;
var myItems=new Array(0);
var activeBoxID;
var activeSpellID;
var coreItemID;
var myLatLng = {lat: 15.363, lng: -31.044};
var marker;

function initialize(){
  dragAndDropInit();
  selectableInit();
  showMoon();
  initMap();
}


function dragAndDropInit(){

  //Make word windowed modules draggable
/*  $( function() {
    $( ".window" ).draggable();

  } );*/

  $( function() {
    $( ".item" ).draggable({
      helper: "clone" ,
      appendTo: '#box1',
      start: function(e, ui)
      {
       $(ui.helper).css("border", "solid var(--main-thickness) var(--main-border-color)");
      }
    });
  } );

  $( "#box1" ).droppable({
    accept:'.item',
    drop: function (event, ui) {

      $("#cauldronInstruction").remove();
      //var myClone=$( ui.draggable ).clone()
      var myClone=document.createElement("div");
      var icon = $(ui.draggable).children('img');
      $(myClone).append(icon.clone());
      $(myClone).attr('id', $(ui.draggable).attr('id'));
      $( myClone ).addClass( "itemActive" );
      $( myClone ).addClass( "ui-selected" );



       var button=document.createElement("p");
       button.innerHTML="X";
       $( button ).addClass( "xButton" );
       $(myClone).append(button);

      $('.ui-selected').removeClass("ui-selected");


      $('#box1').append(myClone);
      createNewObject(myClone, $(myClone).attr('id'));
      unselectItem();
      selectItem($(myClone).attr('id'));
      //Scroll to bottom of div
      var objDiv = document.getElementById("box1");
      objDiv.scrollTop = objDiv.scrollHeight;

      if (coreItemID==null){
        coreItemID=$(myClone).attr('id');
        $( "#"+coreItemID ).addClass( "core-item" );
      }

    }
  });

  $( "#box1" ).selectable({
    selected: function( event, ui ) {},
    create: function( event, ui ) {
    }
  });

}

function selectableInit(){
  $(function() {



    $( "#box1" ).selectable({
      stop: function( event, ui ) {
        selectItem($('.ui-selected').attr('id'));
      },
      unselected: function( event, ui ) {
        unselectItem();
      },
    });

  });
}


  function initMap() {

    var map = new google.maps.Map(document.getElementById('myMap'), {
      zoom: 1,
      center: myLatLng,
      disableDefaultUI: true,
      styles: [
        {
        elementType: 'geometry',
        stylers: [{color: '#f5f5f5'}]
      },
      {
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{color: '#616161'}]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{color: '#f5f5f5'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{color: '#bdbdbd'}]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{color: '#eeeeee'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#757575'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#e5e5e5'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [{color: '#757575'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#dadada'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#616161'}]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#e5e5e5'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{color: '#eeeeee'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#c9c9c9'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      }
          ]
    });

    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'My Point'
    });

    map.addListener('center_changed', function() {
   // 3 seconds after the center of the map has changed, pan back to the
   // marker.
   window.setTimeout(function() {
     map.panTo(marker.getPosition());
   }, 100000);
 });

     map.addListener('dblclick', function(e) {
       marker.setMap(null);

    marker = new google.maps.Marker({
      position: e.latLng,
      map: map,
      title: 'Hello World!'
    });
    myLatLng=e.latLng;
    });

    google.maps.event.addListener(marker,'click',function() {
    map.setZoom(9);
    map.setCenter(marker.getPosition());
    });
  }



//Close the welcome pop-up
function newSpell(){
  document.getElementById("popup").remove();
  document.getElementById("overlay").remove();
  document.getElementById("ui-submit").style.display="block";
  document.getElementById("rando").style.display="block";
  document.getElementById("ui-play").style.display="block";
  document.getElementById("cauldronInstruction").style.display="block";
  document.getElementById("intentionBoxContainer").style.display="none";
  document.getElementById("box2Container").style.display="block";
  document.getElementById("selectable").style.display="block";
  $('#myTextarea').prop('placeholder', 'Write your spell here');
}

function premadeSpell(){
  document.getElementById("popup").remove();
  document.getElementById("overlay").remove();
  document.getElementById("selectable").style.display="block";
  document.getElementById("ui-submit").style.display="block";
  document.getElementById("ui-play").style.display="block";
  document.getElementById("cauldronInstruction").style.display="block";
  document.getElementById("intentionBoxContainer").style.display="none";
  document.getElementById("box2Container").style.display="block";
  $('#myTextarea').prop('placeholder', 'Write your spell here');
  $( "#hexUrEx" ).addClass( "ui-selected" );
  selectSpell($(".ui-selected").attr('id')) ;
}

function submitIntentions(){
  document.getElementById("ui-play").style.display="block";
  document.getElementById("cauldronInstruction").style.display="block";
  document.getElementById("box2Container").style.display="block";
  document.getElementById("intentionBoxContainer").remove();
  document.getElementById("ui-intentions").remove();

  for (var i=0; i<wordObjects.length; i++){
    document.getElementById("word"+i).style.fontWeight = "normal";
  }
}

//This function keeps track of the text and item associted with each spell
function selectSpell(spellID){
  document.getElementById("box1").innerHTML = '';
  activeSpellID=spellID;
  var placeholderText="";
  var cauldronItem;


  switch (activeSpellID){
    case "hexUrEx":
    placeholderText="There has been unfairness done to me\r\nI summon the elements\r\nI invoke them\r\nI conjure them to do my bidding\r\nThe four watchtowers whall lay their eyes and minds\r\nthere shall be fear and guilt and bad blood\r\nthere shall be submission and no pity\r\nI point the threefold law against thee\r\nagainst thee it shall be pointed\r\nthreefold, a hundred fold is the cost for my anger and pain\r\nThee shall be blinded by the fear\r\nblinded by the pain\r\nblinded by me\r\nbinded by me\r\nCursed by me\r\nSo mote it be!";
    cauldronItem="link"
    break;
    case "cleanseFile":
    placeholderText="From this file I release \r\nAll energy which is no longer \r\nin service to my greatest good. \r\nI cleanse all evil from its code \r\nand banish away malice from its source.";
    cauldronItem="file"
    break;
    case "luckSpell":
    placeholderText="Great Goddess, in casting this spell I summon love, harmony, peace, and prosperity into these geographical coordinates.\r\n \r\n May we be blessed with good health, happiness, success, laughter and abundance. May those who visit feel peace, light heartedness and love. \r\n\r\n I decree that this location is now shielded from harm, illness, negativity or misfortune. With tremendous gratitude, we thank you for your blessings. In full faith, with harm to none, and the greatest good for all. So it is!";
    cauldronItem="place"
    break;
    case "whatvr":
    placeholderText="By the power of the moon and positivity\r\nBring now to me wealth & rosperity\r\nBring forth to me\r\nWith harm to none\r\nSo mote it be";
    cauldronItem="infinity"
    break;
    case "aaaa":
    placeholderText="Burst forth the sun, her billowing rays\r\nSend her blessing of revealing\r\nThe day and its secrets uncovered through her\r\nThe visions of what once has happened\r\nOf what will come to pass\r\nFor myself and those whom I seek divination for\r\nGrant me the visions of day\r\nThrough waking dream show me\r\nThe past, present and future.";
    cauldronItem="time"
    break;
  }

  document.getElementById("myTextarea").value=placeholderText;

//Append the item to the box
  $("#cauldronInstruction").remove();
  //var myClone=$( ui.draggable ).clone()
  var myClone=document.createElement("div");
  var icon = $("#"+cauldronItem).children('img');
  $(myClone).append(icon.clone());
  $(myClone).attr('id', cauldronItem);
//  $(myClone).attr('id')=$(ui.draggable).attr('id');
  //  $(myClone).removeClass();
  //$("myClone div:first-of-type").remove();
  $( myClone ).addClass( "itemActive" );
  $( myClone ).addClass( "ui-selected" );
  $('#box1').append(myClone);
  createNewObject(myClone, "id"); //Edit this to match the actual id of the object im creating
  unselectItem();
  selectItem($(myClone).attr('id'));
  coreItemID=$(myClone).attr('id');
  $( "#"+coreItemID ).addClass( "core-item" );
  //Scroll to bottom of div
  var objDiv = document.getElementById("box1");
  objDiv.scrollTop = objDiv.scrollHeight;

}



//Show helper window for each acive spell item
function selectItem(ItemID){
  if (activeBoxID!= null)
  document.getElementById(activeBoxID).style.display="none";
  activeBoxID= ItemID+"Box";
  document.getElementById(activeBoxID).style.display="block";
}

function unselectItem(){
  if (activeBoxID!= null)
  document.getElementById(activeBoxID).style.display="none";
}


function loadWebsite() {
    document.getElementById("browserWindow").setAttribute("src", "http://www.google.com");
}


function randomizeSpell(){
  var  randomVal = Math.floor(Math.random() * 5)+1;
  console.log(randomVal);

  switch (randomVal){
    case 1:
      selectSpell("hexUrEx");
      break;
    case 2:
      selectSpell("cleanseFile");
      break;
    case 3:
      selectSpell("luckSpell");
      break;
    case 4:
      selectSpell("whatvr");
      break;
    case 5:
      selectSpell("aaaa");
      break;

  }

}

//-------- READING FUNCTIONS ---------


var currentMood;

function play(){
  casted=true;
  document.getElementById("myCanvas").style.zIndex="200";
  currentMood=0;
  var text="";
  for (var i = 0; i < wordObjects.length; i++){
    if (wordObjects[i].text.includes("<br>")){
    } else {
      text=text.concat(wordObjects[i].text+" ");
    }

  }
  document.getElementById("ui-play").style.display="none";
    document.getElementById("ui-submit").style.display="none";
      document.getElementById("ui-intentions").style.display="none";
  document.getElementById("ui-back").style.display="block";
  document.getElementById("blockchain").style.zIndex="100";


  wordInit();
  initialize();
  console.log(wordObjects.length);
  //responsiveVoice.speak(text,"UK English Female", {rate: 0.7});


  setParams();
}

function back(){
  casted=false;
  document.getElementById("myCanvas").style.zIndex="-200";
document.getElementById("ui-play").style.display="block";
document.getElementById("ui-back").style.display="none";
document.getElementById("blockchain").style.zIndex="-100";
}


//
