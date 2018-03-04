import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpeg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let items = [
      {
        "name": "Trump Bear",
        "profilePic": "assets/img/speakers/bear.jpeg",
        "about": "Trump is a Bear."
      },
      {
        "name": "Potin Cheetah",
        "profilePic": "assets/img/speakers/cheetah.jpeg",
        "about": "Potin is a Cheetah."
      },
      {
        "name": "Elexander",
        "profilePic": "assets/img/speakers/duck.jpeg",
        "about": "Life’s true gift lies in your freedom to design it beautifully. With each rise of the sun, you get to chase the opportunity to fill your days with meaning—to live your life the way you choose."
      },
      {
        "name": "Eva Eagle",
        "profilePic": "assets/img/speakers/eagle.jpeg",
        "about": "I think being in love with life is a key to eternal youth.” —Doug Hutchison."
      },
      {
        "name": "Ellie Elephant",
        "profilePic": "assets/img/speakers/elephant.jpeg",
        "about": "A man who dares to waste one hour of time has not discovered the value of life."
      },
      {
        "name": "Cute Mouse",
        "profilePic": "assets/img/speakers/rabbit.jpeg",
        "about": "If life were predictable it would cease to be life, and be without flavor."
      },
      {
        "name": "Paul Puppy",
        "profilePic": "assets/img/speakers/turtle.jpeg",
        "about": "All life is an experiment. The more experiments you make the better.”"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
