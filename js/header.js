"use strict" ;
(() =>{
    const iconBurger = document.querySelector(".nav-burger");
    const navigationsBody = document.querySelector(".header-nav-menu");

    iconBurger.addEventListener("click", function(e){
        document.body.classList.toggle("lock");
        iconBurger.classList.toggle("active");
        navigationsBody.classList.toggle("active");
    });
    const navLinks = document.querySelectorAll(".nav-menu-item");
    navLinks.forEach((navLink) => {
        navLink.addEventListener("click",(_)=> {
            if (iconBurger.classList.contains("active")) {
                document.body.classList.remove("lock");
                iconBurger.classList.remove("active");
                navigationsBody.classList.remove("active");
            }
        })
    })

} )();