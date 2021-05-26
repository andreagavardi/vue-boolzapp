/* Milestone 1:
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
Milestone 2:
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato
Consigli utili:
Si possono trascurare le scrollbar verticali, sia nel pannello dei messaggi, che nella lista dei contatti
I pulsanti e le icone possono non funzionare (a parte l’invio del messaggio)
Per gestire le date, può essere utile la libreria day.js
La struttura dell’array dei contatti potrebbe avere la forma che trovate nel file allegato:
 */

const app = new Vue({
    el:"#app",

    data:{
        url:"./assets/img/avatar",

       contattoCorrente: 0, //indice contatto corrente
	   
		contattoSelezionato:"", //nome del contatto in cui cancello i messaggi
		
        newMessage:"", // nuovo messaggio scritto nell'input-text
       
		currentDate: dayjs().format("DD/MM/YYYY HH:mm:ss"),

		ricerca:"", 

		counter:-1,

        contacts: [
		{
		name: 'Tony',
		avatar: '_5',
		visible: true,
		messages: [
			{
				date: '10/01/2020 15:30:55',
				text: 'Hai studiato Vue?',
				status: 'sent'
			},
			{
				date: '10/01/2020 15:50:00',
				text: 'Ricordati di ripassare nel WeekEnd',
				status: 'sent'
			},
			{
				date: '10/01/2020 16:15:22',
				text: 'Ma per chi mi hai preso?!',
				status: 'received'
			}
		],
	},	
	{
		name: 'Michele',
		avatar: '_1',
		visible: true,
		messages: [
			{
				date: '10/01/2020 15:30:55',
				text: 'Hai portato a spasso il cane?',
				status: 'sent'
			},
			{
				date: '10/01/2020 15:50:00',
				text: 'Ricordati di dargli da mangiare',
				status: 'sent'
			},
			{
				date: '10/01/2020 16:15:22',
				text: 'Tutto fatto!',
				status: 'received'
			}
		],
	},
	{
		name: 'Fabio',
		avatar: '_2',
		visible: true,
		messages: [
			{
				date: '20/03/2020 16:30:00',
				text: 'Ciao come stai?',
				status: 'sent'
			},
			{
				date: '20/03/2020 16:30:55',
				text: 'Bene grazie! Stasera ci vediamo?',
				status: 'received'
			},
			{
				date: '20/03/2020 16:35:00',
				text: 'Mi piacerebbe ma devo andare a fare la spesa.',
				status: 'sent'
			}
		],
	},

	{
		name: 'Samuele',
		avatar: '_3',
		visible: true,
		messages: [
			{
				date: '28/03/2020 10:10:40',
				text: 'La Marianna va in campagna',
				status: 'received'
			},
			{
				date: '28/03/2020 10:20:10',
				text: 'Sicuro di non aver sbagliato chat?',
				status: 'sent'
			},
			{
				date: '28/03/2020 16:15:22',
				text: 'Ah scusa!',
				status: 'received'
			}
		],
	},
	{
		name: 'Luisa',
		avatar: '_4',
		visible: true,
		messages: [
			{
				date: '10/01/2020 15:30:55',
				text: 'Lo sai che ha aperto una nuova pizzeria?',
				status: 'sent'
			},
			{
				date: '10/01/2020 15:50:00',
				text: 'Si, ma preferirei andare al cinema',
				status: 'received'
			}
		],
	},
		],
		
		
    },

    methods:{
		
		selezionaContatto(index){
			this.contattoCorrente = index;
			
           
        },

		/**
		 * ## Risposta automatica
		 * crea un messaggio di risposta automatica dopo l'invio di un nuovo messaggio
		 * @param {array} msg -lista di messaggi in cui inserisco la risposta automatica
		 * @param {object} date -data corrente
		 */
		rispostaAuto(msg,date) {
			  setTimeout(function(){
			  msg.push({
				  text:"Ti scriverò sempre lo stesso messaggio a prescindere",
				  status:"received",
				  date: date
				})
		    }, 1000)
		},

		/**
		 * ## invio nuovo messaggio
		 * inserisco un messaggio nell'input e lo inserisco nella chat
		 * @param {array} messages -lista di messaggi in cui inserisco il mio messaggio
		 */
        inviaMessaggio(messages){
            messages.push({
				text:this.newMessage,
				status:"sent", 
				date: this.currentDate
			});
            this.newMessage="";
			this.rispostaAuto(messages,this.currentDate);

        },
		
		/**
		 * ## mostra menu
		 * 
		 * mostra il menu a comparsa per eliminare il messaggio selezionato
		 * @param {number} index -indice del messaggio cliccato
		 * @param {object} contatto -contatto di cui sto cliccando il messaggio
		 */
		mostraSubMenu(index,contatto){
			if(this.counter == index){ //se è già stato cliccato una volta lo deseleziono e quindi disappare
				this.counter = null;
			}else{ 						//altrimenti appare
				this.contattoSelezionato=contatto.name
				this.counter = index;

			}

		},
		deleteMsg(message,counter){
			let answer=confirm("vuoi cancellare il messaggio definitivamente?")
			if(answer){
				message.status = "deleted"
			}else{
				counter = null //faccio disapparire il sub-menu
			}
		}
		
		
    },
	
	
})


