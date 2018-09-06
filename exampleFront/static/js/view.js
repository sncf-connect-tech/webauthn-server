/**
 * Switch to login page
 */
$('#toLogin').click(function(e) {
    e.preventDefault();
    $('#registerContainer').hide();
    $('#loginContainer').show();
})

/**
 * Switch to registration page
 */
$('#toRegistration').click(function(e) {
    e.preventDefault();
    $('#loginContainer').hide();
    $('#fingertouch').hide();
    $('#registerContainer').show();
})

let loadMainContainer = () => {
    return fetch('http://localhost:3000/personalInfo', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        }
    })
        .then((response) => response.json())
        .then((response) => {
            if(response.status === 'ok') {
                $('#theSecret').html(response.theSecret)
                $('#name').html(response.name)
                $('#registerContainer').hide();
                $('#loginContainer').hide();
                $('#mainContainer').show();
            } else {
                alert(`Error! ${response.message}`)
            }
        })
}

let checkIfLoggedIn = () => {
    return fetch('http://localhost:3000/isLoggedIn', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        }
    })
        .then((response) => response.json())
        .then((response) => {
            if(response.status === 'ok') {
                return true
            } else {
                return false
            }
        })
}

$('#logoutButton').click(() => {
    fetch('http://localhost:3000/logout', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        }
    }.then((response) => {
        localStorage.setItem("token", response.token)
    }));
    $('#registerContainer').hide();
    $('#mainContainer').hide();
    $('#loginContainer').show();
})