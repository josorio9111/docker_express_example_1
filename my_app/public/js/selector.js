
function $(selector) {
    const elemento = document.querySelector(selector);

    elemento.click = (callback) => {
        elemento.addEventListener('click', () => {
            if (callback instanceof Function) {
                callback();
            }
        });
    };
    elemento.submit = (callback) => {
        elemento.addEventListener('submit', (ev) => {
            ev.preventDefault();
            if (callback instanceof Function) {
                callback();
            }
        });
    }
    elemento.keyup = (callback) => {
        elemento.addEventListener('keyup', ({ keyCode }) => {
            if (callback instanceof Function) {
                if (keyCode !== 13) return;
                callback();
            }
        });
    }
    return elemento;
}
