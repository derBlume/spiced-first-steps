(function () {
    var openMenuButton = document.querySelector(".openMenu");
    var closeMenuButton = document.querySelector(".closeMenu");
    var menuBg = document.querySelector(".menuBg");
    var menu = document.querySelector(".menu");

    function showMenu() {
        menuBg.classList.add("on");
        menu.classList.add("on");
    }

    function hideMenu() {
        menuBg.classList.remove("on");
        menu.classList.remove("on");
    }

    openMenuButton.addEventListener("click", showMenu);
    closeMenuButton.addEventListener("click", hideMenu);
    menuBg.addEventListener("click", hideMenu);
    menu.addEventListener("click", function (event) {
        event.stopPropagation();
    });
})();
