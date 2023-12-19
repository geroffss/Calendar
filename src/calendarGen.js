const calendarDiv = document.getElementById('calendar');

// Get the current date
let currentDate = new Date();

function renderCalendar() {
  return new Promise((resolve) => { 
    // Clear the calendar div
    calendarDiv.innerHTML = '';

    // Create the calendar header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4';
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    header.innerHTML = `
      <h2 class="text-2xl">${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</h2>
      <div>
        <button type="button" id="prevMonth" class="bg-blue-500 text-white rounded px-2 py-1 mr-2">Prev</button>
        <button type="button" id="nextMonth" class="bg-blue-500 text-white rounded px-2 py-1">Next</button>
      </div>
    `;
    
    calendarDiv.appendChild(header);
    document.getElementById('prevMonth').addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      var userId = firebase.auth().currentUser.uid;
      renderCalendar().then(() => colorDateDivs(userId));
    });
    document.getElementById('refreshBtn').addEventListener('click', function() {
      location.reload(true);
    });
    document.getElementById('nextMonth').addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      var userId = firebase.auth().currentUser.uid;
      renderCalendar().then(() => colorDateDivs(userId));
    });
    // Create the days of the week row
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    
    let date = 1;
    let prevMonthDate = daysInPreviousMonth - firstDayOfMonth + 1;
    let nextMonthDate = 1;
  
    for (let i = 0; i < 6; i++) {
      const weekRow = document.createElement('div');
      weekRow.className = 'grid grid-cols-7 gap-4 mt-2';
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          weekRow.innerHTML += `<div class="text-center text-gray-400 rounded-md">${prevMonthDate}</div>`;
          prevMonthDate++;
        } else if (date > daysInMonth) {
          weekRow.innerHTML += `<div class="text-center text-gray-400 rounded-md">${nextMonthDate}</div>`;
          nextMonthDate++;
        } else {
          weekRow.innerHTML += `<div class="text-center hover:bg-blue-200 date rounded-md p-2" data-date="${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${date}">${date}</div>`;
          date++;
        }
      }
      calendarDiv.appendChild(weekRow); 
    
  }
resolve ();
});
}
// Call renderCalendar initially
renderCalendar();

// Function to color date divs (Replace this function with your actual logic)
function colorDateDivs() {
  // Add your logic here for coloring date divs
  console.log('Coloring date divs...');
}


document.getElementById('calendar').addEventListener('click', function(event) {
  const selectedDate = event.target.innerText;
  if (event.target.classList.contains('date')) {
    const selectedMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const selectedYear = currentDate.getFullYear();
    console.log(`Selected date: ${selectedYear}-${selectedMonth}-${selectedDate}`);
    // Perform actions for the selected date
    // Example: You might want to highlight the selected date or trigger an event
    event.target.classList.add('selected'); // Add a class for visual indication
  }
});

