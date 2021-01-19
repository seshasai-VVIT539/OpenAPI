var fetchUrl = "https://crudcrud.com/api/a47d51f2775a4266805f6e3cf0882f80/";

async function fetchAllUsers() {
    return fetch(fetchUrl + "Users")
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch((error) => {
            console.log("error");
        });
}

function saveUser(user) {
    return fetch(fetchUrl + "Users/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.ok;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function updateUser(id, user) {
    return fetch(fetchUrl + "Users/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.ok;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function deleteUser(id) {
    return fetch(fetchUrl + "Users/" + id, {
            method: "DELETE"
        })
        .then(response => {
            return response.ok;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}