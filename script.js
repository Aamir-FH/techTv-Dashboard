
// Post Scheduling
const postForm = document.getElementById('post-form');
const postModal = document.getElementById('postModal');
const closeModal = document.getElementsByClassName('close')[0];
const modalPostContent = document.getElementById('modalPostContent');
const modalPostDateTime = document.getElementById('modalPostDateTime');
const modalPostPlatform = document.getElementById('modalPostPlatform');

postForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const content = document.getElementById('post-content').value;
    const date = document.getElementById('post-date').value;
    const time = document.getElementById('post-time').value;
    const platform = document.getElementById('post-platform').value;

    modalPostContent.textContent = content;
    modalPostDateTime.textContent = `Scheduled for: ${date} at ${time}`;
    modalPostPlatform.textContent = `Platform: ${platform}`;
    postModal.style.display = "block";
    setTimeout(() => postModal.classList.add('show'), 10);

    // Add post to calendar
    addPostToCalendar(content, date, time, platform);

    // Reset form
    postForm.reset();
});

closeModal.onclick = function() {
    postModal.classList.remove('show');
    setTimeout(() => postModal.style.display = "none", 300);
}

window.onclick = function(event) {
    if (event.target == postModal) {
        postModal.classList.remove('show');
        setTimeout(() => postModal.style.display = "none", 300);
    }
}

// Follower Growth Chart
const ctx = document.getElementById('followerChart').getContext('2d');
const followerData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets:  [{
        label: 'Facebook',
        data: [1000, 1500, 2000, 2500, 3000, 3500],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
    }, {
        label: 'Twitter',
        data: [500, 1000, 1500, 2000, 2500, 3000],
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
    }, {
        label: 'Instagram',
        data: [2000, 2500, 3000, 3500, 4000, 4500],
        borderColor: 'rgb(255, 206, 86)',
        tension: 0.1
    }]
};

new Chart(ctx, {
    type: 'line',
    data: followerData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        }
    }
});

// Content Calendar
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add day headers
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('calendar-day-header');
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day');
        calendar.appendChild(emptyDay);
    }

    // Add calendar days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.innerHTML = `<div class="calendar-day-header">${i}</div>`;
        dayElement.setAttribute('data-date', `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`);
        calendar.appendChild(dayElement);
    }
}

function addPostToCalendar(content, date, time, platform) {
    const calendarDay = document.querySelector(`.calendar-day[data-date="${date}"]`);
    if (calendarDay) {
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');
        postItem.textContent = `${platform}: ${content.substring(0, 20)}...`;
        postItem.style.animation = `slideIn 0.5s ease forwards`;
        calendarDay.appendChild(postItem);
    }
}

generateCalendar();

// Simulated data for engagement analytics
function updateEngagementAnalytics() {
    const engagementTable = document.querySelector('#engagement-analytics table');
    const platforms = ['Facebook', 'Twitter', 'Instagram'];
    
    platforms.forEach((platform, index) => {
        const row = engagementTable.rows[index + 1];
        const cells = row.cells;
        for (let i = 1; i < cells.length; i++) {
            const oldValue = parseInt(cells[i].textContent.replace(',', ''));
            const newValue = Math.floor(Math.random() * 10000);
            animateValue(cells[i], oldValue, newValue, 1000);
        }
    });
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Update engagement analytics every 5 seconds
setInterval(updateEngagementAnalytics, 5000);

// Initial update
updateEngagementAnalytics();

// Animate cards on scroll
const cards = document.querySelectorAll('.card');
const animateCards = () => {
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardBottom = card.getBoundingClientRect().bottom;
        if (cardTop < window.innerHeight && cardBottom > 0) {
            card.style.animation = 'float 6s ease-in-out infinite';
        } else {
            card.style.animation = 'none';
        }
    });
};

window.addEventListener('scroll', animateCards);
animateCards(); // Initial call
