//Creating the class for each transaction

export class _Transaction{
    constructor(title, amount, type,categories){
        this.title = title;
        this.amount = amount;
        this.type = type;
        this.categories = categories;
        this.createdAt = new Date().toISOString()
    }
}

