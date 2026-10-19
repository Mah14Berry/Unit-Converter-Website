//Browser Page

//initial state
document.getElementById('results_page').style.display = 'none';
//page: used to check which unit tab (length, weight, temperature) you're on
const page = window.location.pathname;

//submit button
document.getElementById('unitForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  //get the data (value, firstUnit, lastUnit) from the form
  const formData = new FormData(e.target);
  //convert formData to human-readable 
  const data = Object.fromEntries(formData.entries());
  //help switch to other units
  if(page.includes('length.html')){
    data.type = 'length';
  } else if(page.includes('weight.html')){
    data.type = 'weight';
  } else if(page.includes('temperature.html')){
    data.type = 'temperature';
  }

  //send formdata to server
  const res = await fetch('/api/submit', { 
    method: 'POST', 
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });

  //await response from server -> results page
  const result = await res.json();
  // const result_display = result;
  document.querySelector('.description').style.display = 'none';  
  document.querySelector('.inputs').style.display = 'none';  
  document.getElementById('results_page').style.display = 'block';
  if(res.ok){
    document.getElementById('results').textContent = result;
  } else {
    document.getElementById('results').textContent = result.error;
  }
  console.log(result);
});

//return page to normal after pressing reset
document.getElementById('reset').addEventListener('click',()=>{
  document.querySelector('.description').style.display = 'block';  
  document.querySelector('.inputs').style.display = 'block';  
  document.getElementById('results_page').style.display = 'none';
});
