export {pushIntoCategoryDropdown, creatCategoryDropdown}

//adding category to dropdown
function pushIntoCategoryDropdown(categoryOption,category){
   
        let category_drop = document.createElement('option')
        category_drop.value = category
        category_drop.textContent =category
        categoryOption.appendChild(category_drop)
    
}



//creating the category when page loads
function creatCategoryDropdown(categoryOption,categories){
for (let category of categories){
    let category_drop = document.createElement('option')
    category_drop.value = category
    category_drop.textContent = category
    categoryOption.appendChild(category_drop)
}
}