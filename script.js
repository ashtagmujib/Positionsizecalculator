const body = document.querySelector('body');
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');

const BTN = document.getElementById('btn');
const result = document.getElementById('result');


let theme;

// dark and light mode
moon.addEventListener('click', darkmode);
sun.addEventListener('click', lightmode);


function darkmode() {
    theme = 'dark';

    moon.style.display = 'none';
    sun.style.display = 'block';

    // change colors
    body.style.backgroundColor = '#3c3e3fff';
    body.style.color = '#D9E3E5';
    
    BTN.style.backgroundColor = 'white';
    BTN.style.color = 'black';

    result.style.backgroundColor = 'white';
    result.style.color = 'black';


    localStorage.setItem('theme', JSON.stringify(theme))

}



function lightmode() {
    theme = 'light';

    moon.style.display = 'block';
    sun.style.display = 'none';

    // change colors
    body.style.backgroundColor = '#fff';
    body.style.color = '#04090F';

    BTN.style.backgroundColor = 'black';
    BTN.style.color = 'white';

    result.style.backgroundColor = 'black';
    result.style.color = 'white';
    
    localStorage.setItem('theme', JSON.stringify(theme))
}




let parsedTheme = JSON.parse(localStorage.getItem('theme'))

if(parsedTheme === 'dark' ) {
    moon.style.display = 'none';
    sun.style.display = 'block';

    // change colors
    body.style.backgroundColor = '#3c3e3fff';
    body.style.color = '#D9E3E5';
    BTN.style.backgroundColor = 'white';
    BTN.style.color = 'black';

    result.style.backgroundColor = 'white';
    result.style.color = 'black';
}

else if (parsedTheme === 'light') {
    moon.style.display = 'block';
    sun.style.display = 'none';

    // change colors
    body.style.backgroundColor = '#fff';
    body.style.color = '#04090F';
    
    BTN.style.backgroundColor = 'black';
    BTN.style.color = 'white';

    result.style.backgroundColor = 'black';
    result.style.color = 'white';
}


function calculate() {
    const risk = parseFloat(document.getElementById("risk").value);
    const entry = parseFloat(document.getElementById("entry").value);
    const stop = parseFloat(document.getElementById("stop").value);

    if (!risk || !entry || !stop) {
      alert("Please fill in all fields");
      return;
    }  

    const positionSize =
      (risk * entry) / Math.abs(entry - stop);


    RST= document.getElementById("result");
    RST.style.display = 'block';
    RST.innerHTML = `<p>Order Value - $ <strong>${positionSize.toFixed(2)}</strong></p>`;  
}    






