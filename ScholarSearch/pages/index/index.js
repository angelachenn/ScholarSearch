document.getElementById("demo").addEventListener("click", myFunction);
    
function myFunction() {
  document.getElementById("result").innerHTML = "YOU CLICKED ME!";
}

export default {
  data: () => ({
    active5: false
  })
}