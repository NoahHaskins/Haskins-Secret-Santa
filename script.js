const names = [];
let assignments = {};
const usedGiftees = new Set();

function displayNames() {
    const nameList = document.getElementById("nameList");
    nameList.innerHTML = "";
    names.forEach((name, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}) ${name}`;
        if (usedGiftees.has(index)) {
            li.classList.add("crossed");
        }
        nameList.appendChild(li);
    });
}

const gifteeLinks = {
    "Janell" : "",
    //Grandparents
    "Grandpa" : "",
    "Grandma": "",
    //Ashworth
    "Kirk": "",
    "Andrea": "",
    "Elizabeth": "",
    "Noah": "https://www.amazon.com/hz/wishlist/ls/EKMT0LZNA4NB?ref_=wl_share",
    "Raya": "",
    "Nathan": "",
    "Gwen": "https://www.amazon.com/hz/wishlist/ls/I1ETWW5Y8Z9K?ref_=wl_share",
    //Garcia
    "LaDona": "",
    "Nick": "",
    "Ezra": "",
    "Shayla": "",
    "Trinidad": "",
    "Mackenzie": "",
    "Krya": "",
    "Landon": ""
};

// Map code strings directly to their participant number (1-based)
const codes = {
    "0409": 1, // grandma
    "1904": 2, // grandpa
    "0401": 3, // janell
    "2003": 4, // ladona
    "0512": 5, // nick
    "1801": 6, // ezra
    "2005": 7, // shayla
    "1901": 8, // trinidad
    "1905": 9, // mackenzie
    "0318": 10, // krya
    "0520": 11, // landon
    "1901": 12, // kirk
    "1420": 13, // andrea
    "0103": 14, // noah
    "0818": 15, // raya
    "0919": 16, // nathan
    "2013": 17, // elizabeth
    "0119": 18, // gwen
    
};

function findGiftee() {
    const manualInput = document.getElementById("manualInput").value.trim().toUpperCase(); 

    const num = codes[manualInput]; // look up the number by code

    // If the code doesn't exist in the map, num will be undefined
    if (!num) {
        document.getElementById("gifteeResult").textContent = "Invalid Code";
        return;
    }

    const currentName = names[num - 1]; // 1-based → 0-based index
    const gifteeName = assignments[currentName];

    if (!gifteeName) {
        alert("No giftee found for this participant.");
        return;
    }

    // Look up this giftee's list URL
    const gifteeListUrl = gifteeLinks[gifteeName];

    document.getElementById("gifteeResult").textContent =
        `Your giftee is: ${gifteeName}`;

    // Only show a link if we have a URL for this giftee
    if (gifteeListUrl) {
        document.getElementById("gifteeList").innerHTML =
            `${gifteeName}'s list is found here: <a href="${gifteeListUrl}" target="_blank">Amazon</a>`;
    } else {
        document.getElementById("gifteeList").textContent =
            `${gifteeName} does not have a list link yet.`;
    }

    usedGiftees.add(num - 1);
    displayNames();
}


function loadAssignmentsFromFile() {
    fetch("names.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load names.txt");
            }
            return response.text();
        })
        .then(content => {
            parseAssignments(content);
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
    
}

function parseAssignments(content) {
    const lines = content.split("\n").filter(line => line.trim() !== "");
    assignments = {};
    names.length = 0; // Clear the names array

    lines.forEach(line => {
        const [giver, receiver] = line.split("-->").map(name => name.trim());
        if (giver && receiver) {
            assignments[giver] = receiver;
            if (!names.includes(giver)) names.push(giver);
        }
    });

    displayNames();
}

