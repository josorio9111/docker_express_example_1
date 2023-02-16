const url = window.location.hostname.includes("localhost")
    ? "http://localhost:8080/api/auth/"
    : "https://" + window.location.hostname + "/api/auth/";

$('form').submit(function () {
    const formData = {};
    for (let el of $('form').elements) {
        formData[el.name] = el.value;
        // console.log(el.name);
    }

    fetch(url + 'login', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).
        then(({ message, token }) => {
            if (message) {
                return console.log(message);
            }
            localStorage.setItem('token', token);
            window.location = 'chat.html';

        })
        .catch(err => {
            console.log(err);
        });
});



function handleCredentialResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    const data = { id_token: response.credential };
    // console.log(data);
    fetch(url + 'google', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((resp) => resp.json())
        .then(({ token }) => {
            // console.log(token);
            localStorage.setItem('token', token);
            window.location = 'chat.html';
        })
        .catch(console.log);
}
window.onload = function () {
    google.accounts.id.initialize({
        client_id:
            "431475091753-1k8hn5rfprdlicincep82buueqrmmb0h.apps.googleusercontent.com",
        callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
    );

    // google.accounts.id.prompt(); // also display the One Tap dialog
};

function onSignout() {
    console.log("logout");
    localStorage.removeItem('token');
    google.accounts.id.disableAutoSelect();
}