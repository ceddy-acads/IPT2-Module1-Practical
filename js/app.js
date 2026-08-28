document.addEventListener('DOMContentLoaded', () => {

    // ADD STUDENT FUNCTION
    const addStudentBtn = document.getElementById('addStudentButton');
    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', addStudent);
    }

    // ADD SUBJECT FUNCTION
    const addSubjectBtn = document.getElementById('addSubject');
    if (addSubjectBtn) {
        addSubjectBtn.addEventListener('click', addSubject);
    }

});

function addStudent() {
    const idNumber = document.getElementById('idNumber').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const middleName = document.getElementById('middleName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    if (!idNumber || !firstName || !lastName) {
        alert('Please fill in at least ID Number, Firstname, and Lastname.');
        return;
    }

    const table = document.getElementById('table-content');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${idNumber}</td>
        <td>${firstName}</td>
        <td>${middleName}</td>
        <td>${lastName}</td>
    `;
    table.appendChild(row);

    document.getElementById('studentForm').reset();
}

let subjects = [];

function addSubject() {
    const codeInput = document.getElementById('subjectCode');
    const nameInput = document.getElementById('subjectName');
    const unitsInput = document.getElementById('units');

    const subjectCode = codeInput.value.trim();
    const subjectName = nameInput.value.trim();
    const units = unitsInput.value.trim();

    if (!subjectCode || !subjectName || !units) {
        alert('Please fill in Subject Code, Subject Name, and Units.');
        return;
    }

    subjects.push({
        id: Date.now(),
        code: subjectCode,
        name: subjectName,
        units: units
    });

    renderSubjectTable();
    clearForm(codeInput, nameInput, unitsInput);
}

function renderSubjectTable() {
    const tableBody = document.getElementById('table-content');
    tableBody.innerHTML = '';

    subjects.forEach(subject => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', subject.id);
        row.innerHTML = `
            <td>${escapeHtml(subject.code)}</td>
            <td>${escapeHtml(subject.name)}</td>
            <td>${escapeHtml(subject.units)}</td>
        `;
        tableBody.appendChild(row);
    });
}

function clearForm(...inputs) {
    inputs.forEach(input => (input.value = ''));
    inputs[0].focus();
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

//checked