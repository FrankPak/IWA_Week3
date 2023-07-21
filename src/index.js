const mainTableBody = document.getElementById("tableBody");
async function getData() {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const municipalityData = await fetch(url);
  const municipalityJSON = await municipalityData.json();

  const SecondUrl =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  const employmentData = await fetch(SecondUrl);
  const employmentJSON = await employmentData.json();

  //console.log(municipalityJSON.dataset.dimension.Alue.category.label);
  //console.log(municipalityJSON.dataset.value);

  let index = 0;
  for (let key in municipalityJSON.dataset.dimension.Alue.category.label) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    td1.innerText = municipalityJSON.dataset.dimension.Alue.category.label[key];
    td2.innerText = municipalityJSON.dataset.value[index];
    td3.innerText = employmentJSON.dataset.value[index];

    let employment = parseInt(employmentJSON.dataset.value[index], 10);
    let population = parseInt(municipalityJSON.dataset.value[index], 10);
    let employmentPercentage = ((employment / population) * 100).toFixed(2);

    td4.innerText = employmentPercentage + "%";

    if (employmentPercentage > 45.0) {
      tr.setAttribute("style", "background-color: #abffbd;");
    } else if (employmentPercentage < 25) {
      tr.setAttribute("style", "background-color: #ff9e9e;");
    }
    //td1.innerText = user.dataset.dimension.Alue.category.label;
    //td2.innerText = user.dataset.value;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    index++;

    mainTableBody.appendChild(tr);
  }
}
getData();
