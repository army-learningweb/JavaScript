let data = [
    {
        taskname: 'readingbook',
        taskstatus: false
    },
    {
        taskname: 'playinggame',
        taskstatus: false
    },
]

let saveData = (data) => localStorage.setItem('todolist', JSON.stringify(data));

let getData = () => JSON.parse(localStorage.getItem('todolist'));

