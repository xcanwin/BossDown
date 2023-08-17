// ==UserScript==
// @name         BossDown
// @version      1.0
// @description  下载Boss简历vip模板
// @author       xcanwin
// @namespace    https://github.com/xcanwin/BossDown/
// @supportURL   https://github.com/xcanwin/BossDown/
// @updateURL    https://raw.githubusercontent.com/xcanwin/BossDown/main/BossDown.user.js
// @downloadURL  https://raw.githubusercontent.com/xcanwin/BossDown/main/BossDown.user.js
// @match        https://cv.zhipin.com/resume/html/edit-resume*
// @grant        GM_registerMenuCommand
// @run-at       document-start
// ==/UserScript==

(function() {

    const _open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function() {
        this.addEventListener('readystatechange', function() {
            if (this.readyState === 4 && this.responseURL.includes('/nflow/zpresume/pdf')) {
                window.zhipinpdf = this.response;
            }
        });
        return _open.apply(this, arguments);
    };

    const BlobCopy = function() {
        const randomName = Math.random().toString(36).substring(7) + ".pdf";
        const link = document.createElement('a');
        link.download = randomName;
        link.href = window.URL.createObjectURL(window.zhipinpdf);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    GM_registerMenuCommand("下载Boss简历vip模板", BlobCopy);

})();
