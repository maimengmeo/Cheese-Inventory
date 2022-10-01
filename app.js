/*
Name:  Tuyet Mai Pham
Assignment:  Assignment 4
Date:  July 15, 2022

Page Description: This contains the constants and functions needed for
this application, including createCheese function, validation.
It also contains some contants that are used on all pages of the application
such as the company name and contact information. 
Files: index.html - the main login page for emergency personnel
       main.css - the main styles for this application
       forms.css
*/

"use strict";
document.addEventListener("DOMContentLoaded", init);

//check form validation
let validation = {
  handleEvent(event) {
    let form = event.target.form;
    let qty = form.cheeseWeight.value;
    let weightUnit = form.weightUnits.value;

    //check if the input value of quantity higher than 15 for the Square and Tomme units
    if (qty > 15 && (weightUnit === "Lb. Square" || weightUnit === "Lb. Tomme")) {
      form.cheeseWeight.setCustomValidity("Weight must be 15 or less for Square and Tomme.");
      form.cheeseWeight.reportValidity();
    } else {
      form.cheeseWeight.setCustomValidity("");
    }
  },
};

//function create cheese object
function createCheese(name, weight, units, price, url, qoh) {
  return {
    name,
    weight,
    units,
    price,
    url,
    qoh,
    get formattedWeight() {
      //format the weight to 1 decimal point
      return Math.round(this.weight * 10) / 10;
    },
    get cheeseLink() {
      if (!this.url.length) {
        //check url existance
        const textNode = document.createElement("span");
        textNode.textContent = this.name;
        return textNode;
      }
      /*make the anchor tag with text is the cheese's name
      and href attribute is the url*/
      const linkNode = document.createElement("a");
      linkNode.textContent = this.name;
      linkNode.setAttribute("href", this.url);
      return linkNode;
    },
    toString() {
      return `${this.qoh} x ${this.name} ${this.formattedWeight} ${this.units}`;
    },
  };
}

let submitForm = {
  handleEvent(event) {
    event.preventDefault();
    //check validation when submit
    validation.handleEvent(event);

    let form = event.target.form;
    if (!form.checkValidity()) {
      return;
    }
    //create cheese object with function createCheese
    const cheeseProperties = createCheese(
      form.cheeseName.value,
      form.cheeseWeight.value,
      form.weightUnits.value,
      form.cheesePrice.value,
      form.cheeseUrl.value,
      form.cheeseQty.value
    );
    //make a div for each cheese which is submitted
    const childDiv = document.createElement("div");
    const displayProperties = ["qoh", "cheeseLink", "formattedWeight", "units"];

    //append elements that required to be displayed below the form
    for (let prop of displayProperties) {
      childDiv.append(cheeseProperties[prop]);
      childDiv.append(" ");
    }
    let output = form.nextElementSibling;
    output.append(childDiv);
  },
};

function init() {
  //create navigation
  const headerNav = document.createElement("nav");
  const footerNav = document.createElement("nav");
  //select header and footer
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  //create object arrays for navigation data
  const headerArr = [
    { label: "List Inventory", link: "list.html" },
    { label: "Search Inventory", link: "search.html" },
  ];
  const footerArr = [
    { label: "Support", link: "support.html" },
    { label: "Orders", link: "orders.html" },
    { label: "Vendors", link: "vendors.html" },
    { label: "Units", link: "units.html" },
  ];

  //function to create anchor tag
  function createNavLink(tag) {
    const anchorTag = document.createElement("a");
    anchorTag.textContent = tag.label;
    anchorTag.setAttribute("href", tag.link);
    return anchorTag;
  }

  //create anchor tags for header and footer
  for (let tag of headerArr) {
    let navLink = createNavLink(tag);
    headerNav.append(navLink);
  }
  for (let tag of footerArr) {
    let navLink = createNavLink(tag);
    footerNav.append(navLink);
  }
  /*append header navigation bar to the end of the header
  and footer navigation bar to above the <address> element */
  header.append(headerNav);
  footer.prepend(footerNav);

  let units = document.forms[0].querySelector("#units");
  /*when change event are triggered, validation function executed*/
  units.addEventListener("change", validation);

  let submitButton = document.querySelector('button[type="submit"]');
  /*submitButton fire click events, when click event is triggered,
  submitForm function executes*/
  submitButton.addEventListener("click", submitForm);
}
