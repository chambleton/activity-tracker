export class Activity {
  caption: string;
  weight: number;
  date: Date;  

  dateToNumber(): number {            
    var dateonly: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());    
    return Math.floor(dateonly.getTime()/1000);
  }

  setDateOnly(date: Date) {
    this.date.setFullYear(date.getFullYear());
    this.date.setMonth(date.getMonth());
    this.date.setDate(date.getDate());
  }

  constructor(caption: string = "activity", weight: number = 10, date: string = "") {
    this.caption = caption;
    this.weight = weight;

    if (date === "") {
      this.date = new Date();
    }
    else {
      this.date = new Date(date);
    }
  }

  
}
