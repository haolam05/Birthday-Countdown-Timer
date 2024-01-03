const hao = [
  'Hao Tuong Lam',
  'Profile.png',
  'Hao',
  ['University of Washington (Seattle)\n🏫', 'Seattle, Washington\n🌧️', 'May 5th, 2001\n🎂', 'Gym\n🏋️'],
  '5/5/2001'
];
const cat = [
  'Cat Tuong Lam',
  'cat.jpeg',
  'Cat',
  ['University of Washington (Seattle) 🏫', 'Seattle, Washington 🌧️', 'May 19th, 2002 🎂', 'Gym 🏋️'],
  '5/19/2002'
];
const huy = [
  'Huy Tuong Lam',
  'huy.jpg',
  'Huy',
  ['Highline College 🏫', 'Seattle, Washington 🌧️', 'February 10th, 2006 🎂', 'Gym 🏋️'],
  '2/10/2006'
];
const bros = [hao, cat, huy];
let currIdx = 0;
let timer;
makeProfileCard(...bros[currIdx]);

function makeProfileCard(fullName, imgSrc, firstName, facts, dob) {
  const body = document.querySelector('body');

  const h1 = document.createElement('h1');
  h1.innerText = fullName;
  h1.setAttribute('id', 'my-name')
  h1.classList.add('name');
  body.appendChild(h1);


  const button = document.createElement('button');
  button.setAttribute('id', 'switch');
  for (let i = 1; i <= 10; i++) {
    const span = document.createElement('span');
    span.innerText = '⏭️'
    button.appendChild(span);
  }
  body.appendChild(button);
  button.addEventListener('click', e => {
    body.innerHTML = '';
    currIdx = (currIdx + 1) % bros.length;
    clearInterval(timer);
    makeProfileCard(...bros[currIdx]);
  })


  const date = new Date();
  const div = document.createElement('div');
  div.setAttribute('id', 'time-zone');
  const times = [date.getHours(), date.getMinutes(), date.getSeconds()].map(time => `${time}`.padStart(2, '0')).join(':');
  div.innerHTML = `<p>I live in Seattle, Washington, and it's currently <span id="clock">${times}</span> here.</p>`
  body.appendChild(div);
  setInterval(updateClock, 1000);
  function updateClock() {
    const date = new Date();
    const clock = document.querySelector('#clock');
    clock.innerText = [date.getHours(), date.getMinutes(), date.getSeconds()].map(time => `${time}`.padStart(2, '0')).join(':');
  }


  function createUnorderedList(strs) {
    const ul = document.createElement('ul');
    strs
      .forEach(str => {
        const li = document.createElement('li');
        li.innerText = str;
        li.classList.add('detail');
        ul.appendChild(li);
      });
    return ul;
  }
  const ul = createUnorderedList(facts);
  ul.classList.add('my-details');
  body.appendChild(ul);


  const img = document.createElement('img');
  img.setAttribute('alt', 'Profile Picture');
  img.setAttribute('src', imgSrc);
  img.setAttribute('id', 'profile');
  body.appendChild(img);
  h1.insertAdjacentElement('afterend', img)



  function generateBirthdayTimeleft(birthday) {
    const timeLeft = {};
    const currYear = date.getFullYear();
    const nextYear = currYear + 1;
    const timeLetfMillisecond = Number(`${new Date(`${birthday.getMonth() + 1}/${birthday.getDate()}/${nextYear}`) - Date.now()}`);

    timeLeft['days'] = (timeLetfMillisecond / 1000 / 3600 / 24) % 365;
    timeLeft['hours'] = Number(`0.${`${timeLeft['days']}`.split('.')[1]}`) * 24;
    timeLeft['minutes'] = Number(`0.${`${timeLeft['hours']}`.split('.')[1]}`) * 60;
    timeLeft['seconds'] = Number(`0.${`${timeLeft['minutes']}`.split('.')[1]}`) * 60;

    for (const k in timeLeft) {
      timeLeft[k] = `${Math.floor(timeLeft[k])}`;
      if (k != 'days' || (k == 'days' && timeLeft[k].length == 1)) timeLeft[k] = timeLeft[k].padStart(2, '0');
    }

    const ageAtNextBirthday = nextYear - birthday.getFullYear();
    const ageUnit = ageAtNextBirthday % 10 == 1 ? 'st' : ageAtNextBirthday % 10 == 2 ? 'nd' : ageAtNextBirthday % 10 == '3' ? 'rd' : 'th';

    return [timeLeft, ageAtNextBirthday, ageUnit];
  }

  function updateCountDown(birthday) {
    const [timeLeft, ageAtNextBirthday, ageUnit] = generateBirthdayTimeleft(birthday);
    document.querySelector('.days').innerText = timeLeft['days'];
    document.querySelector('.hours').innerText = timeLeft['hours'];
    document.querySelector('.minutes').innerText = timeLeft['minutes'];
    document.querySelector('.seconds').innerText = timeLeft['seconds'];
    document.querySelector('.birthday-timeleft').innerText = `${ageAtNextBirthday}${ageUnit} Birthday!`;
  }

  function createCountDownTimerForBirthday(firstName, dob) {
    const birthday = new Date(dob);
    const [timeLeft, ageAtNextBirthday, ageUnit] = generateBirthdayTimeleft(birthday);
    const birthdayDiv = document.createElement('birthdayDiv');
    birthdayDiv.setAttribute('id', 'birthday');
    birthdayDiv.innerHTML = `
      <p class='birthday'>There are only</p>
      <div id='countdown-timer'>
        <div class='days'>${timeLeft['days']}</div>
        <div class='countdown-separator'>:</div>
        <div class='hours'>${timeLeft['hours']}</div>
        <div class='countdown-separator'>:</div>
        <div class='minutes'>${timeLeft['minutes']}</div>
        <div class='countdown-separator'>:</div>
        <div class='seconds'>${timeLeft['seconds']}</div>
      </div>
      <div id='countdown-text'>
        <span class='countdown-text'>Days</span>
        <span class='countdown-text'>Hours</span>
        <span class='countdown-text'>Minutes</span>
        <span class='countdown-text'>Seconds</span>
      </div>
      <p class='birthday'>until</p>
      <p class='birthday birthday-important'>${firstName}'s</p>
      <p class='birthday birthday-important birthday-timeleft'>${ageAtNextBirthday}${ageUnit} Birthday</p>
      <img src="https://www.howmanydaysuntilmybirthday.com/cake2.png" alt="birthday-cake">
    `
    body.appendChild(birthdayDiv)
    timer = setInterval(updateCountDown, 1000, birthday);
  }
  createCountDownTimerForBirthday(firstName, dob);
}
