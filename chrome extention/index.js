//declaring a variable
let myleads = []

//getting id using DOM

const inputEL= document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const ulEL = document.getElementById("ul-el")
const deletebtn = document.getElementById("delete-btn")
const tabbtn = document.getElementById("tab-btn")

const saveleads =   JSON.parse(localStorage.getItem("myleads"))

console.log(saveleads)



//to keep the leads after refresh

if(saveleads){
    myleads = saveleads
    render(myleads)
}


//adding action to tab button
tabbtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        /*let activeTab = tabs[0]
        let activated = activeTab.id */

        myleads.push(tabs[0].url)
    localStorage.setItem("myleads",JSON.stringify(myleads))
    render(myleads)

    } )

})



//creating a function to render out the leads after getting them
function render(leads){
    // to make the leads disappear after clicking save
        let listitems = ""
    for(i=0; i<leads.length; i+=1) {
    //using the back stick for advanced string concatenation
        listitems +=`
        <li>
            <a target='_blank' href='${leads[i]}'> 
             ${leads[i]}
              </a>
        </li>
    `
    } 
    ulEL.innerHTML = listitems
    }
    



//adding function to the delete button
deletebtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myleads= []
    render(myleads)
})



//adding function or action to the save button
inputbtn.addEventListener("click",function(){
    // to get the value inserted by the user pushed into the array
    myleads.push(inputEL.value)
    render(myleads)
    inputEL.value=""
    //saving leads array to a local storage
    localStorage.setItem("myleads",  JSON.stringify(myleads))
    
})

