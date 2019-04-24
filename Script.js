const herokuapp = axios.create({
    baseURL: "https://test-users-api.herokuapp.com/",
    headers: {
        "Content-Type": "application/json"
    }
});

const getUsers = async () =>{
     const users = await herokuapp.get("users/");
     return users.data.data;
}
const deleteUser = async(userID ,selectCard) =>{
    await herokuapp.delete("users/"+userID);
    selectCard.remove();

};
const updateUser = async(userID, inputName, inputAge) =>{
    await herokuapp.put("users/" + userID, {
        name: inputName.value,
        age: inputAge.value
    });
    autoLoadUsers();
}
const createUser = async() =>{
    const newName = document.querySelector("#create-name").value;
    const newAge = document.querySelector("#create-age").value;
    await herokuapp.post("users/", {
        name: newName,
        age: newAge
    });
    autoLoadUsers();
}

const renderUser = () => {
    const container = document.querySelector('.user-cards');
    container.innerHTML = '';
    ArrayUser.forEach((item)=> {
        const userElement = document.createElement('div');
        userElement.classList.add('card-style');

        const lableName = document.createElement('lable');
        lableName.classList.add('name-lable');
        lableName.textContent = "Name:";

        const lableAge = document.createElement('lable');
        lableAge.classList.add('age-lable');
        lableAge.textContent = "Age:";

        const inputName = document.createElement('input');
        inputName.value = `${item.name}`;

        const inputAge = document.createElement('input');
        inputAge.value = `${item.age}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'delete';

        const saveButton = document.createElement('button');
        saveButton.classList.add('save');
        saveButton.textContent = 'save';

        userElement.appendChild(lableName);
        userElement.appendChild(inputName);
        userElement.appendChild(lableAge);
        userElement.appendChild(inputAge);
        userElement.appendChild(deleteButton);
        userElement.appendChild(saveButton);

        deleteButton.addEventListener('click', () => {
            deleteUser(item.id, userElement);
        });
        saveButton.addEventListener('click', () => {
            updateUser(item.id, inputName, inputAge);
        });
        container.append(userElement);
    });
}

const autoLoadUsers = async() =>{
    document.querySelector("#create-name").value = "";
    document.querySelector("#create-age").value = "";
    ArrayUser = await getUsers();
    renderUser();
}

const createUserButton = document.querySelector("#create-btn");
createUserButton.addEventListener("click", createUser);

autoLoadUsers();


