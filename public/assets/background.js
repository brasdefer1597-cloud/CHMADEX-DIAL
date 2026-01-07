
/**
 * Chalamandra QuantumMind - Background Service Worker
 * Gestiona el ciclo de vida de la extensión y eventos de sistema.
 */

chrome.runtime.onInstalled.addListener(() => {
  // Crear el menú contextual para decodificación instantánea
  chrome.contextMenus.create({
    id: "chalamandra-decode-selection",
    title: "Chalamandra: Decodificar '%s'",
    contexts: ["selection"]
  });
  
  console.log("🚀 Kernel Chalamandra 4.1: Sincronización Cuántica Activada");
});

// Manejador de clics en el menú contextual
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "chalamandra-decode-selection" && info.selectionText) {
    // Guardamos la selección en el storage local para que el App.tsx lo lea al abrirse
    chrome.storage.local.set({ 'lastSelectedText': info.selectionText }, () => {
      console.log("📥 Texto capturado por el Kernel:", info.selectionText.substring(0, 30) + "...");
      
      // Opcional: Podríamos disparar una notificación o insignia en el icono
      chrome.action.setBadgeText({ text: "!" });
      chrome.action.setBadgeBackgroundColor({ color: "#2EC4B6" });
    });
  }
});

// Limpiar insignia al abrir el popup
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "popup") {
    chrome.action.setBadgeText({ text: "" });
  }
});
