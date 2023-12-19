// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

async function getAppointmentCountForDate(userId, date) {
        const snapshot = await db.ref('appointments/' + userId).orderByChild('date').equalTo(date).once('value');
        return snapshot.numChildren();
}

async function colorDateDivs(userId) {
    // Get all date divs
    var dateDivs = document.getElementsByClassName('date');

    // Get the displayed month and year from the currentDate variable
    var displayedMonth = currentDate.getMonth() + 1;
    var displayedYear = currentDate.getFullYear();

    // Retrieve the user's preferences from the database
    var snapshot = await firebase.database().ref('preferences/' + userId).once('value');
    var userPreference = snapshot.val();
    if (userPreference) {
        var startHour = userPreference.startHour;
        var endHour = userPreference.endHour;

        // Calculate total possible appointments
        var totalAppointments = endHour - startHour - 1;

        // Iterate over each date div
        for (let i = 0; i < dateDivs.length; i++) {
            let dateDiv = dateDivs[i];

            var day = dateDiv.textContent;

            // Construct the dateString using the displayed month and year
            var dateString = `${displayedMonth}/${day}/${displayedYear}`;
            var formattedDate = new Date(dateString).toLocaleDateString('en-CA');

            // Get the appointment count for the date
            var count = await getAppointmentCountForDate(userId, formattedDate);
            let percentageFree = (totalAppointments - count) / totalAppointments;
            if (percentageFree === 1) {
                dateDiv.style.backgroundColor = 'green';
            } else if (percentageFree >= 0.75) {
                dateDiv.style.backgroundColor = 'lightgreen';
            }
            else if (percentageFree >= 0.5) {
                dateDiv.style.backgroundColor = 'yellow';
            }
            else if (percentageFree >= 0.25) {
                dateDiv.style.backgroundColor = 'orange';
            }
            else {
                dateDiv.style.backgroundColor = 'red';
            }
        }
    } else {
        console.error('No user preference found for user:', userId);
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        colorDateDivs(user.uid);
    } else {
        // No user is signed in.
        console.log('No user is signed in.');
    }
});