const mongoose = require('mongoose');
const url =  "mongodb+srv://ashu:Ak%4012345@cluster0.cxv9wkv.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

mongoose.connect(url).then(res => console.log('Database connected')).catch(error => console.log('error connecting to Database', error.message))

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

noteSchema.set('toJSON',
  {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id
      delete returnedObject.__v
    }
  }
)

module.exports = new mongoose.model('Note', noteSchema)