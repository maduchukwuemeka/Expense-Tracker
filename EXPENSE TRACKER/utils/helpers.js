//exporting the funtion
export {trim,checkbalance, editValueOfBudget,categoryName,CategoryNameBalance}



//triming values
function trim (val){
return val.value.trim()
}


// calculating the total
function checkbalance(balance, balanceValue){
    balance.className = ''
   balance.innerHTML = `$${balanceValue}`
balance.classList.add(balanceValue >0 ? 'plus' :'minus' )
 
}

//editing the income and expenses
function editValueOfBudget(init, budget){
    let num = Number (init.textContent.slice(2))
   init.textContent = budget.type == "Expense" ? "-$"  + ( Math.abs( num - budget.amount)).toString() : "+$" + Math.abs((num + budget.amount).toString())
   return init
}

function categoryName(name, pos){
    let Name = pos.id == 'incomeText' ? "Income" : "Expenses"
    pos.textContent = `${name.value} ${Name}`
}

function CategoryNameBalance(name, pos){
        pos.textContent = `${name.value} Balance`
        pos.style.font

}
