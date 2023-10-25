function Submit() {
    const url = "http://localhost:3000/register"; // Replace with the actual URL you want to send data to
    const data = {
        username: document.getElementById('usernameInput').value,
        password: document.getElementById('passwordInput').value,
        email: document.getElementById('emailInput').value
    };

    if (data.username==="" || data.email === "" || data.password === "") {
        const errorMsgElement = document.querySelector('.errorMsg');
        errorMsgElement.innerText = "Please enter credentials";
        return; // To exit the function or stop further execution
    }

    // Define the request options
    const options = {
        method: 'POST', // Use 'POST' method to send data
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(data) // Convert data to JSON format
    };

    // Perform the fetch request
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
           
            if(data.message==="User registered:"){
                alert("Account created")
                window.location.href = 'http://localhost:3000/Login';
            }else{
                const errorMsgElement = document.querySelector('.errorMsg');
                errorMsgElement.innerText = data.message;
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
