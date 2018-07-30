
//-------- WORD MANAGEMENT / WRITING FUNCTIONS ---------

var wordObjects=new Array(0);;

//Submit and process text from textarea, Replace next line by space and line breaks
function submitText(){
  wordObjects=new Array(0);
  myItems=new Array(0);
  wordInit();
  initialize();
  document.getElementById("ui-submit").remove();
  document.getElementById("intentionBox").style.display="block";
  document.getElementById("ui-intentions").style.display="block";
  document.getElementById("selectable").style.display="none";
    document.getElementById("display").style.zIndex="2";
}


function dropOnWordInit(){


    //Make emotion modifiers draggable, make the words droppable
    $( function() {
      $( "#joy" ).draggable({
        helper: "clone" ,
         start: function(e, ui)
         {
          //Add the id of the modifier so the clone can keep the right style
          $(ui.helper).attr('id', 'joy');
         }
      });
      $( "#sorrow" ).draggable({
        helper: "clone" ,
         start: function(e, ui)
         {
          $(ui.helper).attr('id', 'sorrow');
         }
      });
      $( "#anger" ).draggable({
        helper: "clone" ,
         start: function(e, ui)
         {
          $(ui.helper).attr('id', 'anger');
         }
      });


      //Make the words droppable
      $( ".word" ).droppable({
        classes: {
          "ui-droppable-hover": "ui-state-hover" //Hover state
        },
        drop: function( event, ui ) {
          //Change result depending on the draggable that has been dropped
          var currentId = $(ui.draggable).attr('id');
          removeWordEmotionStyle($( this ));

          if(currentId == "sorrow"){
              $( this ).addClass( "ui-state-highlight-sorrow" )
            } else if(currentId == "joy"){
              $( this ).addClass( "ui-state-highlight-joy" )
            } else if(currentId == "anger"){
              $( this ).addClass( "ui-state-highlight-anger" )
            }



        }

      });
    } );



}


/* HOW DO WORDS WORK?

- The textarea is converted into an array of wordValues
- These words are then converted into word "objects"
- All word objects are pushed in order into the wordObjects array
- Each word has a .toString, which creates a DOM element: a span of class "word" and of id "wordi"
- i represents the location of the word in the wordObjects array
*/





//clear all classes from droppable words
function removeWordEmotionStyle( object){
  object.removeClass( "ui-state-highlight-sorrow ui-state-highlight-joy ui-state-highlight-anger" );
}

function wordInit(){
  //retrieve submitted text from textarea
  var textAreaValue = document.getElementById("myTextarea").value;
  textAreaValue = textAreaValue.replace(/\r?\n/g, '  <br> '); //replace enter by line breaks
  //Take text from textarea and split it into an array of words
  var wordArray = textAreaValue.split(" ");
  var displayText="";
  //For each word, create a word "object"
  for (var i = 0; i < wordArray.length; i++){
    var currentWord=wordArray[i];
    var myWord = createNewWord(currentWord, i);
    displayText = displayText.concat(myWord.toString);
  }
  //Display the text
  document.getElementById("display").innerHTML = displayText;

  /*//Take all words of all paragraphs, and split them into spans
  var wordAnchors = document.getElementsByTagName('p');
  for(var i=0; i < wordAnchors.length; i++) {
      var t = wordAnchors[i];
      t.innerHTML = '<span class="word">' + t.innerHTML . split(' ') . join('</span> <span class="word">') +  '</span>';
  }*/

}


//Creates a word and pushes it into my word object array
function createNewWord(word, i) {
  var obj = {};
  //A word object contains the following variables:
  obj.text = word; //word.text holds the text value of the word
  obj.id=i; //Keep track of location in the wordObjects array
  obj.open=false; //word.open is a boolean describing if its window is opened or not
  obj.hasModule=false; //Indicates the the module has been initialized for this word
  obj.toString = '<span class="word" id=word'+i+' onclick="openCloseModule('+i+')">' + word + ' </span>'
  obj.anger=0;
  obj.sorrow=0;
  obj.joy=0;
  //Onclick function opens window
  wordObjects.push(obj);
  return obj;
}

function createNewObject(object, i) {
  var obj = {};
  //A word object contains the following variables:
  obj.text = object; //word.text holds the text value of the word
  obj.id=i; //Keep track of location in the wordObjects array
  obj.value="";
  //Onclick function opens window
  myItems.push(obj);
  return obj;
}


function openCloseModule(id){
  var myWord = wordObjects[id];
  if (!myWord.open&&!myWord.hasModule){
    createDiv();
    myWord.open=true;
    document.getElementById("word"+id).style.fontWeight = "bold";
  } else if(!myWord.open){
    document.getElementById("mod"+id).style.display="block";
    myWord.open=true;
    document.getElementById("word"+id).style.fontWeight = "bold";
  }
  else{
    document.getElementById("mod"+id).style.display="none";
    myWord.open=false;
    document.getElementById("word"+id).style.fontWeight = "normal";
  }

  function createDiv(){
    var title ='<h1 id="title'+id+'">'+myWord.text+'</h1>';
        var ticks='<datalist id="tickmarks"> <option value="0" label="0%">  <option value="1">  <option value="2">  <option value="3"> </datalist>';
        var x='<p id="closeButton" onclick="openCloseModule('+id+')">X</p>';
    var label1="<p>Sorrow</p>";
    var label2="<p>Anger</p>";
    var label3="<p>Joy</p>";
    var sliderSorrow='<input type="range" min="0" max="3" value="0" class="slider"  id=sorrowSlider'+id+' list="tickmarks" step="1" onchange="updateEmotion('+id+')"><br>';
    var sliderAnger='<input type="range" min="0" max="3" value="0" class="slider" id=angerSlider'+id+' list="tickmarks" step="1" onchange="updateEmotion('+id+')"><br>';
    var sliderJoy='<input type="range" min="0" max="3" value="0" list="tickmarks" class="slider" id=joySlider'+id+' step="1" onchange="updateEmotion('+id+')"><br>';
    var divGuts=x+title+label1+sliderSorrow+ticks+label2+sliderAnger+label3+sliderJoy;
    var div = document.createElement('div');
    div.className = 'ui-word-module window';
    div.id = "mod"+id;
    document.getElementById("intentionBoxContainer").appendChild(div);
    //$( ".window" ).draggable();
    div.innerHTML = divGuts;
    myWord.hasModule=true;
  }

}

function updateEmotion(id){
  var myObject = wordObjects[id];
  myObject.sorrow = document.getElementById("sorrowSlider"+id).value;
  myObject.anger = document.getElementById("angerSlider"+id).value;
  myObject.joy = document.getElementById("joySlider"+id).value;
  var r=myObject.anger*80;
  var g=myObject.joy*80;
  var b=myObject.sorrow*80;
  document.getElementById("word"+id).style.color='rgb('+r+','+g+','+b+')';
  document.getElementById("title"+id).style.color='rgb('+r+','+g+','+b+')';
}
