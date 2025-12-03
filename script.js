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
    "Janell" : "https://www.amazon.com/hz/wishlist/ls/EQDZ8HBJKA3Y?ref=cm_sw_sm_r_un_un_Coqf9zkFtbkZM",
    //Grandparents
    "Grandpa" : "https://www.amazon.com/hz/wishlist/ls/3S2LUJYN35W6Y?ref_=wl_fv_le",
    "Grandma": "https://docs.google.com/document/d/12y8Z5Q3L_J5vJmuY82WhAycDZKCcLi5VLAwCklYNjVQ/edit?usp=sharing",
    //Ashworth
    "Kirk": "https://www.amazon.com/hz/wishlist/ls/5VSEWEWQUIS8?ref_=wl_share",
    "Andrea": "https://www.amazon.com/hz/wishlist/ls/2BAMBFK9FQ0TX?ref_=wl_share",
    "Elizabeth": "https://www.amazon.com/hz/wishlist/ls/2CKPEKWSTY4W8?ref_=wl_share",
    "Noah": "https://www.amazon.com/hz/wishlist/ls/EKMT0LZNA4NB?ref_=wl_share",
    "Raya": "https://www.amazon.com/hz/wishlist/ls/3M4CUCEBEXKI1?ref_=wl_share",
    "Nathan": "https://www.amazon.com/hz/wishlist/ls/2US6G3ZDP07CM?ref_=wl_share",
    "Gwen": "https://www.amazon.com/hz/wishlist/ls/I1ETWW5Y8Z9K?ref_=wl_share",
    //Garcia
    "LaDona": "https://www.amazon.com/hz/wishlist/ls/33SH492P9N4XT?ref_=wl_share",
    "Nick": "https://www.amazon.com/hz/wishlist/ls/2QSW0VVWH0E1I?ref_=wl_share",
    "Ezra": "https://www.amazon.com/hz/wishlist/ls/3VNDUZSZNVSOI?ref_=wl_share",
    "Shayla": "https://www.amazon.com/hz/wishlist/ls/3D39LTOGW0K6K?type=wishlist",
    "Trinidad": "https://www.amazon.com/hz/wishlist/ls/17GFSTA1KUFAL?ref=cm_sw_sm_r_un_un_KDt8FgbNGmjI2",
    "Mackenzie": "https://www.amazon.com/hz/wishlist/ls/2LFIQEZK8WIZM?ref=cm_sw_sm_r_un_un_RvkiPFLO0kLac",
    "Krya": "https://www.amazon.com/hz/wishlist/ls/TSALHVZTKSKX?ref_=wl_share",
    "Landon": "https://www.amazon.com/hz/wishlist/ls/WKQZNZEU5QJG?ref_=wl_share"
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





