window.onbeforeunload = function(event)
{
    localStorage.setItem("websites", JSON.stringify(websites));
};

var websiteName = document.getElementById("name"); 
var websiteURL = document.getElementById("url");
var submitBtn = document.getElementById("submit");
var tbody = document.getElementById("tbody");
var modalButton = document.getElementById("modal-button");
var websites = [];

init();


function isValidUrl(string) {
    reg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    if(reg.test(string))
      return true;

    return false;
}

websiteName.addEventListener("input", function(){
    var value = websiteName.value;
    console.log(value);
    if(value.length >= 3){
        websiteName.classList.add("is-valid");
        websiteName.classList.remove("is-invalid");
    }else{
        websiteName.classList.add("is-invalid");
        websiteName.classList.remove("is-valid");
    }
});

websiteURL.addEventListener("input", function(){
    var value = websiteURL.value;
    if(isValidUrl(value)){
        websiteURL.classList.add("is-valid");
        websiteURL.classList.remove("is-invalid");
    }else{
        websiteURL.classList.add("is-invalid");
        websiteURL.classList.remove("is-valid");
    }
});

submitBtn.addEventListener("click", function(){
    if(!(websiteName.classList.contains("is-valid") && websiteURL.classList.contains("is-valid"))){
        modalButton.click();
        return;
    }
    var name = websiteName.value;
    var url = websiteURL.value;

    var httpsRegex = /^https?:\/\//;
    if(!httpsRegex.test(url)){
        url = "https://" + url;
    }

    var website = {
        name: name,
        url: url
    };
    websites.push(website);

    displayLastRow();
    clearForm();
});

function clearForm(){
    websiteName.value = "";
    websiteURL.value = "";
    websiteName.classList.remove("is-valid");
    websiteURL.classList.remove("is-valid");
}

function displayLastRow(){
    if(tbody.value == undefined){
        tbody.value = "";
    }

    var data = `
            <tr>
            <td class="align-middle">${websites.length}</td>
            <td class="align-middle">${websites[websites.length - 1].name}</td>
            <td class="align-middle">
                <a onclick="VisitRow(${websites.length - 1})" class="btn btn-visit">
                    <i class="fas fa-external-link-alt me-1"></i>
                    Visit</a>
            </td >
            <td class="align-middle">
                <a onclick="deleteRow(${websites.length - 1})" class="btn btn-danger px-3">Delete</a>
            </td>
            </tr>`;

    tbody.innerHTML += data;
}
function displayAllRows(){
    var data = "";
    for(var i = 0; i < websites.length; i++){
        data += `
                <tr>
                <td class="align-middle">${i + 1}</td>
                <td class="align-middle">${websites[i].name}</td>
                <td class="align-middle">
                    <a onclick="VisitRow(${i})" class="btn btn-visit">
                        <i class="fas fa-external-link-alt me-1"></i>
                        Visit</a>
                </td>
                <td class="align-middle">
                    <a onclick="deleteRow(${i})" class="btn btn-danger px-3">Delete</a>
                </td>
                </tr>`;
    }
    tbody.innerHTML = data;
}

function VisitRow(index){
    window.open(websites[index].url);
}

function deleteRow(index){
    websites.splice(index, 1);
    displayAllRows();
}

function init(){
    var data = localStorage.getItem("websites");
    if(data != null){
        websites = JSON.parse(data);
        displayAllRows();
    }
}




