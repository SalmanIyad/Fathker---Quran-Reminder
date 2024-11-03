import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("Fathker - Quran Reminder Extension Activated");

  setInterval(async () => {
    try {
      await fetchAyah();
    } catch (error) {
      console.error("Error in interval fetch:", error);
    }
  }, 3600000);

  async function fetchAyah() {
    try {
      const response = await fetch("https://api.alquran.cloud/v1/ayah/random");

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return;
      }

      const data = await response.json();
      const ayah = (data as { data: { text: string } }).data.text;

      if (ayah) {
        vscode.window.showInformationMessage(ayah);
      } else {
        console.error("Invalid Ayah data received.");
      }
    } catch (error) {
      console.error("Error fetching Ayah:", error);
    }
  }
}

export function deactivate() {}
