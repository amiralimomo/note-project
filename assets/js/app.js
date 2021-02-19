
//variables
const notelist = document.querySelector('#note-list')
let Notes = []
//eventlistener
eventLesteners()
function eventLesteners() {
    document.querySelector('#form').addEventListener('submit', newNote)
    document.querySelector('#note-list').addEventListener('click', removeNote)
    document.addEventListener('DOMContentLoaded', getDataOnLoad)
}

//functions

function newNote(e) {
    e.preventDefault()
    const note = e.target.elements.note.value
    e.target.elements.note.value = ''
    createTags(note)
    addNoteToLS(note)
}
//create tags
function createTags(note) {
    const removebtn = document.createElement('a')
    removebtn.textContent = 'X'
    removebtn.classList = 'remove-note'
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(note))
    li.appendChild(removebtn)
    notelist.appendChild(li)

}
function removeNote(e) {
    if (e.target.classList.contains('remove-note')) {
        removeFromLS(e.target.parentElement.textContent)

        e.target.parentElement.remove()
    }

}
function removeFromLS(notecontent) {
    let deletenote = notecontent.substring(0, notecontent.length - 1)
    Notes.forEach((note, index) => {
        if (note === deletenote) {
            Notes.splice(index, 1)
        }
    })
    localStorage.setItem('Notes', JSON.stringify(Notes))


}

function addNoteToLS(note) {
    getNotesFromLS()
    Notes.push(note)
    localStorage.setItem('Notes', JSON.stringify(Notes))

}


function getNotesFromLS() {
    let getFromLS = localStorage.getItem('Notes')
    if (getFromLS !== null) {
        Notes = JSON.parse(getFromLS)
    }
}


function getDataOnLoad() {
    getNotesFromLS()
    Notes.forEach((note) => {
        createTags(note)
    })
}

