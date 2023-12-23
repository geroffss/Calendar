document.addEventListener('DOMContentLoaded', function () {
  var selectedHour;
  var selectedDate;

  document.getElementById('calendar').addEventListener('click', function (event) {
    var dateDiv = event.target.closest('.date');
    if (dateDiv) {
      console.log(dateDiv, dateDiv.dataset.date); // Add this line

      document.getElementById('modal').classList.remove('hidden');

      var dateParts = dateDiv.dataset.date.split('-');
      var year = dateParts[0];
      var month = dateParts[1] - 1; 

      var day = dateDiv.textContent;

      var dateString = `${month + 1}/${day}/${year}`;

      selectedDate = new Date(dateString);
      console.log(selectedDate);

      var formattedDate = selectedDate.toLocaleDateString('en-CA');

      var appointmentDate = document.getElementById('appointmentDate');
      appointmentDate.textContent = 'For: ' + formattedDate;

      var appointmentList = document.getElementById('appointmentList');
      appointmentList.innerHTML = '';

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

          var dateStringForFirebase = selectedDate.toLocaleDateString('en-CA');
          db.ref('appointments/' + user.uid).orderByChild('date').equalTo(dateStringForFirebase).once('value').then(function (snapshot) {
            var appointments = [];
            snapshot.forEach(function (childSnapshot) {
              appointments.push(childSnapshot.val().time);
            });

            firebase.auth().onAuthStateChanged(function (user) {
              if (user) {
                firebase.database().ref('preferences/' + user.uid).once('value').then(function(snapshot) {
                  var preferences = snapshot.val();
                  var startHour = parseInt(preferences.startHour);
                  var endHour = parseInt(preferences.endHour);
            
                  for (var i = startHour; i < endHour; i++) {
                    var currentDate = new Date();
                    currentDate.setHours(i, 0, 0, 0);
                    var formattedTime = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    var listItem = document.createElement('div');
                    listItem.className = 'border p-5 mt-2 flex justify-between items-center timeDiv rounded-md timeDiv';
                    listItem.id = 'timeDiv';

              var appointmentTime = new Date(year, month, day, i);
              var formattedTime = appointmentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
              listItem.textContent = formattedTime;
              

              if (appointments.includes(formattedTime)) {
                listItem.style.backgroundColor = 'red';
              } else {
                listItem.style.backgroundColor = 'green';
              }

              listItem.addEventListener('click', function (event) {
                selectedHour = event.target.textContent;
                console.log(selectedHour);

                var appointmentFormModal = document.getElementById('appointmentFormModal');
                if (appointmentFormModal) {
                  appointmentFormModal.classList.remove('hidden');
                } else {
                  console.error('Could not find element with id "appointmentFormModal"');
                }
              });

              appointmentList.appendChild(listItem);
            }
          });
        }
      });
          }).catch(function (error) {
            console.error('Error fetching appointments:', error);
          });
        } else {
    
          console.log('No user is signed in.');
        }
      });
    }
  }
  );

  firebase.initializeApp(firebaseConfig);
  var db = firebase.database();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      document.getElementById('appointmentForm').addEventListener('submit', function (event) {
        event.preventDefault();

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var formattedDate = selectedDate.toLocaleDateString('en-CA');

        db.ref('appointments/' + user.uid).push({
          name: name,
          email: email,
          phone: phone,
          date: formattedDate,
          time: selectedHour
        }, function (error) {
          if (error) {
            console.error('Data could not be saved.' + error);
          } else {
            console.log('Data saved successfully.');
            document.getElementById('successModal').classList.remove('hidden');
            
            
            setTimeout(function () {
              document.getElementById('successModal').classList.add('hidden');
            }, 3000);
            var userId = firebase.auth().currentUser.uid;
            renderCalendar().then(() => colorDateDivs(userId));
          }
        });
      });
    } else {
 
      console.log('No user is signed in.');
    }
  });
  document.getElementById('appointmentFormCancel').addEventListener('click', function (event) {
    event.preventDefault();

    document.getElementById('appointmentFormModal').classList.add('hidden');
  });


  document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('modal').classList.add('hidden');
    var userId = firebase.auth().currentUser.uid;
    renderCalendar().then(() => colorDateDivs(userId));
  });

  window.addEventListener('click', function (event) {
    if (event.target == document.getElementById('modal')) {
      document.getElementById('modal').classList.add('hidden');
    }
  });

  document.getElementById('modal').addEventListener('click', function () {
    document.getElementById('modal').classList.add('hidden');
  });

  window.addEventListener('click', function (event) {
    if (event.target == document.getElementById('modal')) {
      document.getElementById('modal').classList.add('hidden');
    }
  });
});