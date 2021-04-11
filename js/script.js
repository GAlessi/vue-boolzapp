function init() {
    new Vue({
        el:"#app",

        data:{
            'searchedName': "",
            'myText': "",
            'newMessage':{text:'', status:'sent', time:''},
            'newAnswer':{text:'ok', status:'received', time:'15:30:55'},
            'activeContact': false,
            'contactsArray': [
                {
                    name: 'Judy',
                    avatar: 'judy',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020',
                            time: '15:30:55',
                            text: 'Ehi V, hai visto la mia nuova braindance?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020',
                            time: '15:50:00',
                            text: 'Ricordati di mangiare oggi',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020',
                            time: '16:15:22',
                            text: 'Già fatto, è un capolavoro!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020',
                            time: '16:15:22',
                            text: 'come sempre...',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Jackie',
                    avatar: 'jackie',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020',
                            time: '16:30:00',
                            text: 'Ciao choom, come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020',
                            time: '16:30:55',
                            text: "Bene grazie! Stasera ci vediamo all'Alterlife?",
                            status: 'received'
                        },
                        {
                            date: '20/03/2020',
                            time: '16:35:00',
                            text: 'Mi piacerebbe ma devo vedere Judy',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Wakako',
                    avatar: 'wakako',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020',
                            time: '10:10:40',
                            text: 'Devo fare sparire il mio ottavo marito',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020',
                            time: '10:20:10',
                            text: 'Sicura di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020',
                            time: '16:15:22',
                            text: 'Ah',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020',
                            time: '16:15:22',
                            text: 'dimentica tutto, V',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020',
                            time: '16:15:22',
                            text: 'sul serio V, dimentica tutto',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Panam',
                    avatar: 'panam',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020',
                            time: '15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020',
                            time: '15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ]
        },

        methods:{
            getContact: function (index) {
                this.activeContact=this.contactsArray[index];
            },
            plusZero: function(timeNum) {
              if (timeNum < 10) {
                  timeNum = '0' + timeNum;
              }
              return timeNum
            },
            sendText: function () {
                const today = new Date();
                const time = this.plusZero(today.getHours()) + ":" + this.plusZero(today.getMinutes()) + ":" + this.plusZero(today.getSeconds());
                this.newMessage["text"] = this.myText;
                this.newMessage["time"] = time;
                this.activeContact.messages.push({...this.newMessage});
                this.myText="";
                setTimeout(this.answer, 1000);
            },
            answer: function () {
                const today = new Date();
                const time = this.plusZero(today.getHours()) + ":" + this.plusZero(today.getMinutes()) + ":" + this.plusZero(today.getSeconds());
                this.newAnswer["time"] = time;
                this.activeContact.messages.push({...this.newAnswer});
            },
            filteredContactsArray: function () {
               return this.contactsArray.filter(contact => {
                   return contact.name.toUpperCase().includes(this.searchedName.toUpperCase());
               });
           },

        }
    });
}

document.addEventListener('DOMContentLoaded', init);
