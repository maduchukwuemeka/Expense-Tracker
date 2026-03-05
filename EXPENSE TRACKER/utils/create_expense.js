//exporting the function
export {createList}

//creating the function that will add new budget into he budget List
function createList(allExpense,expenseClass,expenseTrackerArray, saveToStorage, getTotalIncome, getTotalExpense, getBalance,budgetCategory,categoryOption,loadFromStorage ){
for (let expense of expenseClass){
    let expenseRow = document.createElement('tr')

//checking what type of list is to be created
expense.type == "Expense" ? expenseRow.classList.add('expense') : expenseRow.classList.add('income') //end of type


//creating amount column
let expenseListAmount = document.createElement('td')
expenseListAmount.textContent = expense.amount


//creating title column
let expenseListTitle = document.createElement('td')
expenseListTitle.textContent = expense.title


//creating the button column
let expenseListButton = document.createElement('button')
expenseListButton.textContent = "x"
expenseListButton.id = Date()


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

//creating the category colum
let expenseCategory = document.createElement('td')
expenseCategory.textContent = expense.categories
expenseCategory.className ='td_categories'
expenseCategory.appendChild(expenseListButton)

//appending the amount and delete button
expenseRow.appendChild(expenseListTitle)
expenseRow.appendChild(expenseListAmount)
expenseRow.appendChild(expenseCategory)


allExpense.appendChild(expenseRow)



}
}

//Creating the budget