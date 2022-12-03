// URL
const url = 'http://localhost:5005';

// User Token
const token = localStorage.getItem('token');

/*
* Event Listeners 
*/
window.addEventListener('DOMContentLoaded', getExpenses);

const reportDownloadButton = document.getElementById('download-report-button');
reportDownloadButton.addEventListener('click', downloadReport);

const returnHomeButton = document.getElementById('return-home-button');
returnHomeButton.onclick = () => {
    location.href = '../views/index.html';
}

const pastLinksButton = document.getElementById('past-links-button');
pastLinksButton.addEventListener('click', getPastLinks);

/*
* Event Listener Functions 
*/
async function getExpenses() {
    try {

        const response = await axios.get(
            'http://localhost:5005/premium/get-report',
            { headers: { 'Authorization': token } } 
        );

        response.data.expenses.forEach((expense) => {
            createTable(expense);
        });

    } catch(err) {
        popupNotification('Error', 'You are not a Premium User');
        
    }
}

async function downloadReport() {

    try {

        const response = await axios.get(
            url + '/premium/download-report',
            { headers: { 'Authorization': token } }
        );

        const a = document.createElement('a');

        a.href = response.data.fileUrl;
        a.download = 'myexpense.csv';
        a.click();

    } catch(err) {

        popupNotification('Error', 'Something went wrong');
    }

}

async function getPastLinks() {
    try {

        const pastReports = await axios.get(
            'http://localhost:5005/premium/past-reports',
            { headers: { 'Authorization': token } } 
        );
        
        const aDiv = document.createElement('div');

        aDiv.classList.add('report-links-div');

        pastReports.data.forEach((pastReport) => {
            const a = `<a href="${pastReport.fileUrl}" download class="report-download-links"> ${pastReport.fileName} </a>`;
            aDiv.innerHTML += a;
        });

        console.log(aDiv);
        popupNotification('Links', aDiv);

    } catch(err) {
        popupNotification('Error', 'You are not a Premium User');
        
    }
}

/*
* DOM Manipulation Functions 
*/

function createTable(expense) {

    const reportTable = document.getElementById('report-table');

    const tr = 
        `<tr>
            <td> ${expense.createdAt} </td>
            <td> ${expense.expenseAmount} </td>
            <td> ${expense.description} </td>
            <td> ${expense.category} </td>
        </tr>`

    reportTable.innerHTML += tr;
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

    const innerMessage = document.createElement('div');
    innerMessage.appendChild(message);

    // <h1>Success</h1>
    // <p>${message}</p>

    popupInnerDiv.appendChild(headingH1);
    popupInnerDiv.appendChild(innerMessage);
}