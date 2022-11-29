// Main Form
const mainForm = document.getElementById('Main-Form');

// Input fields
const email = document.getElementById('Email-Input');

mainForm.addEventListener('submit', onSubmit);

function onSubmit(e) {

    e.preventDefault();

    if(email.value.trim() === '') {

        popupNotification('Caution', 'Please Enter all the fields')

    } 
    else {
        
        submitForgotPassword();
    }  
}

async function submitForgotPassword() {

    const response = await axios.post('http://localhost:5005/password/forgot-password');
}

/*
* Popup Notification 
*/
const close = document.getElementById('close');
const popupContainer = document.getElementById('popup-container');
const popupInnerDiv = document.getElementById('popup-inner-div');

close.addEventListener('click', closePopup);

function closePopup() {

    popupContainer.classList.remove('active');

    const childNodes = popupInnerDiv.children;

    popupInnerDiv.removeChild(childNodes[1]);
    popupInnerDiv.removeChild(childNodes[1]);
}

function popupNotification(title, message) {

    popupContainer.classList.add('active');

    const headingH1 = document.createElement('h1');
    headingH1.append(document.createTextNode(title));

    const innerMessage = document.createElement('p');
    innerMessage.append(document.createTextNode(message));

    // <h1>Success</h1>
    // <p>${message}</p>

    popupInnerDiv.appendChild(headingH1);
    popupInnerDiv.appendChild(innerMessage);

}