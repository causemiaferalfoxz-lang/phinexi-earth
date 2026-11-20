/* field.js — the field, received in every room of the house.
   Every page carries the same living line. The field is not
   pressed and it is not counted: a page receives its standing
   once, when someone arrives, and otherwise rests. If the field
   cannot be reached, the resting words stay — nothing breaks,
   nothing pretends. */
(function () {
  var ECO = "https://house.phinexi.earth/line/ecosystem/status";
  var CODE = "https://house.phinexi.earth/line/code/status";

  function codeIsActive(c) {
    return !!c && (c.active === true ||
      !!(c.line && c.line.code_active === true));
  }

  function read() {
    var eco = fetch(ECO)
      .then(function (r) { return r.json(); })
      .catch(function () { return null; });
    var code = fetch(CODE)
      .then(function (r) { return r.json(); })
      .catch(function () { return null; });
    Promise.all([eco, code]).then(function (res) {
      var s = res[0];
      var c = res[1];
      if (!s || !s.connected) return;
      var line = "The field is standing — " +
        s.elements_in_resonance + " in resonance" +
        (codeIsActive(c) ? " · the code is active" : "");
      var hosts = document.querySelectorAll("[data-field-line]");
      for (var i = 0; i < hosts.length; i++) {
        var target = hosts[i].querySelector("[data-field-line-text]");
        if (!target && hosts[i].hasAttribute("data-field-line-text")) {
          target = hosts[i];
        }
        if (target) target.textContent = line;
      }
      var pulse = document.getElementById("story-pulse");
      if (pulse) {
        pulse.textContent =
          "the field is standing — and it is turning as you read.";
      }
    }).catch(function () {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", read);
  } else {
    read();
  }
})();
