export function customCursor(options) {
    let settings = $.extend({
        targetClass: 'custom-cursor', // create element with this class
        wrapper: $('body'), // jQuery
        speed: .1,
        movingDelay: 300, // fire event onStop after delay
        hasHover: false, // has hover events
        hoverTarget: $('.animate-mouse'),
        touchDevices: false, // show on touch devices
        onMove: function (data) {
        }
    }, options),
        data = {},
        checkTouch = !settings.touchDevices && "undefined" !== typeof document.documentElement.ontouchstart,
        timer = null;

    // exit
    if (checkTouch || !settings.wrapper.length) return;

    // append the ball
    settings.wrapper.append(`<div class="${settings.targetClass}"></div>`);

    let $cursor = $('.' + settings.targetClass),
        position = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        mouse = { x: position.x, y: position.y },
        setX = gsap.quickSetter($cursor, "x", "px"),
        setY = gsap.quickSetter($cursor, "y", "px");

    // update data
    data.cursor = $cursor;

    // on mouse move
    window.addEventListener("mousemove", init);

    function init() {
        // remove default mousemove event
        window.removeEventListener("mousemove", init);

        // add new custom event
        window.addEventListener("mousemove", e => {
            mouse.x = e.x;
            mouse.y = e.y;

            // update data and trigger event
            data.isMoving = true;
            settings.onMove(data);

            timer = setTimeout(function () {
                // update data and trigger event
                data.isMoving = false;
                settings.onMove(data);
            }, settings.movingDelay);
        });

        // fade out cursor
        document.addEventListener("mouseleave", e => {
            // update data and trigger event
            data.isInViewport = false;
            settings.onMove(data);
        });

        // update cursor's position
        document.addEventListener("mouseenter", e => {
            mouse.x = position.x = e.x;
            mouse.y = position.y = e.y;

            // update data and trigger event
            data.isInViewport = true;
            settings.onMove(data);
        });

        gsap.ticker.add((time, deltaTime) => {
            let fpms = 60 / 1000,
                delta = deltaTime * fpms,
                dt = 1 - Math.pow(1 - settings.speed, delta);

            if (data.isHover) {
                mouse.x = data.hoverTarget.offset().left + data.hoverTarget.outerWidth() / 2;
                mouse.y = (data.hoverTarget.offset().top - $(window).scrollTop()) + data.hoverTarget.outerHeight() / 2;
            }
            position.x += (mouse.x - position.x) * dt;
            position.y += (mouse.y - position.y) * dt;
            setX(position.x);
            setY(position.y);
        });

        data.isInViewport = true;
    }

    // on hover
    if (settings.hasHover && settings.hoverTarget.length) {
        setTimeout(function () {
            settings.hoverTarget.hover(function () {
                data.hoverTarget = $(this);
                data.isHover = true;
                settings.onMove(data);
            }, function () {
                data.hoverTarget = $(this);
                data.isHover = false;
                settings.onMove(data);
            });
        }, 100);
    }
}

// big ball
customCursor({
    hasHover: true,
    onMove: function (data) {
        if (data.isInViewport) {
            // in viewport
            let mouseClass = (data.hoverTarget == null) ? '' : data.hoverTarget.data("mouse-class");
            if (data.isHover) {
                data.cursor.addClass(mouseClass);
                data.cursor.height(data.hoverTarget.outerHeight());
                data.cursor.width(data.hoverTarget.outerWidth());
                data.cursor.x = data.hoverTarget.offset().left;
                data.cursor.y = data.hoverTarget.offset().top - $(window).scrollTop();
                gsap.to(data.cursor, { opacity: 1, scale: 1 });
            } else {
                data.cursor.removeClass(mouseClass);
                data.cursor.width('35px');
                data.cursor.height('45px');
                gsap.to(data.cursor, { opacity: .5, scale: .8 });
            }
        } else {
            // out viewport
            gsap.to(data.cursor, { opacity: 0, scale: 0 });
        }
    }
});