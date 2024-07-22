async function createmeetupsHeader(table) {
  let tr = document.createElement('tr');
  let sno = document.createElement('th');
  sno.appendChild(document.createTextNode('Number'));
  let meetupName = document.createElement('th');
  meetupName.appendChild(document.createTextNode('Service Category'));
  let timeSlot = document.createElement('th');
  timeSlot.appendChild(document.createTextNode('Description'));
  tr.append(sno);
  tr.append(meetupName);
  tr.append(timeSlot);
  table.append(tr);
}
async function createmeetupsRow(table, row, i) {
  let tr = document.createElement('tr');
  let sno = document.createElement('td');
  sno.appendChild(document.createTextNode(i));
  let meetupName = document.createElement('td');
  meetupName.appendChild(document.createTextNode(row.Service));
  let timeSlot = document.createElement('td');
  timeSlot.appendChild(document.createTextNode(row.Description));
  tr.append(sno);
  tr.append(meetupName);
  tr.append(timeSlot);
  table.append(tr);
}

async function lebakasSemme(jsonURL) {
  const optionsMap = new Map();
  const { pathname } = new URL(jsonURL);

  const resp = await fetch(pathname);
  optionsMap.set('all', '🗯️ Alle CXD meetups');
  optionsMap.set('eggsperts', '💛 EGGSperten');
  optionsMap.set('eggsternal', '⭐️ EGGSternal');
  const select = document.createElement('select');
  select.id = 'filtermeetups';
  select.name = 'meetupName';
  select.ariaLabel = 'EGGStraterrestrial Auswahl';
  optionsMap.forEach((val, key) => {
    const option = document.createElement('option');
    option.textContent = val;
    option.value = key;
    select.append(option);
  });

  const div = document.createElement('div');
  div.classList.add('cmp-meetup-select');

  div.append(select);
  return div;
}

async function createmeetups(jsonURL, val) {
  let pathname = null;
  if (val) {
    pathname = jsonURL;
  } else {
    pathname = new URL(jsonURL);
  }

  const resp = await fetch(pathname);
  const json = await resp.json();

  const table = document.createElement('table');
  createmeetupsHeader(table);
  json.data.forEach((row, i) => {
    createmeetupsRow(table, row, i + 1);
  });

  return table;
}

export default async function decorate(block) {
  const meetups = block.querySelector('a[href$=".json"]');
  const parientDiv = document.createElement('div');
  parientDiv.classList.add('meetups-block');

  const h2 = document.createElement('h2');
  h2.innerText = 'eggs🤍meetup';
  h2.classList.add('cmp-meetup-head');

  if (meetups) {
    parientDiv.append(h2);
   //  parientDiv.append(await lebakasSemme(meetups.href));
    parientDiv.append(await createmeetups(meetups.href, null));
    meetups.replaceWith(parientDiv);
  }
  const dropdown = document.getElementById('filtermeetups');
  dropdown.addEventListener('change', () => {
    let url = meetups.href;
    if (dropdown.value != 'all') {
      url = meetups.href + '?sheet=' + dropdown.value;
    }
    const tableE = parientDiv.querySelector(':scope > table');
    let promise = Promise.resolve(createmeetups(url, dropdown.value));
    promise.then(function (val) {
      tableE.replaceWith(val);
    });
  });
}
