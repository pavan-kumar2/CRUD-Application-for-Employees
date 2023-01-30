let formSubmit = document.getElementById("formSubmit");

let isEditing = false;

let idOfEmp;

formSubmit.addEventListener("submit", function (e) {
    e.preventDefault();

    let id = document.getElementById("id").value
    let empName = document.getElementById("empName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let jobRole = document.getElementById("jobRole").value;
    let salary = document.getElementById("salary").value;

    let empdata = {
        empName,
        email,
        phone,
        jobRole,
        salary
    };

    if (isEditing == false) {

        fetch("http://localhost:3000/employee", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(empdata)
            }).then((response) => {
                alert("Saved Successfully")
            })
            .catch((err) => {
                console.log(err.message)
            })
    } else {

        let empdata = {
            id,
            empName,
            email,
            phone,
            jobRole,
            salary
        };

        fetch("http://localhost:3000/employee/" + idOfEmp, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(empdata)
            }).then((response) => {
                alert("Updated Successfully")
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

})


let empList = document.getElementById("empList");

fetch("http://localhost:3000/employee")
    .then((response) => response.json())
    .then((emplyeesData) => {
        // console.log(data);
        emplyeesData.forEach(employee => {
            empList.innerHTML += `<div class="emp-card">
            <h3>Id: <span>${employee.id}</span></h3>
        <h3>Name: <span>${employee.empName}</span></h3>
        <h3>Email: <span>${employee.email}</span></h3>
        <h3>Phone: <span>${employee.phone}</span></h3>
        <h3>Job Role: <span>${employee.jobRole}</span></h3>
        <h3>Salary: <span>${employee.salary}</span></h3>
        <div class='btn-grp'><button onclick="editEmp(${employee.id})">Edit</button><button onclick="deleteEmp(${employee.id})">Delete</button></div>
        </div>`
        });
    }).catch((err) => console.log(err.message));



function deleteEmp(id) {
    window.confirm("Do you want to delete") ?
        fetch("http://localhost:3000/employee/" + id, {
            method: "DELETE",
        }).catch((err) => {
            console.log(err.message)
        }) : window.location.reload();

}

let idEmp = document.getElementById("id");
let nameEmp = document.getElementById("empName");
let emailEmp = document.getElementById("email");
let phoneEmp = document.getElementById("phone");
let jobRoleEmp = document.getElementById("jobRole");
let salaryEmp = document.getElementById("salary");


function editEmp(id) {
    fetch("http://localhost:3000/employee/" + id)
        .then((responseData) => responseData.json())
        .then((empData) => {
            // console.log(resData);

            idEmp.value = empData.id;
            nameEmp.value = empData.empName;
            emailEmp.value = empData.email;
            phoneEmp.value = empData.phone;
            jobRoleEmp.value = empData.jobRole;
            salaryEmp.value = empData.salary;

        }).catch((errMsg) => console.log(errMsg.message));

    idOfEmp = id;

    isEditing = true;

    let addEmp = document.querySelector(".add-emp");

    addEmp.innerHTML = " <h2>Edit Employee:</h2>";

    let formGrp = document.querySelector('.form-grp');

    formGrp.scrollIntoView();
}