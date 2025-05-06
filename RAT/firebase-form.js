require('dotenv').config();

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDW6mobEFMVD9ljjB15MNlpBrErhkITqng",
  authDomain: "backendrat.firebaseapp.com",
  projectId: "backendrat",
  storageBucket: "backendrat.firebasestorage.app",
  messagingSenderId: "680897044591",
  appId: "1:680897044591:web:8a89a864b65cdfbbd9ed9a",
  measurementId: "G-BPKYKM5PEG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("compartilhar").addEventListener("click", async () => {
    try {
      const docRef = await addDoc(collection(db, "rat"), {
        unidade: document.getElementById("Unidade").value,
        endereco: document.getElementById("Endereço").value,
        cidade: document.getElementById("Cidade").value,
        estado: document.getElementById("Estado").value,
        setor: document.getElementById("Setor").value,
        colaborador: document.getElementById("Colaborador").value,
        telefone: document.getElementById("Telefone").value,
        chamado: document.getElementById("Chamado").value,
        patrimonio: document.getElementById("Patrimonio").value,
        serial: document.getElementById("Serial").value,
        marca: document.getElementById("Marca").value,
        modelo: document.getElementById("Modelo").value,
        tecnico: document.getElementById("tecnico").value,
        problema: document.getElementById("Problema").value,
        realizada: document.getElementById("Realizada").value,
        data: document.getElementById("Data").value,
        hora: document.getElementById("Tempo").value
      });

      //Acessa o ID e cola na area de transferencia automaticamente
        const link = `${window.location.origin}${window.location.pathname}?id=${docRef.id}`;

            await navigator.clipboard.writeText(link);// Essa API so funciona com HTTPS
            alert("Dados salvos com sucesso!\nO link foi copiado para a área de transferência:\n"+ link);

    } catch (e) {
      console.error("Erro ao salvar: ", e);
      alert("Erro ao salvar no Firebase.");
    }
  });
});
