// import * as SQLite from 'expo-sqlite';
// import { Alert } from 'react-native';

// const db = SQLite.openDatabase('database.db');

// const createTable = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'create table if not exists user (id integer primary key not null, name text, mail text, mdp text);',
//       [],
//       (_, result) => {
//         console.log('Table user créée avec succès', result);
//       },
//       (_, error) => {
//         console.error('Erreur lors de la création de la table user', error);
//       }
//     );
//   });
// };

// export { createTable, db };


// const formData = new FormData();
// formData.append("name", state.name);
// formData.append("mail", state.email);
// formData.append("password", state.password);

// fetch('http://jdevalik.fr/api/insertuser.php', {
//     method: 'POST',
//     body: formData,
//     headers : {
//         "Content-Type": "multipart/form-data"
//     },
// }).then((response) => response.json())
//     .then((json) => {
//     if(json == false) {
//         Alert.alert(
//             'Erreur',
//             'L\'e-mail saisi existe déja. Veuillez saisir une autre adresse mail ou recupérer votre mot de passe',
//             [
//                 {text: 'OK'}, onPress: () => console.log('OK pressed'),
//             ],
//             { cancelable: false },
//         );
//     }else{
//         navigate('Dashboard', {username: state.name});
//     }
// })
// .catch((error) => {
//     console.error(error);
//     }
// );


// const formData= new FormData();
// formData.append("mail", state.email);
// formData.append("password", state.password);

// fetch('http://jdevalik.fr/api/updateuser.php', {
//     method: 'POST',
//     body: formData,
//     headers : {
//         "Content-Type": "multipart/form-data"
//     },
// }).then((response) => response.json())
//     .then((json) => {
//     if(json == false) {
//         Alert.alert(
//             'Erreur',
//             'L\'e-mail saisi existe pas',
//             [
//                 {text: 'OK'}, onPress: () => console.log('OK pressed'),
//             ],
//             { cancelable: false },
//         );
//     }else{
//         navigate('Loginscreen');
//     }
// })
// .catch((error) => {
//     console.error(error);
//     }
// );


// const formData= new FormData();
// formData.append("mail", state.email);
// formData.append("password", state.password);

// fetch('http://jdevalik.fr/api/getuser.php', {
//     method: 'POST',
//     body: formData,
//     headers : {
//         "Content-Type": "multipart/form-data"
//     },
// }).then((response) => console.log(response))
//     .then((responses) => responses.json())
//         .then((json) => {
//         if(json != false){
//             navigate('Dashboard', {username: json.name})
//         }else{
//             Alert.alert(
//                 'Erreur',
//                 'L\'e-mail ou le mot de passe est incorrect',
//                 [
//                     {text: 'OK'}, onPress: () => console.log('OK pressed'),
//                 ],
//                 { cancelable: false },
//             );
//             }
//         })
//     .catch((error) => {
//         console.error(error);
//         }
//     );

