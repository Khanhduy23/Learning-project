function toggleCode(codeId) {
    const codeExample = document.getElementById(codeId);
    if (codeExample.classList.contains('collapsed')) {
        codeExample.classList.remove('collapsed');
        codeExample.classList.add('expanded');
        document.querySelector(`button[onclick="toggleCode('${codeId}')"]`).textContent = 'Đóng lại';
    } else {
        codeExample.classList.remove('expanded');
        codeExample.classList.add('collapsed');
        document.querySelector(`button[onclick="toggleCode('${codeId}')"]`).textContent = 'Mở rộng';
    }
}

// function editCode(exampleId) {
//     window.location.href = `example/homeex.html?exampleId=${exampleId}`;
// }
function editCode(examplePage, exampleId) {
    window.location.href = `exams/space-exam-s1.html?examplePage=${examplePage}&exampleId=${exampleId}`;
}
