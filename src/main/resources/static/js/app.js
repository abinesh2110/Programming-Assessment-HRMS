document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    loadEmployees();
    loadDepartments();
    loadRoles();
    loadEmployeesForReview(); // Load employees for the review section
    loadReviews();
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------
//EMPLOYEE

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

function loadEmployees() {
    console.log('Loading employees...'); // Check if function is called
    fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            console.log('Employees data:', data); // Check the data received
            displayEmployees(data);
        })
        .catch(error => console.error('Unable to get employees.', error));
}

function displayEmployees(employees) {
    console.log(employees); // Check the data received

    const tableBody = document.getElementById('employeesTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    employees.forEach(employee => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.email}</td>
            <td>${employee.department ? employee.department.name : ''}</td>
            <td>${employee.role ? employee.role.name : ''}</td>
            <td>
                <button onclick="editEmployee(${employee.id})">Edit</button>
                <button onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        `;
    });
}

document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const employeeData = {
        id: document.getElementById('employeeId').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        departmentId: document.getElementById('department').value,
        roleId: document.getElementById('role').value
    };

    const url = employeeData.id ? `/api/employees/${employeeData.id}` : '/api/employees';
    const method = employeeData.id ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData)
    })
    .then(response => response.json())
    .then(() => {
        clearForm();
        loadEmployees();
    })
    .catch(error => console.error('Unable to save employee.', error));
});


function editEmployee(id) {
    fetch(`/api/employees/${id}`)
       .then(response => response.json())
       .then(data => {
            document.getElementById('employeeId').value = data.id;
            document.getElementById('firstName').value = data.firstName;
            document.getElementById('lastName').value = data.lastName;
            document.getElementById('email').value = data.email;
            document.getElementById('department').value = data.department.id; // Set selected department
            document.getElementById('role').value = data.role.id; // Set selected role
        })
       .catch(error => console.error('Unable to get employee.', error));
}

function deleteEmployee(id) {
    fetch(`/api/employees/${id}`, {
        method: 'DELETE'
    })
    .then(() => loadEmployees())
    .catch(error => console.error('Unable to delete employee.', error));
}

function clearForm() {
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeId').value = '';
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------
// DEPARTMENTS


function loadDepartments() {
    fetch('/api/departments')
       .then(response => response.json())
       .then(data => {
            displayDepartments(data); // Display departments in the table
            populateDepartmentDropdown(data); // Populate the dropdown in the employee form
        })
       .catch(error => console.error('Unable to get departments.', error));
}

function populateDepartmentDropdown(departments) {
    const select = document.getElementById('department');
    select.innerHTML = departments.map(dept => `<option value="${dept.id}">${dept.name}</option>`).join('');
}

function displayDepartments(departments) {
    const tableBody = document.getElementById('departmentsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing data

    departments.forEach(department => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${department.id}</td>
            <td>${department.name}</td>
            <td>
                <button onclick="editDepartment(${department.id})">Edit</button>
                <button onclick="deleteDepartment(${department.id})">Delete</button>
            </td>
        `;
    });
}

document.getElementById('departmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const departmentId = document.getElementById('departmentId').value;
    const departmentData = {
        name: document.getElementById('departmentName').value
    };

    const url = departmentId ? `/api/departments/${departmentId}` : '/api/departments';
    const method = departmentId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(departmentData)
    })
    .then(response => response.json())
    .then(() => {
        clearForm();
        loadDepartments();
    })
    .catch(error => console.error('Unable to save department.', error));
});

function editDepartment(id) {
    fetch(`/api/departments/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('departmentId').value = data.id;
            document.getElementById('departmentName').value = data.name;
        })
        .catch(error => console.error('Unable to get department.', error));
}

function deleteDepartment(id) {
    fetch(`/api/departments/${id}`, {
        method: 'DELETE'
    })
    .then(() => loadDepartments())
    .catch(error => console.error('Unable to delete department.', error));
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------
// ROLES

function loadRoles() {
    fetch('/api/roles')
       .then(response => response.json())
       .then(data => {
            displayRoles(data); // Display roles in the table
            populateRoleDropdown(data); // Populate the dropdown in the employee form
        })
       .catch(error => console.error('Unable to get roles.', error));
}

function populateRoleDropdown(roles) {
    const select = document.getElementById('role');
    select.innerHTML = roles.map(role => `<option value="${role.id}">${role.name}</option>`).join('');
}

function displayRoles(roles) {
    const tableBody = document.getElementById('rolesTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    roles.forEach(role => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${role.id}</td>
            <td>${role.name}</td>
            <td>
                <button onclick="editRole(${role.id})">Edit</button>
                <button onclick="deleteRole(${role.id})">Delete</button>
            </td>
        `;
    });
}

document.getElementById('roleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const roleId = document.getElementById('roleId').value;
    const roleData = {
        name: document.getElementById('roleName').value
    };

    const url = roleId ? `/api/roles/${roleId}` : '/api/roles';
    const method = roleId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData)
    })
    .then(response => response.json())
    .then(() => {
        clearForm();
        loadRoles();
    })
    .catch(error => console.error('Unable to save role.', error));
});

function editRole(id) {
    fetch(`/api/roles/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('roleId').value = data.id;
            document.getElementById('roleName').value = data.name;
        })
        .catch(error => console.error('Unable to get role.', error));
}

function deleteRole(id) {
    fetch(`/api/roles/${id}`, {
        method: 'DELETE'
    })
    .then(() => loadRoles())
    .catch(error => console.error('Unable to delete role.', error));
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------
// REVIEWS
// function loadEmployeesForReview() {
//     fetch('/api/employees')
//        .then(response => response.json())
//        .then(data => {
//         displayReviews(data); // Display roles in the table
//         populateEmployeeDropdownForReview(data); // Populate the dropdown in the employee form
//     })
//        .catch(error => console.error('Unable to get employees for review.', error));
// }

function loadEmployeesForReview() {
    fetch('/api/employees')
      .then(response => response.json())
      .then(data => populateEmployeeDropdownForReview(data)) // Corrected to populate the dropdown
      .catch(error => console.error('Unable to get employees for review.', error));
}
function loadReviews() {
    fetch('/api/reviews')
        .then(response => response.json())
        .then(data => displayReviews(data))
        .catch(error => console.error('Unable to get reviews.', error));
}

function populateEmployeeDropdownForReview(employees) {
    const select = document.getElementById('employeeSelect');
    select.innerHTML = employees.map(employee => `<option value="${employee.id}">${employee.firstName} ${employee.lastName}</option>`).join('');
}

function displayReviews(reviews) {
    console.log(reviews);
    const tableBody = document.getElementById('reviewsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    reviews.forEach(review => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${review.id}</td>
            <td>${review.employee ? review.employee.firstName : ''}</td>
            <td>${review.reviewDate}</td>
            <td>${review.comments}</td>
            <td>
                <button onclick="editReview(${review.id})">Edit</button>
                <button onclick="deleteReview(${review.id})">Delete</button>
            </td>
        `;
    });
}

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const reviewId = document.getElementById('reviewId').value;
    const reviewData = {
        employeeId: document.getElementById('employeeSelect').value,
        reviewDate: document.getElementById('reviewDate').value,
        comments: document.getElementById('comments').value
    };

    const url = reviewId ? `/api/reviews/${reviewId}` : '/api/reviews';
    const method = reviewId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(() => {
        clearForm();
        loadReviews();
    })
    .catch(error => console.error('Unable to save review.', error));
});

function editReview(id) {
    fetch(`/api/reviews/${id}`)
       .then(response => response.json())
       .then(data => {
            document.getElementById('reviewId').value = data.id;
            document.getElementById('employeeSelect').value = data.employee.id; // Ensure this matches the employee ID
            document.getElementById('reviewDate').value = data.reviewDate;
            document.getElementById('comments').value = data.comments;
        })
       .catch(error => console.error('Unable to get review.', error));
}

function deleteReview(id) {
    fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })
    .then(() => loadReviews())
    .catch(error => console.error('Unable to delete review.', error));
}

