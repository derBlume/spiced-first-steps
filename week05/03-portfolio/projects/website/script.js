(function () {
    var openMenuButton = document.querySelector(".openMenu");
    var closeMenuButton = document.querySelector(".closeMenu");
    var menuBg = $(".menuBg");
    var menu = $(".menu");

    function showMenu() {
        menuBg.show();
        menu.addClass("on");
        menu.show();
    }

    function hideMenu() {
        menuBg.hide();
        menu.hide();
    }

    openMenuButton.addEventListener("click", showMenu);
    closeMenuButton.addEventListener("click", hideMenu);
    menuBg.on("click", hideMenu);
    menu.on("click", function (event) {
        event.stopPropagation();
    });

    var modal = $(".modal");
    var darkness = $(".menuBg");
    modal.delay(1000).fadeIn(500);
    darkness.delay(1000).fadeIn(500);

    var closeModal = $(".closeMenu");
    closeModal.on("click", function () {
        modal.fadeOut(100);
        darkness.fadeOut(100);
    });
})();
