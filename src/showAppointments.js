// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

async function getAppointmentCountForDate(date) {
    const snapshot = await db.ref('appointments').orderByChild('date').equalTo(date).once('value');
    return snapshot.numChildren();
}

function colorDateDivs() {
    // Get all date divs
    var dateDivs = document.getElementsByClassName('date');

    // Get the displayed month and year from the currentDate variable
    var displayedMonth = currentDate.getMonth() + 1;
    var displayedYear = currentDate.getFullYear();

    // Iterate over each date div
    for (var i = 0; i < dateDivs.length; i++) {
        (async function(i) {
            var dateDiv = dateDivs[i];

            var day = dateDiv.textContent;

            // Construct the dateString using the displayed month and year
            var dateString = `${displayedMonth}/${day}/${displayedYear}`;
            var formattedDate = new Date(dateString).toLocaleDateString('en-CA');

            const count = await getAppointmentCountForDate(formattedDate);
            let percentageFree = (24 - count) / 24;
            if (percentageFree === 1) {
                dateDiv.style.backgroundColor = 'green';
            } else if (percentageFree >= 0.75) {
                dateDiv.style.backgroundColor = 'lightgreen';
            } else if (percentageFree >= 0.5) {
                dateDiv.style.backgroundColor = 'yellow';
            } else if (percentageFree >= 0.25) {
                dateDiv.style.backgroundColor = 'orange';
            } else {
                dateDiv.style.backgroundColor = 'red';
            }
        })(i);
    }
}
  // Assuming selectedDate and selectedHour are defined somewhere else in your code

// Run the function when the page loads
window.onload = function() {
    renderCalendar();
    colorDateDivs();
 
    
};
