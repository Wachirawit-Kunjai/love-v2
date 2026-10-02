/* ==================================================
   PAGE SYSTEM
================================================== */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function (page) {

        page.classList.add("hidden");

    });


    const target =
        document.getElementById(pageId);


    if (target) {

        target.classList.remove("hidden");

    }

}



/* ==================================================
   HEART CANVAS
================================================== */

const canvas =
    document.getElementById(
        "heartCanvas"
    );


const ctx =
    canvas.getContext("2d");


function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();


    canvas.width =
        rect.width;


    canvas.height =
        rect.height;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



/* ==================================================
   HEART EQUATION
================================================== */

function heart(t) {

    const x =
        16 *
        Math.pow(
            Math.sin(t),
            3
        );


    const y =
        13 *
        Math.cos(t)

        - 5 *
        Math.cos(
            2 * t
        )

        - 2 *
        Math.cos(
            3 * t
        )

        - Math.cos(
            4 * t
        );


    return {
        x: x,
        y: y
    };

}



/* ==================================================
   DRAW HEART
================================================== */

let progress = 0;

let drawing = true;


function drawHeart() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const scale =
        Math.min(
            canvas.width,
            canvas.height
        ) / 45;


    const points = 300;


    /*
        ค่อย ๆ วาดหัวใจ
    */

    if (drawing) {

        progress += 0.012;


        if (progress >= 1) {

            progress = 1;

            drawing = false;

        }

    }


    const end =
        Math.floor(
            points *
            progress
        );


    ctx.beginPath();


    for (
        let i = 0;
        i <= end;
        i++
    ) {

        const t =
            (i / points) *
            Math.PI *
            2;


        const p =
            heart(t);


        const x =
            canvas.width / 2
            + p.x * scale;


        const y =
            canvas.height / 2
            - p.y * scale;


        if (i === 0) {

            ctx.moveTo(
                x,
                y
            );

        } else {

            ctx.lineTo(
                x,
                y
            );

        }

    }


    /*
        หัวใจสีแดง
    */

    ctx.strokeStyle =
        "#ff1744";


    ctx.lineWidth = 4;


    ctx.lineCap =
        "round";


    ctx.lineJoin =
        "round";


    /*
        Glow
    */

    ctx.shadowColor =
        "#ff1744";


    ctx.shadowBlur =
        20;


    ctx.stroke();


    requestAnimationFrame(
        drawHeart
    );

}


drawHeart();



/* ==================================================
   TYPING TEXT
================================================== */

const text =
    "ขอบคุณที่อยู่ด้วยกันมาจนถึงวันนี้นะ ❤️";


const typing =
    document.getElementById(
        "typing"
    );


let textIndex = 0;


function typeText() {

    if (
        textIndex <
        text.length
    ) {

        typing.textContent +=
            text[textIndex];


        textIndex++;


        setTimeout(
            typeText,
            70
        );

    }

}


typeText();



/* ==================================================
   COUNTER
================================================== */

/*
    เปลี่ยนตรงนี้เป็นวันที่เริ่มคบจริง

    รูปแบบ:

    new Date(
        ปี,
        เดือน,
        วัน,
        ชั่วโมง,
        นาที,
        วินาที
    )


    สำคัญ:
    JavaScript นับเดือนจาก 0

    มกราคม  = 0
    กุมภาพันธ์ = 1
    มีนาคม = 2
    เมษายน = 3
    พฤษภาคม = 4
    มิถุนายน = 5
*/

const startDate =
    new Date(
        2026,
        4,
        2,
        0,
        0,
        0
    );



function updateCounter() {

    const now =
        new Date();


    const difference =
        now -
        startDate;


    /*
        ถ้ายังไม่ถึงวันเริ่ม
    */

    if (
        difference < 0
    ) {

        return;

    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    /*
        วัน
    */

    const days =
        Math.floor(
            totalSeconds /
            (
                60 *
                60 *
                24
            )
        );


    /*
        ชั่วโมง
    */

    const hours =
        Math.floor(
            totalSeconds /
            (
                60 *
                60
            )
        ) % 24;


    /*
        นาที
    */

    const minutes =
        Math.floor(
            totalSeconds /
            60
        ) % 60;


    /*
        วินาที
    */

    const seconds =
        totalSeconds %
        60;


    /*
        แสดงผล
    */

    document
        .getElementById("days")
        .textContent =
        days;


    document
        .getElementById("hours")
        .textContent =
        String(hours)
            .padStart(2, "0");


    document
        .getElementById("minutes")
        .textContent =
        String(minutes)
            .padStart(2, "0");


    document
        .getElementById("seconds")
        .textContent =
        String(seconds)
            .padStart(2, "0");

}


/*
    อัปเดตทุก 1 วินาที
*/

setInterval(
    updateCounter,
    1000
);


/*
    เรียกทันที
*/

updateCounter();



/* ==================================================
   LETTER
================================================== */

const letterBtn =
    document.getElementById(
        "letterBtn"
    );


letterBtn.addEventListener(
    "click",
    function () {

        showPage("letter");

    }
);



/* ==================================================
   SECRET EASTER EGG
================================================== */

const secretBtn =
    document.getElementById(
        "secretBtn"
    );


let clickCount = 0;


secretBtn.addEventListener(
    "click",
    function (event) {

        clickCount++;


        /*
            สร้างหัวใจเล็ก ๆ
        */

        createParticles(
            event.clientX,
            event.clientY
        );


        /*
            กดครบ 5 ครั้ง
        */

        if (
            clickCount >= 5
        ) {

            showPage(
                "secret"
            );


            clickCount = 0;

        }

    }
);



/* ==================================================
   PARTICLES
================================================== */

function createParticles(
    x,
    y
) {

    const symbols = [
        "❤️",
        "💗",
        "💕",
        "💖"
    ];


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.className =
            "particle";


        particle.textContent =
            symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
            ];


        particle.style.left =
            x + "px";


        particle.style.top =
            y + "px";


        /*
            สุ่มทิศทาง
        */

        particle.style.setProperty(
            "--x",
            (
                Math.random() * 160 -
                80
            ) + "px"
        );


        particle.style.setProperty(
            "--y",
            (
                Math.random() * -160 -
                30
            ) + "px"
        );


        document.body.appendChild(
            particle
        );


        setTimeout(
            function () {

                particle.remove();

            },
            2000
        );

    }

}



/* ==================================================
   CLICK ANYWHERE
   หัวใจเล็ก ๆ
================================================== */

document.addEventListener(
    "click",
    function (event) {

        /*
            ไม่สร้างตอนกดปุ่ม
            เพื่อไม่ให้รก
        */

        if (
            event.target.tagName ===
            "BUTTON"
        ) {

            return;

        }


        createParticles(
            event.clientX,
            event.clientY
        );

    }
);