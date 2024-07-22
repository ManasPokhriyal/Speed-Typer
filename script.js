const word=document.getElementById('word');
const text=document.getElementById('text');
const tscore=document.getElementById('score');
const Time=document.getElementById('time');
const endgame=document.getElementById('end-game');
const button=document.getElementById('setting-btn');
const f=document.getElementById('setting-form');
const select=document.getElementById('difficulty');
const nav=document.getElementById('nav');

const words=[ "apple",
    "breeze",
    "chocolate",
    "dolphin",
    "elephant",
    "forest",
    "galaxy",
    "harmony",
    "island",
    "jungle",
    "hello",
    "lighthouse",
    "moonlight",
    "nebula",
    "ocean",
    "puzzle",
    "quartz",
    "rainbow",
    "sunflower",
    "treasure",
    "umbrella",
    "volcano",
    "whisper",
    "sulphur",
    "yacht",
    "table"];

    let randomword;

    let score=0;

    let time=10;

    let difficulty=localStorage.getItem('difficulty')!==null? localStorage.getItem('difficulty'):'medium';
    select.value=localStorage.getItem('difficulty')!==null? localStorage.getItem('difficulty'):'medium';

    

    const interval=setInterval(updateTime,1000);

    text.focus(); // focus on text on start
    function getRandomword()
    {
        return words[Math.floor(Math.random()*words.length)];
    }

    function updateTime(){
        time--;
        Time.innerHTML=time+'s';

        if(time===0)
        {
            clearInterval(interval);
            gameOver();
        }

    }


        function gameOver()
        {
            endgame.innerHTML=`
            <h1> Time ran out</h1>
            <p> Your Final Score is ${score}</p>
            <button onclick="location.reload()">Reload</button>
            `;
            endgame.style.display="flex";
        }


    function addtoDom()
    {
        randomword=getRandomword();
        word.innerHTML=randomword;
    }
    addtoDom();

    function updateScore(){
        score++;
        tscore.innerHTML=score;
    }

    text.addEventListener('input',(e)=>{
        const insertedText=e.target.value;
        
        if(insertedText===randomword)
        {
            addtoDom();
            updateScore();
            e.target.value='';
            
            if(difficulty==='hard')
            {
                time+=2;
            }
            else if(difficulty==='medium')
            {
                time+=3;
            }
            else{
                time+=5;
            }

            updateTime();
        }
    })

    //difficulty button

    button.addEventListener('click',()=>{
        nav.classList.toggle('hide')

    });

    f.addEventListener('change',e=>{
        difficulty=e.target.value;
        
    }
    
    );



   