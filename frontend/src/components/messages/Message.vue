<template>
  <div id="body" class="m-0 px-5 py-2 h-100 w-100 m-auto d-flex flex-column justify-content-between">
    <div class="rounded-3 background-red h-100 d-flex flex-column">
      <div class="message-cards d-flex justify-content-center">
        <div class="p-2 p-sm-3 d-flex flex-row message-card rounded-3 bg-white">
          <div class="d-flex flex-column ps-3">
            <h3>Ajoutez un nouveau message</h3>
            <form class="p-2 p-sm-3" v-on:submit.prevent="addNewMessage">
              <div class="form-group my-2 d-flex flex-column">
                <label for="new-message">Titre du message</label>
                <input v-model="newMessageText" id="new-title" placeholder="Ex. nourrir le chat" />
              </div>
              <div class="form-group my-2 d-flex flex-column">
                <label for="new-message">Contenu message</label>
                <textarea v-model="newMessageText" id="new-title" placeholder="Ex. nourrir le chat" />
              </div>
              <div class="form-group my-2 d-flex flex-column">
                <label for="new-message">Nouveau message</label>
                <button type="submit" name="submit" class="btn btn-primary btn-md" title="Ajoutez une image">Ajoutez un image</button>
              </div>
              <button type="submit" name="submit" class="btn btn-primary btn-md" title="Ajoutez une image">Enregistrer le message</button>
            </form>
          </div>
        </div>
      </div>
      <div class="m-2"><MenuMessage/></div>
      <div class="message-cards d-flex flex-row flex-wrap justify-content-center">
        <CardMessage
          v-for="(message) in messages"
          v-bind:key="message.id"
          v-bind:message="message"
        />
      </div>
    </div>
    <div id="page-change" class="small text-end red-text">Changement de page</div>
  </div>
</template>

<script>
// import CardMessage from './helpers/CardMessage.vue'
// import MenuMessage from './helpers/MenuMessage.vue'

// export default {
//   name: 'Messages',
//   props: {
//     // title: String
//   },
//   components: {
//     CardMessage,
//     MenuMessage
//   },
//   el: '#message-card',
//   data() {// A changer pour fonction qui fait une requête pour récupérer et envoyer en base
//     return {
//       newMessageText: '',
//       messages: [
//         {
//           id: 1,
//           title: 'Titre message 1',
//           content: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
//         },
//         {
//           id: 2,
//           title: 'Titre message 2',
//           content: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
//         },
//         {
//           id: 3,
//           title: 'Titre message 3',
//           content: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'
//         }
//       ],
//       nextMessageId: 4
//     }
//   },
//   methods: {
//     getMessages: function () {
//       try {
//         fetch('http://localhost:3000/api/furniture')
//         .then(response => {// Accéder à l'API
//           console.log(response);
//           return response.json();
//         })
//         .then(data => {//Accéder à mon tableau de données
//           if (searchURI) {// Si l'URL comporte une saisie récupérée de la barre de recherche
//             console.log(searchURI);
//             furnitures = filterFunction(data, searchURI);
//           } else {
//             console.log(data);
//             furnitures = data;
//           };
//           cardsLoop(); // créer les cartes de produits en fonction de la saisie de recherche ou non
//           hideLoader(); // Cacher le loader lorsque les cartes de produits sont créées
//         })

//         // Définir mon objet user à transmettre à l'API
//         let user = {
//           username : this.username,
//           email : this.email,
//           password : this.password,
//           picture : this.picture,// #####################################################################
//           bio : this.bio,
//         };
//         // Envoyer les données de l'objet au serveur
//         let functionRegister = async () => {
//           try {
//             fetch('http://localhost:3001/api/user/register', {
//               method : 'POST',
//               headers :{
//                 'Content-type' : 'application/json'
//               },
//               body: JSON.stringify(user),
//             })
//             .then( response => response.json())// VOIR SI TOUT METTRE DANS LE PREMIER THEN, sans console.log insécure ####################
//             .then( content => {
//               console.log("Données renvoyées par l'API :", content),
//               window.location.href = 'login'// Rediriger vers la page de loggin pour obtenir un token
//             });
//           } catch (e) {//Afficher une alerte d'erreur en cas de problèmes d'accès
//             alert(e)
//           }
//         };
//         functionRegister();
//       } catch (e) {//Afficher une alerte d'erreur en cas de problèmes d'accès
//         alert(e)
//       }
//     }
//   }
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// .red-text {
//   color: #BA4D55;
// }
// .background-red {
//   background-color: #FFD7D7;
// }
// .message-cards {
//   gap: 10px;
//   margin: 20px 0;
// }
// .message-card {
//   width: 500px;
// }

</style>