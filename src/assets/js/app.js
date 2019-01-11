  'use strict'

  const calendar = {
    init() {
      this.d = new Date();
      this.cacheDom();
      this.render();
      this.getFirstDay();
    },
    cacheDom() {
      this.header = document.querySelector(".calendar__header");
      this.bg = this.header.parentElement.parentElement;
      this.month = this.header.children[0];
      this.date = month.firstElementChild;
      this.day = this.header.children[1];
      this.year = this.header.children[2];
      this.arr = document.getElementsByTagName("td");
    },
    render(index) {

      if (!index && index != 0) {
        this.header.style.backgroundImage = `url(img/head/${this.myMonth()}_head.jpg)`;
        this.bg.style.backgroundImage = `url(img/bg/${this.myMonth()}_bg.jpg)`;

        if (!this.month.firstChild.className) {
          this.month.firstChild.remove();
        }

        this.month.insertAdjacentHTML("afterbegin", this.myMonth());
        this.date.innerText = ` ${this.d.getDate()}`;
        this.day.innerText = this.myDay(this.d.getDay());
        this.year.innerText = this.d.getFullYear();

      } else {

        if (index == -1) {
          index = 6;
        }

        for (let i = this.prevMonthLength, j = index - 1; i > (this.prevMonthLength - index); i--, j--) {
          this.arr[j].innerText = i;
          this.arr[j].classList.add("passive");
        }

        for (let i = index; i < (this.nextMonthLength + index); i++) {
          this.arr[i].innerText = i - (index - 1);
          if (this.arr[i].innerText == this.d.getDate()) {
            this.arr[i].classList.add("current-day");
          }
        }

        for (let i = this.nextMonthLength + index; i < 42; i++) {
          this.arr[i].innerText = i - (this.nextMonthLength + index - 1);
          this.arr[i].classList.add("passive");
        }
      }
    },
    myMonth() {
      switch (this.d.getMonth()) {
        case 0:
          return "january";
          break;
        case 1:
          return "february";
          break;
        case 2:
          return "march";
          break;
        case 3:
          return "april";
          break;
        case 4:
          return "may";
          break;
        case 5:
          return "june";
          break;
        case 6:
          return "juli";
          break;
        case 7:
          return "august";
          break;
        case 8:
          return "september";
          break;
        case 9:
          return "october";
          break;
        case 10:
          return "november";
          break;
        case 11:
          return "december";
          break;
      }
    },
    myDay(d) {
      switch (d) {
        case 0:
          return "sunday";
          break;
        case 1:
          return "monday";
          break;
        case 2:
          return "tuesday";
          break;
        case 3:
          return "wednesday";
          break;
        case 4:
          return "thursday";
          break;
        case 5:
          return "friday";
          break;
        case 6:
          return "saturday";
          break;
      }
    },
    getFirstDay() {
      const m = this.d.getMonth();
      const y = this.d.getFullYear();
      // get the day of the week of the 1st day of current month
      this.firstDay = new Date(`${m + 1}.1.${y}`).getDay() - 1;

      let t0, t1, t2;
      // get time in milliseconds of 1st day of current month
      t1 = new Date(`${m + 1}.1.${y}`).getTime();

      // get time in milliseconds of 1st day of previous month
      if (m == 0) {
        t0 = new Date(`12.1.${y - 1}`).getTime();

      } else {
        t0 = new Date(`${m}.1.${y}`).getTime();
      }

      // get time in milliseconds of 1st day of next month
      if (m == 11) {
        t2 = new Date(`1.1.${y + 1}`).getTime();

      } else {
        t2 = new Date(`${m + 2}.1.${y}`).getTime();
      }

      // get amount of days of current month
      const nextRes = Math.round((t2 - t1) / 86400000);
      // get amount of days of previous month
      const prev = Math.round((t1 - t0) / 86400000);

      this.nextMonthLength = nextRes;
      this.prevMonthLength = prev;

      this.render(this.firstDay);
    },
    setCustomDate(x) {
      this.d = new Date(x);
      this.render();

      for (let i = 0; i < this.arr.length; i++) {
        this.arr[i].className = "";
      }

      this.getFirstDay();
    }
  };
  calendar.init();

  const datePicker = {
    init() {
      this.cacheDom();
      this.bindEvent();
    },
    cacheDom() {
      this.input = document.getElementById("picker");
    },
    bindEvent() {
      this.input.addEventListener("change", this.getDate.bind(this));
    },
    getDate() {
      calendar.setCustomDate(this.input.value);
    }
  };
  datePicker.init();