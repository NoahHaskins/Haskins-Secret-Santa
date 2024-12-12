const names = [];
let assignments = {};
const usedGiftees = new Set();
const logSocket = new WebSocket("ws://localhost:8080");

// Log to both the console and the server
function remoteLog(...args) {
    const message = args.join(" ");
    console.log(message); // Local log
    if (logSocket.readyState === WebSocket.OPEN) {
        logSocket.send(message); // Send log to server
    }
}

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

function findGiftee() {
    const manualInput = document.getElementById("manualInput");
    const num = parseInt(manualInput.value, 10);
    if (isNaN(num) || num < 1 || num > names.length) {
        alert("Invalid number.");
        return;
    }

    const currentName = names[num - 1];
    const gifteeName = assignments[currentName];
    if (!gifteeName) {
        alert("No giftee found for this participant.");
        return;
    }

    if (usedGiftees.has(num - 1)) {
        alert("This person has already found their giftee.");
        return;
    }

    remoteLog(manualInput);

    document.getElementById("gifteeResult").textContent = `Your giftee is: ${gifteeName}`;
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
    
    remoteLog("----------Start----------");
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

    alert("Assignments loaded successfully!");
    displayNames();
}
