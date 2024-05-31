async function createSpeakersHeader(table) {
  let tr = document.createElement('tr');
  let sno = document.createElement('th');
  sno.appendChild(document.createTextNode('Nummer'));
  let speakerName = document.createElement('th');
  speakerName.appendChild(document.createTextNode('Name'));
  let timeSlot = document.createElement('th');
  timeSlot.appendChild(document.createTextNode('Uhrzeit'));
  let capital = document.createElement('th');
  capital.appendChild(document.createTextNode('Thema'));
  tr.append(sno);
  tr.append(speakerName);
  tr.append(capital);
  tr.append(timeSlot);
  table.append(tr);
}
async function createSpeakersRow(table, row, i) {
  let tr = document.createElement('tr');
  let sno = document.createElement('td');
  sno.appendChild(document.createTextNode(i));
  let speakerName = document.createElement('td');
  speakerName.appendChild(document.createTextNode(row.Name));
  let timeSlot = document.createElement('td');
  timeSlot.appendChild(document.createTextNode(row.Thema));
  let capital = document.createElement('td');
  capital.appendChild(document.createTextNode(row.Uhrzeit));
  tr.append(sno);
  tr.append(speakerName);
  tr.append(timeSlot);
  tr.append(capital);
  table.append(tr);
}

async function lebakasSemme(jsonURL) {
  const optionsMap = new Map();
  const { pathname } = new URL(jsonURL);

  const resp = await fetch(pathname);
  optionsMap.set('all', '🗯️ Alle CXD Speakers');
  optionsMap.set('eggsperts', '💛 EGGSperten');
  optionsMap.set('eggsternal', '⭐️ EGGSternal');
  const select = document.createElement('select');
  select.id = 'filterSpeakers';
  select.name = 'speakerName';
  select.ariaLabel = 'EGGStraterrestrial Auswahl';
  optionsMap.forEach((val, key) => {
    const option = document.createElement('option');
    option.textContent = val;
    option.value = key;
    select.append(option);
  });

  const div = document.createElement('div');
  div.classList.add('cmp-speaker-select');

  div.append(select);
  return div;
}

async function createSpeakers(jsonURL, val) {
  let pathname = null;
  if (val) {
    pathname = jsonURL;
  } else {
    pathname = new URL(jsonURL);
  }

  const resp = await fetch(pathname);
  const json = await resp.json();

  const table = document.createElement('table');
  createSpeakersHeader(table);
  json.data.forEach((row, i) => {
    createSpeakersRow(table, row, i + 1);
  });

  return table;
}

export default async function decorate(block) {
  const speakers = block.querySelector('a[href$=".json"]');
  const parientDiv = document.createElement('div');
  parientDiv.classList.add('speakers-block');

  const h2 = document.createElement('h2');
  h2.innerText = 'Speakers';
  h2.classList.add('cmp-speaker-head');

  if (speakers) {
    parientDiv.append(h2);
    parientDiv.append(await lebakasSemme(speakers.href));
    parientDiv.append(await createSpeakers(speakers.href, null));
    speakers.replaceWith(parientDiv);
  }
  const dropdown = document.getElementById('filterSpeakers');
  dropdown.addEventListener('change', () => {
    let url = speakers.href;
    if (dropdown.value != 'all') {
      url = speakers.href + '?sheet=' + dropdown.value;
    }
    const tableE = parientDiv.querySelector(':scope > table');
    let promise = Promise.resolve(createSpeakers(url, dropdown.value));
    promise.then(function (val) {
      tableE.replaceWith(val);
    });
  });
}
