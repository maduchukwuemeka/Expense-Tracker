// importing the transaction Class from the Transaction Module
import { _Transaction } from "./model/transaction.js";
import { trim, checkbalance,editValueOfBudget,CategoryNameBalance,categoryName } from "./utils/helpers.js";
import { saveToStorage, loadFromStorage} from "./Service/storage.js"
import { createList } from "./utils/create_expense.js";
import { pushIntoCategoryDropdown,creatCategoryDropdown } from "./utils/create_category_dropdown.js";
import { error } from "./utils/error_message.js";


// getting all the DOM I need
let Button = document.getElementById('button')
let defaultSelectOption =document.getElementById("defaultSelect")
let budgetOptionType =document.getElementById("budgetOptionType")
let title = document.getElementById('title')
let category = document.getElementById('category')
let transactionAmount = document.getElementById('amount')
let allExpense = document.querySelector('.list')
let categoryOption = document.getElementById("filterOptionType")
let expenseSum = document.getElementById("expense")
let incomeSum = document.getElementById("income")
let balance = document.getElementById("balance-amount")
let checkHistoryBox = document.getElementById("historyCheckBox")
let historyDiv = document.getElementById("historyId")
let allBudget = document.getElementById("allBudget")
let tbody =document.getElementById("tbody")
let expenseText =document.getElementById('expenseText')
let incomeText = document.getElementById('incomeText')
let balanceText = document.getElementById('balance')

let expenseTrackerArray //all expenses
let budgetCategory
let catgoryName

//showing history or not
checkHistoryBox.addEventListener('click',renderTransactions)

//getting the Local storage when document is reloaded
document.addEventListener('DOMContentLoaded', loadDOM)

//listen to the button being clicked
Button.addEventListener('click', addTransaction)

//listening for filtering of budget by categories
categoryOption.addEventListener('change',filteri)


//function to add Transaction
function addTransaction(){
// if the text does not contain only space
if (trim(title).length > 0  && budgetOptionType.value != '' && trim(category).length > 0 && transactionAmount.value != ''){
    
   //creating the transaction class
let transaction = new _Transaction(trim(title), transactionAmount.value,budgetOptionType.value, trim(category))


//appending a new budget to the budget list
createList(tbody,[transaction], expenseTrackerArray,saveToStorage, getTotalIncome, getTotalExpense, getBalance, budgetCategory,categoryOption, loadFromStorage)
expenseTrackerArray.push(transaction)
allExpense.hidden =false

//editing the budget total
transaction.type == "Expense" ? editValueOfBudget(expenseSum, transaction) : editValueOfBudget(incomeSum,transaction) 
getBalance()

//checking if category already exist and pushing it to the category if not existing
if (!(budgetCategory.includes(trim(category)))){
budgetCategory.push(trim(category))
// pushing the category into the dropdown
pushIntoCategoryDropdown(categoryOption,trim(category))
}
category.value ='', title.value ='',  budgetOptionType.value = defaultSelectOption.value, transactionAmount. value = ""

//checking if the budgetCategory is more than one
if (budgetCategory.length >1){
    categoryOption.removeAttribute('hidden')   
}

//saving to localstorage
saveToStorage({expenseTrackerArray})
saveToStorage({budgetCategory})
} //end of function to add Transaction
 
 else{
    
  trim(title).length >0 || error(title) 
  budgetOptionType.value != '' || error(budgetOptionType)
   trim(category).length > 0 || error(category)
   transactionAmount.value != '' || error(transactionAmount)
}
}

//function to delete a Transaction
function deleteTransaction(){

}



//function to render Transactions history
function renderTransactions(){
    if (checkHistoryBox.checked){
        historyDiv.hidden = false

    }
    else{
        historyDiv.hidden =true
    }

}


//to calculate the total income
function getTotalIncome(){
    let incomeTrack = Array.from(tbody.rows).filter(e => e.className !== 'expense' && e.style.display !='none').reduce((firstVal,secondval) => Number(firstVal) +Number(secondval.cells[1].textContent),0)
incomeSum.innerHTML = `+$${incomeTrack}`
return incomeSum.textContent


}

//calculating total expensess
function getTotalExpense(){
let expenseTrack = Array.from(tbody.rows).filter(e => e.className == 'expense' && e.style.display !='none' ).reduce((firstVal,secondval) => Number(firstVal) +Number(secondval.cells[1].textContent),0)
expenseSum.innerHTML = `-$${expenseTrack}`
return expenseSum.textContent
}

//calculating balance
function getBalance(){
    let balanceValue = getTotalIncome().slice(2) - getTotalExpense().slice(2)
    
checkbalance(balance, balanceValue)

}

//arrloading function
function loadDOM()
{
    //initializing the expenseTrackerArray
    try{
        expenseTrackerArray = loadFromStorage("expenseTrackerArray")
        budgetCategory = loadFromStorage("budgetCategory")
        creatCategoryDropdown(categoryOption,budgetCategory)
        createList(tbody,expenseTrackerArray, expenseTrackerArray,saveToStorage, getTotalIncome, getTotalExpense, getBalance, budgetCategory,categoryOption,loadFromStorage)
        getTotalExpense()
        getTotalIncome()
        getBalance()



        //making the table not hidden
        if(Array.from(allExpense.children).length > 1){
            allExpense.hidden =false
        }


    }
    catch(e){
        throw new Error(e);    
    }
    
//checking if the budgetCategory is more than one
if (budgetCategory.length >1){
    categoryOption.removeAttribute('hidden')
    
}
    
    
}

//getting the exporting of the util
export function cloneArray(Arr){
    return JSON.parse(JSON.stringify(Arr))
}


//filtering
function filteri(e){
    
if (categoryOption.value !== "Net" && categoryOption.value !== ""){
    
    allBudget.hidden = false 

    Array.from(document.getElementsByClassName("td_categories")).map(e =>{
    
    if(e.childNodes[0].textContent != categoryOption.value){
        (e.childNodes[0].parentElement.parentElement.style.display = 'none')
    }
   else{
    e.childNodes[0].parentElement.parentElement.style.display ="flex"
   }
})

}
else{Array.from(document.getElementsByClassName("td_categories")).map(e =>{
     e.childNodes[0].parentElement.parentElement.style.display ="flex"
    })}

getTotalExpense()
getTotalIncome()
getBalance()
categoryName(categoryOption,incomeText)
categoryName(categoryOption,expenseText)
CategoryNameBalance(categoryOption, balanceText)

// Array.from(allExpense.rows).map(e =>{
//   Array.from( ((e.cells)[2].childNodes[0])).map(e=>{
//     if(e !== categoryOption.value ){
//         e
//     }
//   })
// }

// )

}
