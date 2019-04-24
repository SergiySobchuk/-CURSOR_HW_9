//test
const herokuapp = axios.create({
    baseURL: "https://test-users-api.herokuapp.com/",
    headers: {
        "Content-Type": "application/json"
    }
});

const getUsers = async () =>{
        const users = await herokuapp.get("users/");
        // console.log(users);
        console.log(users.data.data);
        return users.data.data;
}
const deleteUser = async(userID ,selectCard) =>{
    const idDel = await herokuapp.delete("users/"+userID);
    // console.log("deleteButton:", deleteButton);
    selectCard.remove();
    // deleteButton.remove();
    // saveButton.remove();
    // console.log("id", idDel);
    // console.log("selectCard", selectCard);
};
const updateUser = async(userID, inputName, inputAge) =>{
    // const editName = document.querySelector(".name").value;
    // const edirAge = document.querySelector(".age").value;
    // console.log("userID", userID);
    // console.log("name", editName);
    // console.log("age", edirAge);
    // console.log("inputName", inputName.value);
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
        // userElement.innerHTML = `
        // <lable class="name">Name:</lable><input value="${item.name}" type="text"><br>
        // <lable class="age">Age:</lable><input value="${item.age}" type="text"><br>
        // <!--<button class="save" type="button" id="save">save</button>-->
        // <!--<button class="delete" type="button" id="delete">delete</button>-->
        // `;

        const inputName = document.createElement('input');
        inputName.classList.add('name');
        inputName.value = `${item.name}`;        

        const inputName = document.createElement('input');
        inputName.classList.add('name');
        inputName.value = `${item.name}`;

        const inputAge = document.createElement('input');
        inputAge.classList.add('age');
        inputAge.value = `${item.age}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'delete';

        const saveButton = document.createElement('button');
        saveButton.classList.add('save');
        saveButton.textContent = 'save';

        // const test = document.body.querySelector('card-style');
        // console.log("333333", test);
        // // userElement.className('card-style').appendChild(inputName);
        userElement.appendChild(inputName);
        userElement.appendChild(inputAge);
        userElement.appendChild(deleteButton);
        userElement.appendChild(saveButton);

        console.log("22222: ", userElement);
        // console.log("44444: ", test3);

        // const deleteButton = document.getElementById("delete");
        // console.log("item.id:" , item.id);
        // console.log("userElement:" , userElement);
        // console.log("deleteButton:" , deleteButton);
        // console.log("saveButton:" , saveButton);
        // console.log("-------------------");
        deleteButton.addEventListener('click', () => {
            deleteUser(item.id, userElement);
        });
        saveButton.addEventListener('click', () => {
            updateUser(item.id, inputName, inputAge);
        });
        // container.append(inputName);
        // container.append(inputAge);
        // container.append(deleteButton);
        // container.append(saveButton);
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


