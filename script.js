const sounds = ['Chika', 'Riko', 'You', 'Dia', 'Kanan', 'Mari', 'Hanamaru', 'Ruby', 'Yoshiko'];

var count = [0 , 0, 0, 0, 0, 0, 0, 0, 0];
var keyon = 'none';
sounds.forEach((sound)=> {
    update();
    var buttondiv = document.createElement('div');
    buttondiv.className = 'buttondiv';
    var btn = document.createElement('img');
    btn.className = 'btn';
    btn.title = sound;
    btn.src = './images/' + sound + '.png';
    buttondiv.appendChild(btn);
    var description = document.createElement('button');
    description.className = 'description';
    update(description,sound);
    buttondiv.appendChild(description);
    //add the button to the div with the id of sound
    document.getElementById('buttons').appendChild(buttondiv);

    
    btn.addEventListener('click', ()=> {
        //console.log(sound);
        console.log('sending click');
        click(sound,description);
        //console.log('requesting update 1');
        //update();
        const audio = new Audio(`sounds/${sound}.mp3`);
        audio.load();
        audio.play();
        //console.log('requesting update 2');
        //update();
    });    
    btn.addEventListener('mouseenter', ()=> {
        //console.log("enter");
        keyon = sound;
        update();

    });
    btn.addEventListener('mouseleave', ()=> {
        update();
        keyon = 'none';
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
function update(description,person) {
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
            description.innerText = count[sounds.indexOf(person)];
        }
    }
    //console.log(count);
    //console.log(count.length);
};
function click(person,description) {
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
                description.innerText = singular;
            }
        }
        
    }
    
};
