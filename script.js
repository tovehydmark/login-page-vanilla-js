const main = document.getElementById("main");

const mainView = document.createElement("div");
mainView.setAttribute("id", "mainView");

main.append(mainView);

const userNameInput = document.createElement("input");
userNameInput.setAttribute("id", "userNameInput");
userNameInput.setAttribute("type", "text");
userNameInput.setAttribute("placeholder", "Username");

const userPasswordInput = document.createElement("input");
userPasswordInput.setAttribute("id", "userPasswordInput");
userPasswordInput.setAttribute("type", "password");
userPasswordInput.setAttribute("placeholder", "password");

const loginOrOutBtn = document.createElement("button");
loginOrOutBtn.setAttribute("id", "loginOrOutBtn");

const createNewUserViewBtn = document.createElement("button");
createNewUserViewBtn.setAttribute("id", "createNewUserViewBtn");
createNewUserViewBtn.innerText = "Create new user";

const newUserUsername = document.createElement("input");
newUserUsername.setAttribute("type", "text");
newUserUsername.setAttribute("placeholder", "Username:")
newUserUsername.setAttribute("id", "newUserUsername");

const newUserPassword = document.createElement("input");
newUserPassword.setAttribute("type", "password");
newUserPassword.setAttribute("placeholder", "Password:")
newUserPassword.setAttribute("id", "newUserPassword");



const userArray = [{
    userName: "tove",
    userPassword: "test"
}]

if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify(userArray))
}

window.addEventListener("load", () => onLoadView())


let keepUserLoggedIn = {
    userName: '',
    password: '',
    loggedInStatus: ''
}

function onLoadView() {
    //CONTROLS IF A USER IS LOGGED IN VIA LOCAL STORAGE
    let isThereAnythingInLS = JSON.parse(localStorage.getItem("keepUserLoggedIn"));

    console.log(isThereAnythingInLS);
    if (isThereAnythingInLS == null) {
        console.log("Det fanns ingen data i LS");

    } else if (isThereAnythingInLS.loggedInStatus == true) {

        renderLoggedInView()
    }
}

renderStartPage()


function renderStartPage() {
    mainView.innerHTML = "";
    const startPageDescription = document.createElement("p");
    startPageDescription.innerText = "To log in, please type your username and password. If you don't have a user account you may create one below."
    mainView.append(startPageDescription, userNameInput, userPasswordInput, loginOrOutBtn, createNewUserViewBtn);
    loginOrOutBtn.innerText = "Log in";



    //LOG IN USER
    loginOrOutBtn.addEventListener("click", function () {

        let usersFromLS = JSON.parse(localStorage.getItem("users"));

        //Checks if user from input is among registered users. If yes, the user is logged in after a password control and loggedInStatus is updated

        for (let i = 0; i < usersFromLS.length; i++) {

            let foundUser = usersFromLS.find(user => user.userName == userNameInput.value)

            if (foundUser) {

                if (userPasswordInput.value == usersFromLS[i].userPassword) {
                    keepUserLoggedIn = {
                        userName: userNameInput.value,
                        password: userPasswordInput.value,
                        loggedInStatus: true
                    }

                    localStorage.setItem("keepUserLoggedIn", JSON.stringify(keepUserLoggedIn))

                    renderLoggedInView()

                }
            } else {
                console.log("Username and password does not match")

                return
            }
        }
    })

    createNewUserViewBtn.addEventListener("click", () => createNewUser())
}



//SHOWS THE LOGGED IN VIEW
function renderLoggedInView() {
    mainView.innerHTML = "";
    const welcomeParagraph = document.createElement("p");

    let fetchLoggedInUser = JSON.parse(localStorage.getItem("keepUserLoggedIn"));

    welcomeParagraph.innerText = "Welcome " + fetchLoggedInUser.userName
    loginOrOutBtn.innerText = "Log out";
    mainView.append(loginOrOutBtn, welcomeParagraph);


    loginOrOutBtn.addEventListener("click", function () {
        localStorage.removeItem("keepUserLoggedIn")
        renderStartPage()

    })

}



//CREATE NEW USER VIEW
function createNewUser() {
    mainView.innerHTML = "";
    const newUserDescription = document.createElement("p");
    newUserDescription.innerText = "Choose a username and a password:"

    const createUserBtn = document.createElement("button");
    createUserBtn.setAttribute("id", "createUserBtn")
    createUserBtn.innerText = " Create user"
    mainView.append(newUserDescription, newUserUsername, newUserPassword, createUserBtn);

    createUserBtn.addEventListener("click", function () {

        let usersFromLS = JSON.parse(localStorage.getItem("users"));

        //ENSURES NEW USER PROVIDES BOTH USERNAME AND PASSWORD
        if ((newUserUsername.value.length >= 1) && (newUserPassword.value.length >= 1)) {

            usersFromLS.push({
                userName: newUserUsername.value,
                userPassword: newUserPassword.value
            })
            localStorage.setItem("users", JSON.stringify(usersFromLS));

            alert("New user created, please log in")
            renderStartPage()

        } else {
            alert("Please provide both username and password")
        }
    })
}