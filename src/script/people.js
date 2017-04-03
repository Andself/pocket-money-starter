export default class People {
  constructor ( name, age ) {
    this.name = name
    this.age = age
  }

  show () {
    console.log(`${this.name}今年${this.age}了`)
  }
}