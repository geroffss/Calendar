const calendarDiv = document.getElementById('calendar');

let currentDate = new Date();

function renderCalendar() {
  return new Promise((resolve) => { 

    calendarDiv.innerHTML = '';

    document.addEventListener('DOMContentLoaded', function() {
      const header = document.getElementById('currentMonth');

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    function updateHeader() {
      header.innerHTML = `
          <h2 class="text-2xl">${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</h2>`;
  }
  updateHeader();

    document.getElementById('prevMonth').addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateHeader();
      var userId = firebase.auth().currentUser.uid;
      renderCalendar().then(() => colorDateDivs(userId));
    });
    document.getElementById('nextMonth').addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateHeader();
      var userId = firebase.auth().currentUser.uid;
      renderCalendar().then(() => colorDateDivs(userId));
    });
  });
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
          weekRow.innerHTML += `<div class="text-center text-gray-400 rounded-md p-2">${prevMonthDate}</div>`;
          prevMonthDate++;
        } else if (date > daysInMonth) {
          weekRow.innerHTML += `<div class="text-center text-gray-400 rounded-md p-2 ">${nextMonthDate}</div>`;
          nextMonthDate++;
        } else {
          weekRow.innerHTML += `<div class="text-center hover:bg-blue-200 date rounded-md p-2 cursor-pointer" data-date="${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${date}">${date}</div>`;
          date++;
        }
      }
      calendarDiv.appendChild(weekRow); 
    
  }
resolve ();
});
}

renderCalendar();

document.getElementById('calendar').addEventListener('click', function(event) {
  const selectedDate = event.target.innerText;
  if (event.target.classList.contains('date')) {
    const selectedMonth = currentDate.getMonth() + 1; 
    const selectedYear = currentDate.getFullYear();
    console.log(`Selected date: ${selectedYear}-${selectedMonth}-${selectedDate}`);
   
    event.target.classList.add('selected'); 

    
  }
});

