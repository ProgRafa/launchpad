var System =
{
    dificult: null,
    music: null,

    percent: function(total, parte)
    {
        return parte*100/total;
    },

    formatoHMS: function(time)
    {
        var ms;
        var segundos = time%60;
        var minutos = parseInt(time/60);
        
        if(segundos < 10)
            segundos ="0"+segundos;
        if(minutos < 10)
            minutos ="0"+minutos;       
        
        ms=minutos+":"+segundos;
        return ms;
    },

    createEffect: function()
    {
        var effect = document.createElement("audio");
        effect.controls=false;

        return effect;
    },

    successSound: function()
    {
        var success = System.createEffect();

        success.src="assets/audios/acerto_1.mp3";
        success.play();
    },

    errorSound: function()
    {
        var error = System.createEffect();

        //error.src="assets/audios/erro_1.mp3";
        error.play();
    },

    mappingUrl: function()
    {
        var url = window.location.href;

        for(var i in url)
        {
            if(url[i-1] === '?')
                System.separandoParametrosUrl(url.substring((i), url.length));
        }
    },

    separandoParametrosUrl: function(urlParm)
    {   
        var mapping = 1,
            inicio = 0,
            fim = 0;
    
        for(var i in urlParm)
        {
            if(urlParm[i]==='&')
            {
  
                fim = Number(i);
                System.capturandoValorDosParametros(urlParm.substring(inicio, fim), mapping);
                inicio = fim+1;
                mapping++;
            }
        }

        System.capturandoValorDosParametros(urlParm.substring(inicio, urlParm.length), mapping);
    },

    capturandoValorDosParametros: function(parametro, mapping)
    {
        for(var i in parametro)
        {
            if(parametro[i-1] === '=')
            {
                if(mapping == 1)
                    System.dificult = parametro.substring(i, parametro.length);
                 if(mapping == 2)
                    Render.qtyButtons = parametro.substring(i, parametro.length);
                 if(mapping == 3)
                    System.music = parametro.substring(i, parametro.length);
            }
        }
    },

    colocarVinil: function()
    {
        var music = document.getElementById("music");

        music.src="assets/audios/"+System.music;
    },

    endGame: function()
    {
        Render.resetRender();
        Render.renderToEnd();
    }
}


var Render = 
{
    qtyButtons: null,
    time: 0,

    timer: function()
    {
        var music = document.getElementById("music"),
            display = document.getElementById("clock");
        Render.time=music.currentTime;

        var end = music.duration, 
            percent = System.percent(end, Render.time);

        if(Render.time < end)
        {
            if(!music.paused)
            {
                Render.time++;
                document.getElementById("barraTempo").style.width=percent+"%";
                display.innerText=System.formatoHMS(parseInt(Render.time));
            }
        }else{
            System.endGame();
        }
    },

    resetRender: function()
    {
        var music = document.getElementById("music");

        randomTrail.setSwitcher(false);
        document.getElementById("stoPlay").className="fa fa-play";
        document.getElementById("barraTempo").style.width="0px";
        document.getElementById("clock").innerText="00:00";
        music.currentTime=0;
        music.pause();
    },

    renderToEnd: function()
    {
        var fundo=document.createElement("div");
        fundo.id="fundo";
        
        document.body.appendChild(fundo);

        Render.labelStatistics(fundo);
        Render.buttonToReturn();   
    },

    buttonToReturn: function()
    {
        var returnToIndex=document.createElement("button");
        var requisition=document.createElement("form");

        requisition.action="config.html";
        returnToIndex.innerText="return";
        returnToIndex.id="return";

        document.body.appendChild(requisition);
        requisition.appendChild(returnToIndex);
    },

    labelStatistics: function(div)
    {
        var totalNotas=document.createElement("label");
        var finalScore=document.createElement("label");
        var notes=document.createElement("label");
        var maxSeq=document.createElement("label");
        var accuracy=document.createElement("label");

        totalNotas.className="end-info";
        finalScore.className="end-info";
        notes.className="end-info";
        maxSeq.className="end-info";
        accuracy.className="end-info";

        totalNotas.innerText="Total de Notas "+Statistics.totalDeNotas;
        finalScore.innerText="Score Final "+Statistics.score;
        notes.innerText="Notas Acertadas "+Statistics.note;
        maxSeq.innerText="Maior Sequencia Acertada "+Statistics.maiorSequencia;
        accuracy.innerText="Precisão "+parseInt(System.percent(Statistics.totalDeNotas, Statistics.note))+"%";

        div.appendChild(totalNotas);
        div.appendChild(finalScore);
        div.appendChild(notes);
        div.appendChild(maxSeq);
        div.appendChild(accuracy);
    },
    
    createButtons: function()
    {
        var button = document.createElement("div");
        var corpo = document.getElementById("corpo");

        button.className="gameButton";
        button.value=0;
        corpo.appendChild(button);
    },

    refactoringHeight: function()
    {
        var button = document.getElementsByClassName("gameButton");

        if(this.qtyButtons == 16)
        {
            for(var i = 0; i < button.length; i++)
            {
                button[i].style.width="23%";
            }
        }
            
        if(this.qtyButtons == 25)
        {
            for(var i = 0; i < button.length; i++)
            {
                button[i].style.width="18%";
            }
        }

        if(this.qtyButtons == 64)
        {
            for(var i = 0; i < button.length; i++)
            {
                button[i].style.width="11%";
            }
        }

        var tam = button[0].offsetWidth;
        for(var i = 0; i < button.length; i++)
        {
            button[i].style.height=tam+"px";
        }   
    },

    playOrPause: function()
    {
        var audio = document.getElementById("music");
        var button = document.getElementById("stoPlay");

        if(audio.paused)
        {
            audio.play();
            randomTrail.setSwitcher(true);
            button.className="fa fa-pause";
        }else{
            audio.pause();
            randomTrail.setSwitcher(false);
            button.className="fa fa-play";
        }
    },

    mutedAudio: function()
    {
        var audio = document.getElementById("music");
        var button = document.getElementById("muted");

        if(audio.volume == 0)
        {
            audio.volume = 1;
            button.className="fa fa-volume-up";
        }else
        {
            audio.volume = 0;
            button.className="fa fa-volume-off";
        } 
    },

    resetAudio: function()
    {
        var audio = document.getElementById("music");
        Statistics.reset();
        Render.resetRender();
        Render.updateDisplay(0);

        document.getElementById("stoPlay").setAttribute("class", "fa fa-pause");
        document.getElementById("music").play();

        setTimeout(function(){
            randomTrail.switcher=true;
        }, 5000);
    },

    createButtonController: function(id, classN)
    {
        var buttonPS = document.createElement("button");
        buttonPS.id=id;
        buttonPS.className=classN;
        document.body.appendChild(buttonPS);
    },

    updateDisplay: function(value)
    {
        var uiScore = document.getElementById("score");
        var uiNote = document.getElementById("Note");
        var uiCombo = document.getElementById("combo");

        uiScore.innerText="SCORE "+value;
        uiNote.innerText="NOTAS "+Statistics.getNote();
        uiCombo.innerText="COMBO x"+Statistics.getCombo();
    }
}

var randomTrail = 
{
    interval: null,
    caminho: [],
    totalNotasPerCiclo: 0,
    switcher: true,

    settotalNotasPerCiclo: function(time)
    {   
        this.totalNotasPerCiclo = parseInt(time/(this.interval/1000));
    },
    gettotalNotasPerCiclo: function()
    {
        return this.totalNotasPerCiclo;
    },

    setInterval: function(dificult)
    {
        if(dificult==="easy")
            this.interval = 900;
        if(dificult==="medium")
            this.interval = 600;
        if(dificult==="hard")
            this.interval = 450;
        if(dificult==="veryH")            
            this.interval = 250;
    },
    getInterval: function()
    {
        return this.interval;
    },
    setSwitcher: function(key)
    {
        this.switcher = key;
    }
}

var Statistics = 
{
    score: 0,
    note: 0,
    combo: 1,
    seq: 0,
    maiorSequencia: 0,
    totalDeNotas: 0,

    setTotalDeNotas: function()
    {
        this.totalDeNotas++;
    },
    getTotalDeNotas: function()
    {
        return this.totalDeNotas;
    },

    getCombo: function()
    {
        return this.combo;
    },

    setNote: function(object)
    {   
        if(object.value == 1)
            this.note++;
    },
    getNote: function()
    {
        return this.note;
    },

    setMaiorSequencia: function(seqAtual)
    {
        if(seqAtual > this.maiorSequencia)
            this.maiorSequencia = seqAtual;
    },
    getMaiorSequencia: function()
    {
        return this.maiorSequencia;
    },

    reset: function()
    {
        this.score=0;
        this.combo=1;
        this.note= 0;
        this.seq=0;
        this.maiorSequencia=0;
        this.totalDeNotas=0;
    },

    updateCombo: function()
    {
        if(this.seq >= 0 && this.seq <= 5)
            this.combo = 1;
        else if(this.seq > 5 && this.seq <= 10)
            this.combo = 2;
        else if(this.seq > 10 && this.seq <= 20)
            this.combo = 3;
        else if(this.seq > 20 && this.seq <= 40)
            this.combo = 4;
        else
            this.combo = 5;
    },
    updateScore: function(object)
    {   
        this.updateCombo();
        this.setMaiorSequencia(this.seq);

        if(object.value == 1){
            this.score +=(100*this.combo);
            System.successSound();
            this.seq++;
        }else{
            if(this.score > 0)
                this.score -=(100*this.combo);
            System.errorSound();
            this.seq=0;
        }

        return this.score;
    }
}

var Printer = 
{
    colors: ["#ff0000", "#0000ff", "#00ff00", "#ff00bf", "#00bfff", "#ffff00", "#ff8000", "#bf00ff", "#80ff00", "#00ffff"],
    steps: 0,
    oldRand: null,

    chooseOneColor: function()
    {
        if(randomTrail.switcher)
        {
            if(this.steps > randomTrail.totalNotasPerCiclo)
                this.steps = 0;
            var color, number;
            number = Math.random();
            color = parseInt(number*10);
            this.step++;

            var rand = parseInt(Math.random()*Render.qtyButtons);

            if(rand !== this.oldRand)
                Printer.changeColor(color, rand);
            else
                Printer.chooseOneColor();

            this.oldRand = rand;        
        }
    },
    changeColor: function(color, index)
    {
        var currentDiv = document.getElementsByClassName("gameButton");
        currentDiv[index].style.background=this.colors[color];
        currentDiv[index].value=1;
        Statistics.setTotalDeNotas();
        
        setTimeout(function(){
            if(currentDiv[index].value==1)
            {
                currentDiv[index].value=0;
                currentDiv[index].style.background="rgba(54, 100, 139, 1)";  
            } 
        },randomTrail.interval*1.5);
    }
}

window.onload = function()
{
    System.mappingUrl();
    System.colocarVinil();
    randomTrail.setInterval(System.dificult);
    //var teste = document.getElementById("music");
    //teste.currentTime=200;
    var launchpad=document.getElementById("corpo");
    var height = (1.1 * launchpad.offsetWidth) - 30;
    launchpad.style.height= height+"px";

    for(var i = 0; i < Render.qtyButtons; i++)
    {
        Render.createButtons();
        Render.numberOfButtons++;
    }
  
     Render.refactoringHeight();
     Render.createButtonController("stoPlay", "fa fa-pause");
     Render.createButtonController("muted", "fa fa-volume-up");
     Render.createButtonController("reset", "fa fa-repeat");

     var buttonPlayMusic = document.getElementById("stoPlay");
     var buttonMuted = document.getElementById("muted");
     var buttonReset = document.getElementById("reset");

     buttonPlayMusic.addEventListener("click", Render.playOrPause);
     buttonMuted.addEventListener("click", Render.mutedAudio);
     buttonReset.addEventListener("click", Render.resetAudio);

     var gameButton = document.getElementsByClassName("gameButton");
     for(var i = 0; i < gameButton.length; i++)
     {
         gameButton[i].addEventListener("click", function()
         {
            Statistics.setNote(this); 
            Render.updateDisplay(Statistics.updateScore(this));
            this.value = 0;
            this.style.background="rgba(54, 100, 139, 1)";
         });
     }

     setTimeout(function()
     {
        setInterval(Printer.chooseOneColor, randomTrail.interval);
     }, 6000);
     setInterval(Render.timer, 1000);
}