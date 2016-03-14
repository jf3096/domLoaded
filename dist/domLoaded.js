var dom;
!function (t) {
    function n() {
        var t = i;
        if (!a)for (a = !0, i = []; t.length;)t.shift()()
    }

    function e(t) {
        return a ? t() : i.push(t), e
    }

    var d = document, o = !1, a = !(!window && !d), i = [];
    !function () {
        d.addEventListener ? (d.addEventListener("DOMContentLoaded", n, o), addEventListener("load", n, o)) : attachEvent && attachEvent("onload", n), "complete" === d.readyState && n()
    }(), t.domReady = e
}(dom || (dom = {}));