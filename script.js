// Click ripple effect
document.addEventListener("click", function (e) {
    const circle = document.createElement("div");
    circle.classList.add("click-effect");
    circle.style.left = `${e.pageX}px`;
    circle.style.top = `${e.pageY}px`;

    document.body.appendChild(circle);

    circle.addEventListener("animationend", () => {
        circle.remove();
    });
});

const overlay = document.querySelector('.overlay');
const cover = document.querySelector('.cover');
const reset = document.querySelector('.reset');
const container = document.getElementById('container');
const titleC = document.querySelector('.titleC');
const messageC = document.querySelector('.messageC');
const stiker = document.querySelector('.stiker');
const mainStiker = document.querySelector('#main-stiker');
const stikerAlt1 = document.querySelector('#stikerAlt1');
const envwrap = document.getElementById('envwrap');
const envelope = document.getElementById('envelope');
const btnOpen = document.getElementById('open');
const wallpaper = document.getElementById('wallpaper');
const linkmp3 = document.getElementById('linkmp3');
const pesanSurat1 = document.getElementById('pesanSurat1');
const pesanSurat2 = document.getElementById('pesanSurat2');
const pesanSurat3 = document.getElementById('pesanSurat3');

if (envwrap) {
    envwrap.style = "transform:scale(0);opacity:0;transition:all .6s ease";
}
if (reset) {
    reset.style = "transform:scale(0);opacity:0;transition:all .6s ease";
}

let audio = new Audio('' + (linkmp3 ? linkmp3.src : 'assets/thousand.mp3'));
audio.loop = true;

function playAudio() {
    if (audio.paused) {
        audio.play().catch(err => {
            console.log("Audio autoplay prevented, will retry on next user interaction:", err);
        });
    }
}

const awalan = document.querySelector(".awalan");
if (awalan) {
    awalan.onclick = async function () {
        playAudio();

        if (overlay) overlay.style = "opacity:0;transition:all .6s ease";
        if (cover) cover.style = "transform:scale(0);opacity:0;transition:all .6s ease";
        setTimeout(function () {
            if (overlay) overlay.style.display = "none";
            if (envwrap) envwrap.style = "transition:all .6s ease";
            if (reset) reset.style = "transition:all .6s ease";
            if (wallpaper) wallpaper.style = "transform: scale(1)";
        }, 300);
    };
}

let isOpen = false;
function openEnvelope() {
    if (isOpen) return;
    isOpen = true;
    playAudio();

    if (envelope) {
        envelope.classList.remove("close");
        envelope.classList.add("open");
    }
    if (reset) {
        reset.style = "transform:scale(0);opacity:0;transition:all .6s ease";
    }

    setTimeout(function () {
        if (envwrap) envwrap.classList.add('opahidden');
        if (wallpaper) wallpaper.style = "transform: scale(1.5)";
        setTimeout(function () {
            if (container) {
                container.classList.remove('hidden');
                container.classList.add('opamuncul');
            }
            if (stiker) stiker.classList.add('opamuncul');
            if (wallpaper) wallpaper.style = "transform: scale(1)";
            if (envwrap) envwrap.classList.add('hidden');
            katanimasi();
        }, 800);
    }, 1500);
}

if (envelope) envelope.addEventListener('click', openEnvelope);
if (btnOpen) btnOpen.addEventListener('click', openEnvelope);

const vjudul = titleC ? titleC.innerHTML : "";
if (titleC) titleC.innerHTML = "";
const vmessage = messageC ? messageC.innerHTML : "";
if (messageC) messageC.innerHTML = "";

function katanimasi() {
    new TypeIt(".titleC", {
        strings: [vjudul],
        startDelay: 250,
        speed: 27,
        cursor: true,
        afterComplete: function () {
            if (titleC) titleC.innerHTML = vjudul;
            setTimeout(() => { katanimasiAlts(); }, 300);
        },
    }).go();
}

function katanimasiAlts() {
    const s1 = pesanSurat1 ? "<br>" + pesanSurat1.innerHTML : "";
    const s2 = pesanSurat2 ? "<br>" + pesanSurat2.innerHTML : "";
    const s3 = pesanSurat3 ? "<br>" + pesanSurat3.innerHTML : "";

    new TypeIt(".messageC", {
        strings: [
            "─",
            s1,
            s2,
            s3,
        ],
        startDelay: 1,
        speed: 28,
        cursor: true,
        breakLines: true,
        waitUntilVisible: true,
        afterStep: function (instance) {
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
            if (instance.is('completed')) {
                setTimeout(function () {
                    instance.next();
                }, 700);
            }
        },
        afterComplete: function () {
            const cursor = document.querySelector(".ti-cursor");
            if (cursor) cursor.style.display = "none";
            setTimeout(() => {
                stikerHidden();
                setTimeout(() => {
                    if (mainStiker && stikerAlt1) {
                        mainStiker.src = stikerAlt1.src;
                    }
                }, 300);
            }, 100);
        },
    }).go();
}

function stikerHidden() {
    if (stiker) {
        stiker.style = "transform:scale(0);opacity:0;";
        setTimeout(function () {
            stiker.style = "transform:scale(1.1);opacity:1;";
        }, 300);
    }
}
