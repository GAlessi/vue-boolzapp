function init() {
    new Vue({
        el:"#app",

        data:{
            "chevron": false,
            'searchedName': "",
            'myText': "",
            'newMessage':{text:'', status:'sent', time:'', menu:false, chevron:false},
            'newAnswer':{text:'ok', status:'received', time:'', menu:false, chevron:false},
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
                            status: 'received',
                        },
                        {
                            date: '10/01/2020',
                            time: '15:50:00',
                            text: 'Ricordati di mangiare oggi',
                            status: 'received',
                        },
                        {
                            date: '10/01/2020',
                            time: '16:15:22',
                            text: 'Già fatto, è un capolavoro!',
                            status: 'sent',
                        },
                        {
                            date: '10/01/2020',
                            time: '16:15:22',
                            text: 'come sempre...',
                            status: 'sent',
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
                            status: 'sent',
                        },
                        {
                            date: '20/03/2020',
                            time: '16:30:55',
                            text: "Bene grazie! Stasera ci vediamo all'Alterlife?",
                            status: 'received',
                        },
                        {
                            date: '20/03/2020',
                            time: '16:35:00',
                            text: 'Mi piacerebbe ma devo vedere Judy',
                            status: 'sent',
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
                            status: 'received',
                        },
                        {
                            date: '28/03/2020',
                            time: '10:20:10',
                            text: 'Sicura di non aver sbagliato chat?',
                            status: 'sent',
                        },
                        {
                            date: '28/03/2020',
                            time: '16:15:22',
                            text: 'Ah',
                            status: 'received',
                        },
                        {
                            date: '28/03/2020',
                            time: '16:15:22',
                            text: 'dimentica tutto, V',
                            status: 'received',
                        },
                        {
                            date: '28/03/2020',
                            time: '16:15:22',
                            text: 'sul serio V, dimentica tutto',
                            status: 'received',
                        }
                    ]
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
                            status: 'sent',

                        },
                        {
                            date: '10/01/2020',
                            time: '15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received',
                        }
                    ],
                },
            ]
        },
        updated() {
            if (this.activeContact) {
                const container = this.$el.querySelector("#chat");
                container.scrollTop = container.scrollHeight;
            }
        },

        mounted: function () {
                    for (let i = 0; i < this.contactsArray.length; i++) {
                        const contact=this.contactsArray[i];
                        for (let x = 0; x < contact.messages.length; x++) {
                            const message=contact.messages[x];
                            Vue.set(message, 'menu', false);
                            Vue.set(message, 'chevron', false);
                        }
                    };
                    console.log(this.contactsArray);
        },
        methods:{

            // Dichiara di quale contatto mostrare la chat e aggiunge il focus sul'imput nuovo messaggio
            getContact: function (index) {
                this.activeContact=this.contactsArray[index];
                this.$nextTick(() => this.$refs.newMsg.focus());
            },

            //In caso un numero sia minore di 10 aggiunge uno 0 davanti per mantenere il formato a 2 cifre
            plusZero: function(timeNum) {
              if (timeNum  < 10) {
                  timeNum = '0' + timeNum;
              }
              return timeNum
            },

            // Prende le informazioni riguardo l'orario e le formatto
            getTime: function () {
                const today = new Date();
                const time = this.plusZero(today.getHours()) + ":" + this.plusZero(today.getMinutes()) + ":" + this.plusZero(today.getSeconds());
                return time;
            },

            // Prende le informazioni riguardo un nuovo messaggio e le inserisce in un oggetto che aggiunge all'array
            sendText: function () {
                const time = this.getTime();
                const active = this.activeContact;
                this.newMessage["text"] = this.myText;
                this.newMessage["time"] = time;
                this.activeContact.messages.push({...this.newMessage});
                this.myText="";
                this.answer(active);
            },

            // Pusha una risposta automatica nell'array
            answer: function (active) {
                setTimeout(() =>{
                    const time = this.getTime();
                    this.newAnswer["time"] = time;
                    active.messages.push({...this.newAnswer});
                },1000);
            },

            // filtra l'array di partenza basandosi sulle lettere inserite nella barra di riscerca
            filteredContactsArray: function () {
                return this.contactsArray.filter(contact => {
                   return contact.name.toUpperCase().includes(this.searchedName.toUpperCase());
               });
           },

           // mostra/nasconde il menù dei messaggi con click su chevron
           toggleMenu: function (message) {
               let msg="";
               for (let i = 0; i < this.activeContact.messages.length; i++) {
                    msg = this.activeContact.messages[i].menu;
                       msg=false
               };

               if (message.menu && !msg) {
                   message.menu = false;
               }else {
                   message.menu=true;
               }
           },

           //chiude il dropdown con click esterno
           closeMenu: function () {
                this.activeContact.messages.forEach(elem => {
                    if (elem.menu) {
                        elem.menu = false;
                    }
                });
            },

            //elimina il messaggio
            deleteMsg: function (ind) {
                this.activeContact.messages.splice(ind, 1);
            },

            //mostra lo chevron a hover sul messaggio
            showChevron:function (message) {
                message.chevron = true;
            },

            //nasconde lo chevron e mostra la data
            hideChevron:function (message) {
                message.chevron = false;
            },
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
