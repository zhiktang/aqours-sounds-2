const sounds = ['Chika', 'Riko', 'You', 'Dia', 'Kanan', 'Mari', 'Hanamaru', 'Ruby', 'Yoshiko'];

var count = [0 , 0, 0, 0, 0, 0, 0, 0, 0];
var keyon = 'none';
sounds.forEach((sound)=> {
    
    var buttondiv = document.createElement('div');
    buttondiv.className = 'buttondiv';
    var btn = document.createElement('img');
    btn.className = 'btn';
    btn.src = './images/' + sound + '.png';
    buttondiv.appendChild(btn);

    //add the button to the div with the id of sound
    document.getElementById('buttons').appendChild(buttondiv);

    update();
    btn.addEventListener('click', ()=> {
        //console.log(sound);
        console.log('sending click');
        click(sound,btn);
        //console.log('requesting update 1');
        //update();
        //btn.innerText = count[sounds.indexOf(sound)];
        const audio = new Audio(`sounds/${sound}.mp3`);
        audio.load();
        audio.play();
        //console.log('requesting update 2');
        //update();
        //btn.innerText = count[sounds.indexOf(sound)];
    });    
    btn.addEventListener('mouseenter', ()=> {
        //console.log("enter");
        keyon = sound;
        update();
        btn.innerText = count[sounds.indexOf(sound)];

    });
    btn.addEventListener('mouseleave', ()=> {
        update();
        keyon = 'none';
        btn.innerText = sound;
    });

});
function update() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://count.alhub.net', true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
       // console.log(xhttp.readyState);
       // console.log("status: " + xhttp.status);
        if (this.readyState == 4 && this.status == 200) {
           // console.log("enter if");
            //console.log(this.responseText);
            const res = this.responseText;
           // console.log(file);
            //console.log(res);
            lines = JSON.parse(res);
            console.log(lines);
            count = lines;
        }
    }
    //console.log(count);
    //console.log(count.length);
};
function click(person,btn) {
    //console.log(person);
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'https://count.alhub.net', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({person: person}));
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            console.log('the only update that is supposed to happen');
            if(keyon == person) {
                singular = JSON.parse(this.responseText);
                console.log('changed button text');
                btn.innerText = singular;
            }
        }
        
    }
    
};
