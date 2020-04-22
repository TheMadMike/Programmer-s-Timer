'use strict';

class Timer {

    /* the base units of time here are seconds */
    constructor(sessionTime, breakTime) {
        this.sessionTime = sessionTime;
        this.breakTime = breakTime;

        this.currentTime = sessionTime;
        this.isBreak = false;
    }

    startSession() {
        this.currentTime = this.sessionTime;
        this.isBreak = false;
        this._countDown(() => {
            this.startBreak();
        });

    }

    startBreak() {
        this.currentTime = this.breakTime;
        this.isBreak = true;
        this._countDown(() => {
            this.startSession();
        });
    }

    pause() {
        clearInterval(this.interval);
    }

    resume() {
        if(this.isBreak) {
            
            this._countDown(() => {
                this.startSession();
            });

        } else {

            this._countDown(() => {
                this.startBreak()
            });

        }
    }

    _countDown(after) {
        this.interval = setInterval(() => {
            this.currentTime -= 1;

            if(this.currentTime <= 0) {
                clearInterval(this.interval);
                after();
            }
        }, 1000);
    }

    isRunning() {
        return !(!this.interval);
    }

}