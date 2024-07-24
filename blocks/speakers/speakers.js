
async function createTableHeader(table){
  let tr=document.createElement("tr");
  let sno=document.createElement("th");sno.appendChild(document.createTextNode("Nummer"));
  let meetupName=document.createElement("th");meetupName.appendChild(document.createTextNode("Name"));
  let timeSlot=document.createElement("th");timeSlot.appendChild(document.createTextNode("Uhrzeit"));
  let capital=document.createElement("th");capital.appendChild(document.createTextNode("Thema"));
  tr.append(sno);tr.append(meetupName);tr.append(capital);tr.append(timeSlot);
  table.append(tr);
}
async function createTableRow(table,row,i){
  let tr=document.createElement("tr");
  let sno=document.createElement("td");sno.appendChild(document.createTextNode(i));
  let meetupName=document.createElement("td");meetupName.appendChild(document.createTextNode(row.Name));
  let timeSlot=document.createElement("td");timeSlot.appendChild(document.createTextNode(row.Thema));
  let capital=document.createElement("td");capital.appendChild(document.createTextNode(row.Uhrzeit));
  tr.append(sno);tr.append(meetupName);tr.append(timeSlot);tr.append(capital);
  table.append(tr);
}

async function lebakasSemme(jsonURL){
  const optionsMap=new Map();
  const { pathname } = new URL(jsonURL);

  const resp = await fetch(pathname);
  optionsMap.set("all","Alle CXD meetups");optionsMap.set("eggsperts","EGGSperten");optionsMap.set("eggsternal","EGGSternal");
  const select=document.createElement('select');
  select.id = "filtermeetups";
  select.name="meetupName";
  select.ariaLabel="EGGStraterrestrial Auswahl";
  optionsMap.forEach((val,key) => {
    const option = document.createElement('option');
    option.textContent = val;
    option.value = key;
    select.append(option);
  });

  const div=document.createElement('div');
  div.classList.add("cmp-meetup-select");
  div.append(select);
  return div;
}
async function createTable(jsonURL,val) {

  let  pathname = null;
  if(val){
    pathname=jsonURL;
  }else{
    pathname= new URL(jsonURL);
  }

  const resp = await fetch(pathname);
  const json = await resp.json();
  console.log("=====JSON=====> {} ",json);

  const table = document.createElement('table');
  createTableHeader(table);
  json.data.forEach((row,i) => {

    createTableRow(table,row,(i+1));


  });

  return table;
}

export default async function decorate(block) {
  const meetups = block.querySelector('a[href$=".json"]');
  const parientDiv=document.createElement('div');
  parientDiv.classList.add('meetups-block');

  if (meetups) {
    // parientDiv.append(await lebakasSemme(meetups.href));
    parientDiv.append(await createTable(meetups.href,null));
    meetups.replaceWith(parientDiv);

  }
  const dropdown=document.getElementById('filtermeetups');
  dropdown.addEventListener('change', () => {
    let url=meetups.href;
    if(dropdown.value!='all'){
      url=meetups.href+"?sheet="+dropdown.value;
    }
    const tableE=parientDiv.querySelector(":scope > table");
    let promise = Promise.resolve(createTable(url,dropdown.value));
    promise.then(function (val) {
      tableE.replaceWith(val);
    });
  });
}