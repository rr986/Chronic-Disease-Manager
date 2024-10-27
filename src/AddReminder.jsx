const AddReminder = (add_func) => {
  const handleSubmit = async (e) => {
      const errorContainer = document.getElementById('error');
      errorContainer.hidden = true;
      e.preventDefault();

      let title = document.getElementById('title').value;
      let description = document.getElementById('description').value;
      let due = document.getElementById('due').value;

      try {
          // Await the add_func call
          await add_func(title, description, due);
          // Clear inputs only after successful submission
          document.getElementById('title').value = '';
          document.getElementById('description').value = '';
          document.getElementById('due').value = '';
      } catch (error) {
          const errorTextElement = errorContainer.getElementsByClassName('text-goes-here')[0];
          errorTextElement.textContent = e.message || 'An error occured'; // Ensure we get the message
          errorContainer.hidden = false;
      }
  };

  return (
      <div>
          <div id="error" hidden={true}>
              <div className="alert alert-danger text-goes-here"></div>
          </div>
          <form id='simple-form' onSubmit={handleSubmit}>
              <label style={{ fontSize: '22px' }}>
                  Title: 
                  <input id='title' name='title' type='text' placeholder='title' style={{ fontSize: '20px' }} />
              </label>
              <br />
              <label style={{ fontSize: '22px' }}>
                  Description: 
                  <input id='description' name='description' type='textarea' placeholder='description' style={{ fontSize: '20px' }} />
              </label>
              <br />
              <label style={{ fontSize: '22px' }}>
                  Due: 
                  <input id='due' name='due' type='date' placeholder='due' style={{ fontSize: '20px' }} min={new Date().toISOString().split('T')[0]} />
              </label>
              <input type='submit' value='Submit' style={{ fontSize: '16px' }}/>
          </form>
      </div>
  );
};

export default AddReminder;
