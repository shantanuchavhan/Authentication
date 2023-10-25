

function Submit() {
    const email= document.getElementById('emailInput').value
    const password=  document.getElementById('passwordInput').value
    if (email === "" || password === "") {
        const errorMsgElement = document.querySelector('.errorMsg');
        errorMsgElement.innerText = "Please enter credentials";
        return; // To exit the function or stop further execution
    }
    
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,password }), // Use the retrieved values
    })
    .then(response => response.json())
    .then(data => {
        alert("Welcome, Login succesful")
        window.location.href = 'http://localhost:3000/';
        
    })
    .catch(error => {
        // Handle errors
        console.error(error);
    });
}
