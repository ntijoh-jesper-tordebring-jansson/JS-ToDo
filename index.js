const itemInput = document.querySelector("#add-name");
const submitItem = document.querySelector("#submitButton");
const itemList = document.querySelector("#item-list");
const search = document.querySelector("#search");

let itemObject = {};
let count = 0;

function pushItem(value) {
    // let size = Object.keys(itemObject).length;
    itemObject[count] = value;
    count++;
};

function removeItem(i) {
    delete (itemObject[i]);
    updateItemList();
};

function updateItemList() {
    itemList.innerHTML = "";

    for (let key in itemObject) {
        addItem(key)
    };
};

function searchItemList(input) {
    itemList.innerHTML = "";

    for (let key in itemObject) {
        if(input === "") {
            updateItemList()
            break;
        }
        if(!itemObject[key].includes(input)) {
            continue;
        }
        
        addItem(key)
    };
}

function addItem(key) {
    const idNumber = `index${key}`;
    let newItem = document.createElement("li");

    newItem.innerHTML = `<span>${itemObject[key]}</span> <button id=${idNumber}>X</button>`;
    itemList.appendChild(newItem);
    document.querySelector(`#${idNumber}`).addEventListener('click', () => {
        removeItem(key);
    });
}

submitItem.addEventListener('click', () => {
    if (itemInput.value) {
        pushItem(itemInput.value)
        itemInput.value = "";
        updateItemList();
    }
    else {
        alert("You can't add an empty item.");
    }
});

search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchItemList(search.value)        

        search.value = "";
    }
});