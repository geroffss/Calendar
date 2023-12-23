document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('calendarBtn').addEventListener('click', function(event) {
        event.preventDefault();

        document.getElementById('calendarDiv').classList.remove('hidden');
        document.getElementById('calendarBtn').classList.add('bg-purple-500');
        document.getElementById('calendarBtn').classList.remove('hover:bg-gray-100');
        document.getElementById('dashboardDiv').classList.add('hidden');
        document.getElementById('upcomingDiv').classList.add('hidden');
        document.getElementById('dashboardBtn').classList.remove('bg-purple-500');
        document.getElementById('upcomingBtn').classList.remove('bg-purple-500');
        document.getElementById('settingsBtn').classList.remove('bg-purple-500');
        document.getElementById('settingsModal').classList.add('hidden');
        var userId = firebase.auth().currentUser.uid;
        renderCalendar().then(() => colorDateDivs(userId));
    });

    document.getElementById('dashboardBtn').addEventListener('click', function(event) {
        event.preventDefault();

        document.getElementById('dashboardDiv').classList.remove('hidden');
        document.getElementById('dashboardBtn').classList.add('bg-purple-500');
        document.getElementById('dashboardBtn').classList.remove('hover:bg-gray-100');
        document.getElementById('calendarDiv').classList.add('hidden');
        document.getElementById('upcomingDiv').classList.add('hidden');
        document.getElementById('calendarBtn').classList.remove('bg-purple-500');
        document.getElementById('upcomingBtn').classList.remove('bg-purple-500');
        document.getElementById('settingsBtn').classList.remove('bg-purple-500');
        document.getElementById('settingsModal').classList.add('hidden');
        var userId = firebase.auth().currentUser.uid;
        renderCalendar().then(() => colorDateDivs(userId));
    });

    document.getElementById('upcomingBtn').addEventListener('click', function(event) {
        event.preventDefault();

        document.getElementById('dashboardDiv').classList.add('hidden');
        document.getElementById('calendarDiv').classList.add('hidden');
        document.getElementById('upcomingDiv').classList.remove('hidden');
        document.getElementById('upcomingBtn').classList.add('bg-purple-500');
        document.getElementById('upcomingBtn').classList.remove('hover:bg-gray-100');
        document.getElementById('calendarBtn').classList.remove('bg-purple-500');
        document.getElementById('dashboardBtn').classList.remove('bg-purple-500');
        document.getElementById('settingsBtn').classList.remove('bg-purple-500');
        document.getElementById('settingsModal').classList.add('hidden');
    });

    document.getElementById('settingsBtn').addEventListener('click', function(event) {
        document.getElementById('dashboardDiv').classList.add('hidden');
        document.getElementById('calendarDiv').classList.add('hidden');
        document.getElementById('upcomingDiv').classList.add('hidden');
        document.getElementById('dashboardBtn').classList.remove('bg-purple-500');
        document.getElementById('calendarBtn').classList.remove('bg-purple-500');
        document.getElementById('upcomingBtn').classList.remove('bg-purple-500');
        document.getElementById('settingsModal').classList.remove('hidden');
        document.getElementById('settingsBtn').classList.add('bg-purple-500');
        document.getElementById('settingsBtn').classList.remove('hover:bg-gray-100');

    });
});
