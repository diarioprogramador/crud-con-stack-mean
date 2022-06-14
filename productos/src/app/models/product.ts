export class Product{
  _id?:number;
  name: string;
  category: string;
  price: number;
  status: string;

  constructor(name: string, category: string, price: number, status: string){

    this.name = name;
    this.category = category;
    this.price = price;
    this.status = status;
  }
}
