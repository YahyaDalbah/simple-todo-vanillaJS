let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let main = document.querySelector('main')
let form = document.querySelector('form')
let addTaskInput = document.querySelector('#task')
let addAssigneeInput = document.querySelector('#assignee')
let tasksContainer = document.querySelector('.tasks-container')
let searchBar = document.querySelector('.search-input')

addTasks(tasks) 

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
    addTasks(tasks)
})




function addTasks(tasks){
    tasksContainer.innerHTML = ''
    tasks.forEach((element, i) => {
        let div = document.createElement('div')
        div.classList.add('task')
        if(element.completed){
            div.classList.add('done')
        }
        /*********************************** */
        let dataDiv = document.createElement('div')
        let btnDiv = document.createElement('div')
        let taskP = document.createElement('p')
        let taskSpan = document.createElement('span')
        taskSpan.appendChild(document.createTextNode(element.task))
        taskP.appendChild(document.createTextNode('task: '))
        taskP.appendChild(taskSpan)
        let assigneeP = document.createElement('p')
        let assigneeSpan = document.createElement('span')
        assigneeSpan.appendChild(document.createTextNode(element.assignee))
        assigneeP.appendChild(document.createTextNode('assignee: '))
        assigneeP.appendChild(assigneeSpan)
        let checkBox = document.createElement('input')
        checkBox.setAttribute('type', 'checkbox')
        if(element.completed){
            checkBox.setAttribute('checked', true)
        }
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
        div.id = element.id

        tasksContainer.appendChild(div)
    });
}

//delete
tasksContainer.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        let parent = e.target.closest('.task')
        tasks = tasks.filter(element => {
            return element.id != parent.id
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
        parent.remove()
    }
})

//complete
tasksContainer.addEventListener('click', e => {
    if(e.target.getAttribute('type') == 'checkbox'){
        let parent = e.target.closest('.task')
        tasks = tasks.map(element => {
            if(element.id == parent.id){
                return {
                    ...element,
                    completed: !element.completed,
                }
            }else{
                return element
            }

        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
        if(parent.classList.contains('done')){
            parent.classList.remove('done')
        }else{
            parent.classList.add('done')
        }
    }
})

//search
searchBar.addEventListener('input', e => {
    let value = e.target.value
    const newtasks = tasks.filter(element => {          //question: why when u set 'tasks' to 'newtasks' it doesn't work properly?
        return element.task.includes(value)
    })
    addTasks(newtasks)
})

//edit
tasksContainer.addEventListener('click', e => {
    if(e.target.classList.contains('edit')){
        let parent = e.target.closest('.task')
        if(parent.classList.contains('editing')){
            return
        }
        parent.classList.add('editing')
        let div = parent.firstChild
        let taskSpan = document.querySelectorAll('.editing span')[0]
        let assigneeSpan = document.querySelectorAll('.editing span')[1]
        let btn = document.createElement('button')
        btn.innerHTML = 'confirm'
        taskSpan.innerHTML = `<input type="text" class="editing-input" >`
        assigneeSpan.innerHTML = `<input type="text" class="editing-input" >`
        div.appendChild(btn)
        btn.onclick = () => {
            let inputs = document.querySelectorAll('.editing-input')
            let taskValue = inputs[0].value
            let assigneeValue = inputs[1].value
            if(taskValue == '' || assigneeValue == ''){
                return
            }
            const newtasks = tasks.map(element => {
                if(element.id == parent.id){
                    return {
                        ...element,
                        task: taskValue,
                        assignee: assigneeValue
                    }
                }else{
                    return element
                }
            })
            addTasks(newtasks)
            localStorage.setItem('tasks', JSON.stringify(newtasks))
        }
    }
})

