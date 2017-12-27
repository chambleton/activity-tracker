export class Activity {
  caption: string;
  weight: number;
  date: Date;  

  dateToNumber(): number {    
    return Math.floor(this.date.getTime()/1000);
  }

  constructor(caption: string = "activity", weight: number = 10) {
    this.caption = caption;
    this.weight = weight;
    this.date = new Date();
  }

  
}
