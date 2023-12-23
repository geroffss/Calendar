document.addEventListener('DOMContentLoaded', function() {

const startHourSelect = document.getElementById('startHour');
for (let i = 0; i < 24; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.text = i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i - 12}:00 PM`;
  startHourSelect.appendChild(option);
}

const endHourSelect = document.getElementById('endHour');
for (let i = 0; i < 24; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.text = i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i - 12}:00 PM`;
  endHourSelect.appendChild(option);
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById('preferencesForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const startHour = document.getElementById('startHour').value;
        const endHour = document.getElementById('endHour').value;
        firebase.database().ref('preferences/' + user.uid).set({
          startHour: startHour,
          endHour: endHour
        });
        document.getElementById('modalText').innerText = 'Preferences saved!';
      });
    }
  });
});
