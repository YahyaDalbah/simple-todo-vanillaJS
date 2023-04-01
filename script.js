let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let main = document.querySelector('main')
let form = document.querySelector('form')
let addTaskInput = document.querySelector('#task')
let addAssigneeInput = document.querySelector('#assignee')
let tasksContainer = document.querySelector('.tasks-container')

form.addEventListener('submit', e => {
    e.preventDefault()
    if(addAssigneeInput.value != '' && addTaskInput.value != ''){
        tasks.push({
            id: Math.random(),
            completed: false,
            task: addTaskInput.value,
            assignee: addAssigneeInput.value
        })
    }
    addAssigneeInput.value = ''
    addTaskInput.value = ''
    localStorage.setItem('tasks', JSON.stringify(tasks))
    addTasks()
})




function addTasks(){
    tasksContainer.innerHTML = ''
    tasks.forEach((element, i) => {
        console.log(tasks)
        let div = document.createElement('div')
        div.classList.add('task')
        /*********************************** */
        let dataDiv = document.createElement('div')
        let btnDiv = document.createElement('div')
        let taskP = document.createElement('p')
        taskP.appendChild(document.createTextNode('task: ' + element.task))
        let assigneeP = document.createElement('p')
        assigneeP.appendChild(document.createTextNode('assignee: ' + element.assignee))
        let checkBox = document.createElement('input')
        checkBox.setAttribute('type', 'checkbox')
        checkBox.id = 'complete-task' + i
        let label = document.createElement('label')
        label.appendChild(document.createTextNode('complete'))
        label.setAttribute('for', checkBox.id)
        let editBtn = document.createElement('button')
        editBtn.appendChild(document.createTextNode('edit'))
        let deleteBtn = document.createElement('button')
        deleteBtn.appendChild(document.createTextNode('delete'))
        editBtn.className = 'edit'
        deleteBtn.className = 'delete'
        /************************************** */

        dataDiv.appendChild(checkBox)
        dataDiv.appendChild(label)
        dataDiv.appendChild(taskP)
        dataDiv.appendChild(assigneeP)

        btnDiv.appendChild(editBtn)
        btnDiv.appendChild(deleteBtn)

        div.appendChild(dataDiv)
        div.appendChild(btnDiv)

        tasksContainer.appendChild(div)
        console.log(div)
    });
}


