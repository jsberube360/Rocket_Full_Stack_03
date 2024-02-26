/**	CONTACT FORM jquery
*************************************************** **/
var _hash = window.location.hash;

jQuery(_hash).show();

// variables section

const fullName = document.getElementById('fullname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const companyName = document.getElementById('company_name');
const projectName = document.getElementById('project_name');
const projectDesc = document.getElementById('project_desc');
const department = document.getElementById('department');
const message = document.getElementById('message');
const file = document.getElementById('file');
const url = 'http://localhost:3004/contact';


// Validate that all required fields are filled and if so runs submitForm

function areAllRequiredFieldsFilled(){
	if ((fullName.value !== '') && (email.value !== '') && (phone.value !== '') && (companyName.value !== '') && 
	(projectName.value !== '') && (projectDesc.value !== '') && (department.value !== '') && (message.value !== '')) {
		submitForm ();
	}
}


// POST request to send the inputs of our contact form to a server and pop the proper modal (success or failed message) 
// depending on server response

async function submitForm() {
	const body = {'fullname' : fullName.value, 'email' : email.value, 'phone' : phone.value, 'company_name' : companyName.value, 
	'project_name' : projectName.value, 'project_desc' : projectDesc.value, 'department' : department.value, 'message' : message.value,
	'file' : file.value};
    try {
		const response = await fetch(url, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)});
		if (response.status !== 201) {
			throw new Error ('Invalid parameters');
		}
		const data = await response.json();
		console.log('Success:', data);
		$('#success-message').modal('show');
	}
	catch (error) {
		console.error('Error:', error);
		$('#failed-message').modal('show');
	}
}

// Event listeners for contact form

let submitFormButton = document.getElementById('submit_form');
submitFormButton.addEventListener('click', areAllRequiredFieldsFilled);

// part of the modal function

$('#contact-form').on('submit', function(e){
	console.log(file.value)
	e.preventDefault();
	this.reset();
});