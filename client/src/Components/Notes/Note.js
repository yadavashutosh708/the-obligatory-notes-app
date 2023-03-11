const Note = ({ note, toggleImportance }) => {

  if (!note) {
    return null;
  }
    const label = note.important 
      ? 'make not important' 
      : 'make important';
  
    return (
      <li className='note'>
        {note.content} 
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }
  
  export default Note