let jquery_cdn = document.createElement("SCRIPT");
jquery_cdn.src = "https://code.jquery.com/jquery-3.5.1.min.js";
jquery_cdn.integrity = "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=";
jquery_cdn.setAttribute("defer", "defer");
let site_page_head = document.querySelector("head");
site_page_head.append(jquery_cdn);