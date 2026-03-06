//exporting the function
export {createList}

//creating the function that will add new budget into he budget List
function createList(tbody,expenseClass,expenseTrackerArray, saveToStorage, getTotalIncome, getTotalExpense, getBalance,budgetCategory,categoryOption,loadFromStorage ){
for (let expense of expenseClass){
    let expenseRow = tbody.insertRow(-1)

//checking what type of list is to be created
expense.type == "Expense" ? expenseRow.classList.add('expense') : expenseRow.classList.add('income') //end of type

//creating title column
let expenseListTitle = expenseRow.insertCell(-1)
expenseListTitle.textContent = expense.title

//creating amount column
let expenseListAmount = expenseRow.insertCell(-1)
expenseListAmount.textContent = expense.amount

//creating the button column
let expenseListButton = document.createElement('button')
expenseListButton.textContent = "x"
expenseListButton.id = Date()

//creating the category colum
let expenseCategory = expenseRow.insertCell(-1)
expenseCategory.textContent = expense.categories
expenseCategory.className ='td_categories'
expenseCategory.appendChild(expenseListButton)




//setting the delete button when clicked
expenseListButton.onclick = (e)=>{
   let budget_posi = Array.from (e.target.parentElement.parentElement.parentElement.children).indexOf(e.target.parentElement.parentElement)

   //removing the deleted budget from  the expenseTracker
   expenseTrackerArray.splice(budget_posi - 1,1)
   saveToStorage({expenseTrackerArray})

//getting all the category in the expenseTracker
let tracket_category = expenseTrackerArray.map(e => {
    return e.categories
})
let budgetCategor = budgetCategory.filter (e => {
    
    //removing category from the dropdown
    if(!(tracket_category.includes(e))){
for (let cate of categoryOption.children){
    if (cate.value == e){
        cate.remove()
    }
}
    }
    return tracket_category.includes(e) 
})

budgetCategory.splice(0,budgetCategory.length, ...budgetCategor)
saveToStorage({budgetCategory})
if (budgetCategory.length <2){
    categoryOption.hidden = true
    
}

    expenseListButton.parentElement.parentElement.remove()
    getTotalIncome()
    getTotalExpense()
    getBalance()
   
}//end of button clicked



//appending the amount and delete button
expenseRow.appendChild(expenseListTitle)
expenseRow.appendChild(expenseListAmount)
expenseRow.appendChild(expenseCategory)





}
}

//Creating the budget
