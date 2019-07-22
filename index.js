
document.addEventListener('DOMContentLoaded', () => {
    console.log(`It's better to burn out than to fade away.`);
});


/*

We are going to create an Employee address book.  We will
use the existing "avatar" code to add employees to the screen

1)  Update the JavaScript code to read all of the user data from
    the people.js file and show all the users on the page
2)  Add a filter to the data to only return users whose last
    name start with a given letter

*/


// function createAvatar(pic, name, h2, loc, mail, phone) {
    //     //new avatar section in container div
    //     const newAvatar = document.createElement('section');
    //     newAvatar.classList.add('avatar');
    //     containter.appendChild(newAvatar);
    
    //     //new avatar-image div in avatar section
    //     const newAvatarImgDiv = document.createElement('div');
    //     newAvatarImgDiv.classList.add('avatar-image');
    //     newAvatar.appendChild(newAvatarImgDiv);
    
    //     //new ACTUAL img in avatar-image div
    //     const newAvatarImage = document.createElement('img');
    //     newAvatarImage.setAttribute('src', "https://randomuser.me/api/portraits/men/3.jpg")
    //     newAvatarImage.setAttribute('alt', `NAME OF BOI`);
    //     newAvatarImgDiv.appendChild(newAvatarImage);
    
    //     //new avatar content div in avatar section
    //     const newAvatarContent = document.createElement('div');
    //     newAvatarContent.classList.add('avatar-content');
    //     newAvatar.appendChild(newAvatarContent);
    //     // console.log(newAvatarContent);
    
    //     //h2 in avatar-content div
    //     const newAvatarHeader = document.createElement('h2');
    //     newAvatarHeader.classList.add('avatar-header');
    //     newAvatarHeader.innerHTML = `albert fleming`;
    //     newAvatarContent.appendChild(newAvatarHeader);
    
    //     //avatar-location div in avatar-content div
    //     const newAvatarLoc = document.createElement('div');
    //     newAvatarLoc.classList.add('avatar-location');
    //     newAvatarLoc.innerHTML = `7693 westmoreland street<br/> arklow, offaly<br/>54657`
    //     newAvatarContent.appendChild(newAvatarLoc);
    
    //     //avatar-contact-list ul in avatar-content div
    //     const newAvatarUl = document.createElement('ul');
    //     newAvatarUl.classList.add('avatar-contact-list');
    //     newAvatarContent.appendChild(newAvatarUl);
    
    //     //avatar-contact-list-item in avatar-contact-list
    //     const newAvatarLi1 = document.createElement('li');
    //     newAvatarLi1.classList.add('avatar-contact-list-item');
    //     newAvatarUl.appendChild(newAvatarLi1);
    
    //     //a email in item
    //     const email = document.createElement('a');
    //     email.setAttribute('href', "mailto:albert.fleming@example.com");
    //     email.innerHTML = `✉`;
    //     newAvatarLi1.appendChild(email)
    
    //     //avatar-contact-list-item in avatar-contact-list 2
    //     const newAvatarLi2 = document.createElement('li');
    //     newAvatarLi2.classList.add('avatar-contact-list-item');
    //     newAvatarUl.appendChild(newAvatarLi2);
    
    //     //a tel in item
    //     const tel = document.createElement('a');
    //     email.setAttribute('href', "tel:2389723439");
    //     tel.innerHTML = `✆`;
    //     newAvatarLi2.appendChild(tel)
    // }


const container = document.querySelector('.container');

function createAvatar2(el) {
    const newAvatar2 = document.createElement('div');
    newAvatar2.classList.add('userData');

    
    // console.log(el.picture);
    newAvatar2.innerHTML = 
        `<section class="avatar">
            <div class="avatar-image">
                <img src="${el.picture}" alt="${el.name}"/>
            </div>
            <div class="avatar-content">
                <h2 class="avatar-header">${el.name}</h2>
                <div class="avatar-location">${el.location}</div>
                    <ul class="avatar-contact-list">
                        <li class="avatar-contact-list-item"><a href="${el.email}">✉</a></li>
                        <li class="avatar-contact-list-item"><a href="${el.phone}">✆</a></li>
                    </ul>
            </div>
        </section>`;
    container.appendChild(newAvatar2);

}


const newData = userData.results.map(el => {
    return {
        picture : el.picture.large || el.picture.medium || el.picture.small,
        name : `${el.name.first}  ${el.name.last}`,
        location : el.location.street + '<br>' 
        + el.location.city + el.location.postcode,
        email : el.email,
        phone :el.phone
    }
});


// nav bar stuff

const body = document.querySelector('body')
const nav = document.createElement('nav');
nav.classList.add('nav');

body.appendChild(nav);

body.style.display = 'flex';
body.style.flexDirection = 'column';
body.style.justifyContent = 'center';


nav.style.height = '100px';
nav.style.width = '80vw';
nav.style.margin = '0 auto';
nav.style.borderRadius = '40px';
nav.style.backgroundColor = 'lightpink';
container.style.order = '1';


const navContent = document.createElement('div');
navContent.classList.add('nav-content');



const ol = document.createElement('ol');
nav.appendChild(ol);
ol.style.display = 'flex';
ol.style.listStyleType = 'none';
ol.style.justifyContent = 'space-evenly';
ol.style.alignItems = 'center';
ol.style.margin = '0';
ol.style.padding = '0';
ol.style.height = '100px';
ol.addEventListener('click', filterByLast);

const navLet = ['HOME','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', 'MISC.'];

function addLetters() {
navLet.forEach(e => {
    const letters = document.createElement('li');
    letters.classList.add('letter');
    ol.appendChild(letters);
    letters.innerHTML = e;
});
};

// addLetters();

//filter by last name letter
function filterByLast(e) {
// If an item (not the container) is clicked
    if (event.target !== event.currentTarget) {
// if 'reset' is selected
    if (event.target.innerHTML === 'HOME') {
        container.innerHTML = ""
        newData.map(createAvatar2)
// if 'other' is selected, populate with non-alphabet names
    } else if (event.target.innerHTML === 'MISC.') {
        const filteredNewData = newData.filter(
            item => !navLet.includes(item.name[0].toUpperCase())
            );
        container.innerHTML = ""
        filteredNewData.map(createAvatar2)
    }
// else, populate according to the selected letter
    else {
        const filteredNewData = newData.filter(
            item => event.target.innerHTML.toLowerCase() === item.name.toLowerCase()[0]
            );
        container.innerHTML = ""
        filteredNewData.map(createAvatar2)
    }
}
};

//fetching
// let userData;
const start = () => {
    const container = document.querySelector('.container');
    fetch('https://randomuser.me/api/?results=50')
    .then(res => res.json())
    .then(res => {
    // searchBar();
    // const searchBar = document.querySelector(ol);
    const newData = userData.results.map(el => {
        return {
            picture : el.picture.large || el.picture.medium || el.picture.small,
            name : `${el.name.first}  ${el.name.last}`,
            location : el.location.street + '<br>' 
            + el.location.city + el.location.postcode,
            email : el.email,
            phone :el.phone
        }
        ol.addEventListener('click', e => filterByLast(e, newData));
        console.log(res);
    })
})

    // parsedData.forEach( (el) => container.appendChild(el));
    addLetters();
    // ol.addEventListener('click', filterByLast);
}

start();
newData.map(createAvatar2);

// const container = document.querySelector('.container');
// fetch('https://randomuser.me/api/?results=50')
// .then(res => res,json())
// .then (res => {
//     const userData = res.results.map(createPerson).map(createAvatar2);
//     userData.forEach( (el) => container.appendChild(el));
// })
// addLetters();
// letterContainer.addEventListener('click', filterListByLetter);





// console.log(nav);


//parse through data

// console.log(userData.results);