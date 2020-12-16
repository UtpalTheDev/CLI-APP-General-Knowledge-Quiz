var readlineSync= require('readline-sync');  
const color = require('colors');    //color module
//const audio = require('@replit/audio');
var fs=require('fs');    //file module
var vm2=require('./question.js'); 
var emoji=require('node-emoji')
const delay = require('delay');

var score=0;   //score variable initialization



//Intial text section
var username=readlineSync.question(color.bold.brightCyan(emoji.get('koala')," Hi,what is your name?\n")); //starting line
if(username.length>=3)
{
  while(true)
  {
  
      console.log(emoji.get('koala'),color.bold.brightYellow(" Welcome",username,"to this GK quiz\nLets start"));
      //console.log("lets start\n");
      console.log(color.bold.brightRed("************************************************"));

      //loop section for questions
      for(var i=0;i<vm2.array.length;i++){              // access objects through array
        qs(vm2.array[i].question,vm2.array[i].answer);   //vm2 helps to access question from question.js
      }                                                

      console.log(emoji.get('koala'),color.bold.brightYellow(" Total score",score));   //last score
      console.log(color.bold.brightYellow(" Thanks for participation\n")); //last line
/*
      //audio   
      (async () => {
        const source = await audio.playFile({filePath: './c.mp3'});
        await delay(10000); 
      })();
      */

      /* trying to fix async call in above
      async function song(){
        const source = await audio.playFile({filePath: './c.mp3'});
         //await delay(10000); 
      } 
      
      song();
*/
   
      //medals and appreciation section
      function expression(score)
      {
        switch(score)
        {

          case 1:console.log(color.bold.brightMagenta("\nGood going ",emoji.get('smiley')));
                  break;
          case 2:console.log(color.bold.brightMagenta("\nYou can do it,yeah ",emoji.get('left-facing_fist')));
                  break;
          case 3:console.log(color.bold.brightMagenta("\nYeah dude",emoji.get('clap')));
                  break;
          case 4:console.log(color.bold.brightMagenta("\nNice"));
                  break;
          case 5:console.log(color.bold.brightMagenta("\nBangon",emoji.get('muscle')));
                  break;
          case 6:console.log(color.bold.brightMagenta("\nOOOhhh wow ",emoji.get('astonished')));
                break;
          case 7:console.log(color.bold.brightMagenta("\nYou are very close"));
                break;
          case 8:console.log(color.bold.brightMagenta("\nAmazing you got ",emoji.get('third_place_medal')));
                break;
          case 9:console.log(color.bold.brightMagenta("\nMind Blowing you got ",emoji.get('second_place_medal')));
                break;
          case 10:console.log(color.bold.brightMagenta("\nCongrats you have reached high score\nLets have some party ",emoji.get('drum_with_drumsticks'),emoji.get('clinking_glasses')));
                  console.log(color.bold.brightBlue("you got ",emoji.get('first_place_medal')))
                break;
        }
      }

      function qs(question,answer)
      {  //function declaration for question and answer
      
        var currentans= readlineSync.question(color.bold.brightCyan(emoji.get('koala'),question)) //input from question
        if(currentans.toLowerCase()==answer)  // answer comparision
        {
          console.log(color.bold.underline.brightGreen("\n Right answer"));
          score++;          //increment score for right answer
          expression(score);
        }
        else
        {
          console.log(color.bgBrightRed.bold.black("\n Wrong answer ooops"),emoji.get('broken_heart'));
        }
        console.log(color.italic.brightYellow("\n score is",score));  //score after every question
        console.log(color.bold.brightRed("-------------------\n"));
      }
      var playagain=readlineSync.question(color.brightRed("Do you want to try again?y/n\n"));
      if(playagain.toLowerCase()=="y")
      {
        score=0;
      }
      else
      { 
        try{
        //saving score section
        fs.appendFileSync('score.txt','\n'+username+"==>"+score);   // saving score data
        console.log("data saved");
        }
        catch(err){
          console.log(err);
        }   

        //read score board section
        var scoreboard=readlineSync.question(color.bold.brightCyan(emoji.get('koala')," Do u wanna see scoreboard?y/n\n")); 
        if(scoreboard.toLowerCase()=="y")
        {
         var read_data= fs.readFileSync('score.txt');//reading scoreboard
            
            console.log(color.brightGreen("Reading data: " + read_data.toString()));
          
        }
        else if(scoreboard.toLowerCase()=="n")
        {
          console.log(color.brightRed("Okay Bye"))
        }
        else
        {
          console.log(color.underline.brightRed("try valid key next time bye"))
        }

      break;
      }

  }
}
else
{
  console.log("plz write your good name next time\n i need your good name before start plz run again give your name")
}