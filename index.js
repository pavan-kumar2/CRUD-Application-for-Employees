let formSubmit = document.getElementById("formSubmit");

let isEditing = false;

let idOfEmp;

formSubmit.addEventListener("submit", function (e) {
    e.preventDefault();

    if (isEditing == false) {
        // let empId = document.getElementById("id").value
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
        let id = document.getElementById("id").value
        let empName = document.getElementById("empName").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let jobRole = document.getElementById("jobRole").value;
        let salary = document.getElementById("salary").value;

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
    .then((data) => {
        // console.log(data);
        data.forEach(ele => {
            empList.innerHTML += `<div class="emp-card">
            <h3>Id: <span>${ele.id}</span></h3>
        <h3>Name: <span>${ele.empName}</span></h3>
        <h3>Email: <span>${ele.email}</span></h3>
        <h3>Phone: <span>${ele.phone}</span></h3>
        <h3>Job Role: <span>${ele.jobRole}</span></h3>
        <h3>Salary: <span>${ele.salary}</span></h3>
        <div class='btn-grp'><button onclick="editEmp(${ele.id})">Edit</button><button onclick="deleteEmp(${ele.id})">Delete</button></div>
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
        .then((resData) => {
            // console.log(resData);

            idEmp.value = resData.id;
            nameEmp.value = resData.empName;
            emailEmp.value = resData.email;
            phoneEmp.value = resData.phone;
            jobRoleEmp.value = resData.jobRole;
            salaryEmp.value = resData.salary;

        }).catch((errMsg) => console.log(errMsg.message));

    idOfEmp = id;

    isEditing = true;

    let formGrp = document.querySelector('.form-grp');

    formGrp.scrollIntoView();
}