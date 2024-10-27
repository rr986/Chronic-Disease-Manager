function AddChronicHealth (add_func) {
    const handleChronic = async (e) => {
        const errorContainer = document.getElementById('error');
        errorContainer.hidden = true;
        e.preventDefault();
        let Condition = document.getElementById('Condition').value;
        let Checkup = document.getElementById('Checkup').value;
        try{
            add_func(Condition, Checkup);
        } catch(e){
            const errorTextElement = errorContainer.getElementsByClassName('text-goes-here')[0];
            errorTextElement.textContent = e;
            errorContainer.hidden = false;
        }

        document.getElementById('Condition').value = '';
        document.getElementById('Checkup').value = '';
    }
    return (
        <div>
            <div id= "error" hidden={true}><div className="alert alert-danger text-goes-here">
            </div>
        </div>
          <form id='simple-form' onSubmit={handleChronic}>
            <label style={{ fontSize: '22px' }}>
              Condition: 
              <input
                id='Condition'
                name='Condition'
                type='text'
                placeholder='Condition'
                style={{ fontSize: '18px' }}
              />
            </label>
            <br/>
            <label style={{ fontSize: '22px' }}>
              Last Checkup Date: 
              <input
                id='Checkup'
                name='Checkup'
                type='date'
                placeholder='Checkup'
                min={new Date()}
                style={{ fontSize: '18px' }}
              />
            </label>
    
            <input type='submit' value='Submit' style={{ fontSize: '16px' }} />
          </form>
        </div>
    )
}
export default AddChronicHealth;