/**
 * Switch to login page
 */
$('#toLogin').click(function(e) {
    e.preventDefault();
    $('#fingertouch2').hide();
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
    $('#fingertouch2').hide();
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
                $('#fingertouch2').hide();
                $('#mainContainer').show();
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
            return response
        })
}

$('#logoutButton').click(() => {
    localStorage.removeItem("token")
    $('#registerContainer').hide();
    $('#mainContainer').hide();
    $('#loginContainer').show();
})