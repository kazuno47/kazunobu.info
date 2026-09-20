(function () {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            var isOpen = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    var sections = document.querySelectorAll("main section[id]");
    var navLinks = document.querySelectorAll(".site-nav a[href^='#']");

    if ("IntersectionObserver" in window && sections.length) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            },
            { threshold: 0.12 }
        );
        sections.forEach(function (section) {
            section.classList.add("panel");
            revealObserver.observe(section);
        });

        if (navLinks.length) {
            var spyObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        var id = entry.target.getAttribute("id");
                        navLinks.forEach(function (link) {
                            link.classList.toggle(
                                "is-active",
                                link.getAttribute("href") === "#" + id
                            );
                        });
                    });
                },
                { rootMargin: "-45% 0px -50% 0px" }
            );
            sections.forEach(function (section) {
                spyObserver.observe(section);
            });
        }
    } else {
        sections.forEach(function (section) {
            section.classList.add("panel", "is-visible");
        });
    }
})();
