'use strict';

const app = new Vue({
    el: '#root',

    data: {
        showMobileButtons: false,
        timer: new Timer(900, 900),
        buttonText: 'Start',
        breakTime: 15,
        sessionTime: 15
    },

    methods: {

        showCustomizationMenu: () => {

        },

        timeValueChanged: function() {
            this.timer.sessionTime = this.sessionTime*60;
            this.timer.breakTime = this.breakTime*60;
            this.timer.startSession();
            this.timer.pause();
            this.buttonOnClick = this.resume;
        },

        start: function() {
            this.timer.startSession();
            this.buttonText = 'Pause';
            this.buttonOnClick = this.pause;
        },

        pause: function() {
            this.timer.pause();
            this.buttonText = 'Resume';
            this.buttonOnClick = this.resume;
        },

        resume: function() {
            this.timer.resume();
            this.buttonText = 'Pause';
            this.buttonOnClick = this.pause;
        },

        buttonOnClick: function() {
            if(this.timer.isRunning()) {
                this.pause();
            } else {
                this.start();
            }
        }

    },

    computed: {

        hours: function() {
            let value = Math.floor(this.timer.currentTime/3600);
            if(value < 10)
                return '0' + value;

            return value;
        },

        minutes: function() {
            let value = Math.floor(this.timer.currentTime/60);
            value -= this.hours*60;

            if(value < 10)
                return '0' + value;

            return value;
        },
        
        seconds: function() {
            let value = this.timer.currentTime - this.minutes*60 - this.hours*3600;

            if(value < 10)
                return '0' + value;

            return value;
        },

        message: function() {
            return this.timer.message;
        }

    }
});