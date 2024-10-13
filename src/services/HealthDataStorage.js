//This method saves the user's health data into local storage.
//how can we make this hippa compliant
export const getHealthData = async () => {
  try {

  }
  catch(e){
    console.log(e);
  }
};

export const saveHealthData = async (data) => {
  try {
    const response = await fetch('http://your-backend-url.com/saveHealthData', {
      method: 'POST',
    });
    

  }
    catch(e){
      console.log(e);
    }
};
