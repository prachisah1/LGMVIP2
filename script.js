const getUsersButton = document.getElementById("getUsersButton");
const loader = document.querySelector(".loader");
const userGrid = document.getElementById("userGrid");

getUsersButton.addEventListener("click", () => {
    loader.style.display = "block";
    const minimumLoadingTime = 5000;
    const fetchData = fetch("https://reqres.in/api/users?page=1")
    .then((response) => response.json())
    .then((data) => {
        renderUserCards(data.data);
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minimumLoadingTime) {
            const delayTime = minimumLoadingTime - elapsedTime;
            setTimeout(() => {
                loader.style.display = "none";
            }, delayTime);
        } else {
            loader.style.display = "none";
        }
    })
        .catch((error) => {
            console.error("Error fetching user data:", error);
            loader.style.display = "none";
        });
});

function renderUserCards(users) {
    userGrid.innerHTML = ""; 

    users.forEach((user) => {
        const card = document.createElement("div");
        card.classList.add("user-card");
        card.innerHTML = `
            <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
            <h3>${user.first_name} ${user.last_name}</h3>
            <p>Email: ${user.email}</p>
        `;
        userGrid.appendChild(card);
    });
}
