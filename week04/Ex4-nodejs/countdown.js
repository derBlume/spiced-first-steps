function Countdown(seconds) {
    this.start = function () {
        for (let i = seconds; i >= 0; i--) {
            setTimeout(function () {
                if (i) {
                    console.log(i);
                } else {
                    console.log("Lift off!");
                }
            }, 1000 * seconds - 1000 * i);
        }
    };
}

module.exports.Countdown = Countdown;

//const ct = new Countdown(5);

//ct.start();
