document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    // imgTab = tabContent.querySelector("img"),
    // descrTab = tabContent.querySelector(".tabcontent__descr"),
    tabParent = document.querySelector(".tabheader__items"),
    saleDay = document.querySelector("#days");
  saleHour = document.querySelector("#hours");
  saleMinute = document.querySelector("#minutes");
  saleSecond = document.querySelector("#seconds");

  function hideTabContent() {
    tabContent.forEach((tab) => {
      tab.classList.remove("show");
      tab.classList.add("hide");
    });
    tabs.forEach((tab) => tab.classList.remove("tabheader__item_active"));
  }

  function showTabContent(i = 0) {
    // tabContent[i].classList.remove("hide");
    console.log(tabContent);
    tabContent[i].classList.add("show");
    tabContent[i].classList.remove("hide");

    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabParent.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, i) => {
        if (e.target == tab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  const deadLine = "2022-11-11";

  function getTimeRemaning(time) {
    const t = Date.parse(time) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      mins = Math.floor((t / (1000 * 60)) % 60),
      secs = Math.floor((t / 1000) % 60);

    saleDay.textContent = days;
    saleHour.textContent = hours;
    saleMinute.textContent = mins;
    saleSecond.textContent = secs;

    if (t <= 0) {
      clearInterval(timer);
    }
  }
  function updateClock() {
    getTimeRemaning(deadLine);
  }
  const timer = setInterval(updateClock, 1000);

  // Modal

  const btnModalOpen = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  btnModalClose = document.querySelector(".modal__close");

  btnModalOpen.forEach((btn) => {
    btn.addEventListener("click", modalOpen);
  });

  btnModalClose.addEventListener("click", modalClose);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modalClose();
    }
  });
  document.addEventListener("keydown", (e) => {
    if ((e.code = "Escape" && modal.classList.contains("show"))) {
      modalClose();
    }
  });
  function modalClose() {
    modal.classList.remove("show");
    // modal.classList.add("hide");
    document.body.style.overflow = "";
  }
  function modalOpen() {
    modal.classList.add("show");
    // modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    // clearTimeout(timerModalOpen);
  }
  // const timerModalOpen = setTimeout(modalOpen, 5000);
  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      modalOpen();
      window.removeEventListener("scroll", showModalByScroll);
    }
    // console.log(`scrolly=${window.scrollY}`);
    // console.log(`clientHeight = ${document.documentElement.clientHeight}`);
    // console.log(window.scrollY + document.documentElement.clientHeight);
    // console.log(`scrollHeight = ${document.documentElement.scrollHeight}`);
  }
  window.addEventListener("scroll", showModalByScroll);

  /////////////////////////////////////////////////////
  // Class
  // ///////////////////////////////////////////////////
  // const menuItem = document.querySelectorAll(".menu__item"),
  //   menuImg = menuItem.querySelector("img"),
  //   menuTitle = menuItem.querySelector(".menu__item-subtitle"),
  //   menuDescr = menuItem.querySelector("menu__item-descr"),
  //   menuPrice = menuItem.querySelector("span");
  class Menu {
    constructor(
      imgSrc,
      imgAlt,
      title,
      description,
      price,
      parentSelector,
      ...classes
    ) {
      this.imgSrc = imgSrc;
      this.imgAlt = imgAlt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 60;
    }
    exchange() {
      return this.price * this.transfer;
    }
    render() {
      const div = document.createElement("div");
      this.classes.forEach((classElement) => div.classList.add(classElement));
      div.innerHTML = `
      <img src=${this.imgSrc} alt=${this.imgAlt}/>
      <h3 class="menu__item-subtitle"> ${this.title} </h3>
      <div class="menu__item-descr">
        ${this.description}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.exchange()}</span> руб/день</div>
      </div>
    `;
      this.parent.append(div);
    }
  }

  const fitness = new Menu(
    "img/tabs/vegy.jpg",
    "vegy",
    ' Меню"Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    5,
    ".menu .container",
    "menu__item"
  );
  fitness.render();
  new Menu(
    "img/tabs/elite.jpg",
    "elite",
    " Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты,фрукты - ресторанное меню без похода в ресторан!",
    7,
    ".menu .container",
    "menu__item"
  ).render();
  new Menu(
    "img/tabs/post.jpg",
    "post",
    ' Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное     отсутствие продуктов животного происхождения, молоко из миндаля,овса, кокоса или гречки, правильное количество белков за счет тофуи импортных вегетарианских стейков.",
    6,
    ".menu .container",
    "menu__item"
  ).render();

  // Form

  const forms = document.querySelectorAll("form");
  const message = {
    loading: "Loading",
    ok: "Everysing Ok",
    error: "Error...",
  };
  forms.forEach((form) => {
    postData(form);
  });
  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const mess = document.createElement("div");
      mess.classList.add("status");
      mess.textContent = message.loading;
      form.append(mess);

      const request = new XMLHttpRequest();
      request.open("POST", "127.0.0.1:85");

      const dataForm = new FormData(form);

      request.send(dataForm);

      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          mess.textContent = message.ok;
        } else mess.textContent = message.error;
      });
    });
  }
});
