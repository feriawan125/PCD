const open = document.getElementById("uploadBtn");

const form = document.getElementById("uploadForm");
const inpFile = document.getElementById("inpFile");

const spinner = document.getElementById("spinner");
const brand = document.getElementById("brandBtn");

const warning = document.getElementById("warningTxt");

// load last file
var fileName;

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                fileName = allText;
            }
        }
    }
    rawFile.send(null);
}

function getFileName() {
  readTextFile("image/last.txt");
  console.log(fileName);
  return fileName;
}

// spinedit limit
function spinEditLimit(input){
  if (input.value > 255){
    input.value = 255;
  }
  if(input.value < 0){
    input.value = 0;
  }
}

warning.style.display = "none";

spinner.style.display = "none";

function warningOn() {
  warning.style.display = "";
}
function spinnerOn() {
  spinner.style.display = "";
}
function spinnerOff() {
  spinner.style.display = "none";
}
open.onclick = function(){
  inpFile.click();
};
brand.onclick = function(){
  location.reload();
};

inpFile.onchange = function (e) {
  if (this.files && this.files[0]){
    document.getElementById("submitBtn").click();
  }
}
form.addEventListener("submit", e =>  {
  e.preventDefault();

  const endpoint = "upload.php";
  const formData = new FormData();

  formData.append("inpFile", inpFile.files[0]);

  fetch(endpoint, {
    method:"post",
    body: formData
  }).catch(console.error);
  // reload();
  warningOn();
});

