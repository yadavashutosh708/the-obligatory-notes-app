const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
    user: {
      id: '640709394953099b27537076',
      username: 'root',
      name: 'Superuser'
    }
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
    user: {
      id: '640709394953099b27537076',
      username: 'root',
      name: 'Superuser'
    }
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  console.log(typeof(notes));
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
}