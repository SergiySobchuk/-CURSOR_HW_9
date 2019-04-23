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
const deleteUser = async(userID ,selectCard, deleteButton, saveButton) =>{
    const id = await herokuapp.delete("users/"+userID);
    console.log("deleteButton:", deleteButton);
    selectCard.remove();
    deleteButton.remove();
    saveButton.remove();

    // console.log("id", id);
    // console.log("selectCard", selectCard);
};
const createUser = async() =>{
    const name = document.querySelector("#create-name").value;
    const age = document.querySelector("#create-age").value;
    await herokuapp.post("users/", {
        name: name,
        age: age
    });
    autoLoadUsers();
}

const renderUser = () => {
    const container = document.querySelector('.user-cards');
    container.innerHTML = '';
    ArrayUser.forEach((item)=> {
        const userElement = document.createElement('div');
        userElement.classList.add('card-style');
        userElement.innerHTML = `
        <lable class="name">Name:</lable><input value="${item.name}" type="text"><br>
        <lable class="age">Age:</lable><input value="${item.age}" type="text"><br>
        <!--<button class="save" type="button" id="save">save</button>-->
        <!--<button class="delete" type="button" id="delete">delete</button>-->
        `;
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'delete';

        const saveButton = document.createElement('button');
        saveButton.classList.add('save');
        saveButton.textContent = 'save';

        // const deleteButton = document.getElementById("delete");
        console.log("item.id:" , item.id);
        console.log("userElement:" , userElement);
        console.log("deleteButton:" , deleteButton);
        console.log("saveButton:" , saveButton);
        console.log("-------------------");
        deleteButton.addEventListener('click', () => {
            deleteUser(item.id, userElement, deleteButton, saveButton);
        });
        container.append(deleteButton);
        container.append(saveButton);
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


