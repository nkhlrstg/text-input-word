    document.querySelector("html").style.height = document.documentElement.clientHeight + "px";
    document.querySelector("h2").classList.add("none");
    document.querySelector("ul").classList.add("none");
    document.querySelector("#bottom").classList.add("none");


const start = document.querySelector("#start");
    start.addEventListener("click", () => {
        vibrate();
        qHead.play();
        start.style.display = "none";
        document.querySelector("h2").classList.remove("none");
        document.querySelector("ul").classList.remove("none");
        document.querySelector("#bottom").classList.remove("none");
    });

    function vibrate(duration = 300)
    {
        if (navigator.vibrate) {
            navigator.vibrate(duration);
        }
    }

let counter = 1;
let disable = false;

const h2 = document.querySelector('h2');
const number = document.querySelector('.number');
let nikhilTagData = document.querySelector('nikhil');
const main_img = document.querySelector('#main-img');
const resetBtn = document.querySelector("#resetBtn");



const qHead = document.querySelector("#qHeadAudio");
const wrongAudio = document.querySelector("#wrongAudio");
const rightAudio = document.querySelector("#rightAudio");
const tryAgainAudio = document.querySelector("#tryagainAudio");


let dataFromJSON;
let nikhilTagDataBlanks = [];

    fetch('data.json')
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        dataFromJSON = data;
        h2.textContent = dataFromJSON[0].heading_text;
        h2.style.backgroundColor = dataFromJSON[0].heading_bgColor;
        h2.style.color = dataFromJSON[0].heading_txtColor;


        loadDataFromJsonFile(dataFromJSON);
        keyboardEntryAndValidating(dataFromJSON)
    })

    let nikhilTagDataBlanksCounter = 0;
    function loadDataFromJsonFile(dataFromJSON){
        number.textContent = counter;
        [...dataFromJSON[counter].Q].forEach(charElem =>
            {
                if (charElem !== "#")
                    {
                    nikhilTagData.innerHTML += '<span class="Sentence">' + charElem + '</span>';
                    }
                else
                    {
                    nikhilTagData.innerHTML += '<input type="text" data-bag =' 
                        + dataFromJSON[counter].blanks[nikhilTagDataBlanksCounter] 
                        + ' class="blankSpace"/>';
                        nikhilTagDataBlanksCounter++
                    }
                    
                    if(dataFromJSON[counter].question_image !== "")
                    {
                        main_img.src = `./assets/img/${dataFromJSON[counter].question_image}`;
                    }   
                });
                nikhilTagDataBlanksCounter = 0;
    }


    function keyboardEntryAndValidating(dataFromJSON) {
        let blankSpace = document.querySelectorAll('.blankSpace');
        blankSpace.forEach(blankSpaceElem => {
            blankSpaceElem.addEventListener('input', function(blankSpaceElemEvent) {
                vibrate()
                var patt = /^[a-zA-Z]+$/;
                if (patt.test(blankSpaceElemEvent.target.value)) {
                    if (blankSpaceElemEvent.data == blankSpaceElemEvent.target.dataset.bag || parseInt(blankSpaceElemEvent.data.charCodeAt(0)) == parseInt(blankSpaceElemEvent.target.dataset.bag.charCodeAt(0)) - 32 )
                    {
                        rightAudio.play();
                        blankSpaceElemEvent.target.classList.add("correct");
                    }
                    else
                    {
                        wrongAudio.play();
                        resetBtn.style.visibility = "visible";
                        document.querySelector("#bottom div").style.alignItems = "center";
                        blankSpaceElemEvent.target.classList.add("incorrect");

                    }
                    blankSpaceElemEvent.target.readOnly = true;
                }
                else {
                    blankSpaceElemEvent.target.value = "";

                }
            })
            })
        }




const next = document.querySelector('.next');
const reset = document.querySelector('#resetBtn');
    
    next.addEventListener('click', ()=>{
        nikhilTagData.innerHTML = "";

        reset.style.visibility = 'hidden';
        vibrate();
        disable = false;    

        if(counter < dataFromJSON.length - 1)
            {
                counter++;
                loadDataFromJsonFile(dataFromJSON);
                keyboardEntryAndValidating(dataFromJSON)

                    if(dataFromJSON[counter].question_image !== "")
                        {
                            main_img.src = `./assets/img/${dataFromJSON[counter].question_image}`;
                        }
                number.textContent = counter;                
            }
        else
            {
                document.write(`<img style="text-align:center; width: clamp(200px, 100%, 600px);" src=./assets/img/${dataFromJSON[0].finish_image}></img>`);
                document.body.style.margin = "0";
                document.body.style.padding = "0";
                document.body.style.display = "flex";
                document.body.style.alignItems = "start";
                document.body.style.justifyContent = "center";
            }
      })

      reset.addEventListener('click', tryAgain);

      function tryAgain(){
        vibrate();
        reset.style.visibility = 'hidden';

        document.querySelector(".incorrect").readOnly = false;
        document.querySelector(".incorrect").value = "";
        document.querySelector(".incorrect").classList.remove("incorrect");
        document.querySelector("#bottom div").style.alignItems = "flex-end";
 
      }