/* 
 * 
 * The blaster js file - try not to burn your tiny fingers
 * 
 * 
 * 
 * */

let loaded_json; // Will contain the unmodified array
let template;
let applicationFrame;
// document.addEventListner("load", start); // The whole page (including CSS and images)
document.addEventListener("DOMContentLoaded", main); // Only the HTML of the page

async function main() { // Async and await is needed for 1. view to work
  // Initialization
  await loadJson("menu.json"); // Attempt to set loaded_json
  template         = document.querySelector("[data-template]");
  applicationFrame = document.querySelector("[data-applicationFrame]"); // Destination of our template
  
  // Event handling
  document.getElementById("navigation").addEventListener("click", showList); // Feed the event to the showList function
  
  showItems(loaded_json); // Show items on 1. view
}
  
    
/* Functions */
function showItems(json_as_arr) {
  json_as_arr.forEach(item => {
    // Clone the template
	// Note. This method is very dirty, since it keeps an extra element called "template" in the HTML
	// Alternativly, a template may be loaded from a template file, and then inserted with JavaScript..
    let clonedElement = template.cloneNode(true).content;
    clonedElement.querySelector("[data-name]").textContent = item.navn;
    clonedElement.querySelector("[data-description]").textContent = item.kortbeskrivelse;
    clonedElement.querySelector("[data-price]").textContent = "Pris: " + item.pris + " kr.";
    clonedElement.querySelector("[data-image]").setAttribute("src", "imgs/small/" + item.billede + "-sm.jpg");
    applicationFrame.appendChild(clonedElement);
  });
	
}

async function loadJson(jsonFile) {
  let jsonData = await fetch(jsonFile);
  loaded_json = await jsonData.json();
}

function showList(event) {
	applicationFrame.innerHTML = "";
	let filtered_json_arr;
	let eventId = event.target.id; // Gets the ID of the triggering element
	if (eventId !== "alle") {
	 filtered_json_arr = loaded_json.filter(item => item.kategori == eventId);
	} else {filtered_json_arr = loaded_json;}
	// console.log(loaded_json);
	showItems(filtered_json_arr);
	// alert(eventId + " genius"); // For quick testing..
}