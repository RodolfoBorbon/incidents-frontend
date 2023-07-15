"use strict"
<<<<<<< HEAD
class Survey
=======
class Book
>>>>>>> origin/main
{
    constructor(_id = "", name = "", author ="", description="", price = 0)
    {
        this._id = _id;
        this.name = name;
        this.author = author;
        this.description = description;
        this.price = price;
    }

    toString()
    {
        return "_id          :" + this._id + "\n" +
               " name        : " + this.name + "\n" +
               " author      : " + this.author + "\n" +
               " description :" + this.description + "\n" +
               " price       :" + this.price;
    }
}

class Line
{
<<<<<<< HEAD
    constructor(survey = new Survey(), quantity = 1)
    {
        this.survey = survey;
=======
    constructor(book = new Book(), quantity = 1)
    {
        this.book = book;
>>>>>>> origin/main
        this.quantity  = quantity;
    }

    toString()
    {
<<<<<<< HEAD
        return "{" + this.survey.toString() + "}, \n" +
=======
        return "{" + this.book.toString() + "}, \n" +
>>>>>>> origin/main
            " quantity: " + this.quantity;
    }

    total()
    {
<<<<<<< HEAD
        return this.survey.feedback * this.quantity;
=======
        return this.book.price * this.quantity;
>>>>>>> origin/main
    }
}

class Cart
{
    constructor(lines = [], itemCount = 0, cartPrice = 0)
    {
        this.lines = lines;
        this.itemCount = itemCount;
        this.cartPrice = cartPrice;
    }

    toString() 
    {
        let outputString = "";
        let count = 0;
        
        for(let line of this.lines)
        {
        outputString += "{" + line.toString();
        count++;
        outputString += (count > this.lines.length) ? "}, \n" : "} \n";
        }
        outputString += ", itemCount: " + this.itemCount + "\n";
        outputString += ", cartPrice: " + this.cartPrice;
        return outputString;
    }

    addLine(line)
    {
        this.lines.push(line);
        this.cartPrice += line.total();
    }

    empty()
    {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }
}

module.exports.Cart = Cart;
module.exports.Line = Line;
<<<<<<< HEAD
module.exports.Survey = Survey;
=======
module.exports.Book = Book;
>>>>>>> origin/main
