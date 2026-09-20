(function () {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    var mobileQuery = window.matchMedia("(max-width: 640px)");

    // Only collapsed-and-closed on mobile makes the nav inert: on desktop,
    // or once opened, its links stay in the tab order.
    function syncNavInert() {
        if (mobileQuery.matches && !nav.classList.contains("is-open")) {
            nav.setAttribute("inert", "");
        } else {
            nav.removeAttribute("inert");
        }
    }

    if (toggle && nav) {
        // Only mark the page as JS-enabled once the nav is actually wired
        // up: the CSS collapses the nav whenever html.js is present, so if
        // this file fails to load or errors out before this point, the nav
        // must stay in its plain, always-visible fallback state instead.
        document.documentElement.classList.add("js");

        syncNavInert();
        // addEventListener on a MediaQueryList is fairly recent; older
        // browsers only have the deprecated addListener. Without this
        // fallback, an exception here would stop execution before the
        // click handlers below are attached, leaving the nav stuck closed.
        if (mobileQuery.addEventListener) {
            mobileQuery.addEventListener("change", syncNavInert);
        } else if (mobileQuery.addListener) {
            mobileQuery.addListener(syncNavInert);
        }

        toggle.addEventListener("click", function () {
            var isOpen = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            syncNavInert();
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
                syncNavInert();
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
