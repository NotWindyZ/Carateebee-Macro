# <img src="https://github.com/NotWindyZ/Carateebee-Macro/raw/reworked-main/images/carat.png" width="45" height="45" alt="Logo" align="center" /> Carateebee Macro

A Sol's RNG Coteab Macro that heavily customized theme for Umamusume!! (Forked from the original [Noteab's Biome Macro](https://github.com/xVapure/Noteab-Macro) under the [Apache 2.0 license](https://raw.githubusercontent.com/NotWindyZ/Carateebee-Macro/refs/heads/reworked-main/LICENSE.txt))

<p align="left">
  <img src="https://img.shields.io/github/downloads/NotWindyZ/Carateebee-Macro/total" alt="Downloads">
  <img src="https://img.shields.io/github/stars/NotWindyZ/Carateebee-Macro" alt="Stars">
  <img src="https://img.shields.io/github/forks/NotWindyZ/Carateebee-Macro" alt="Forks">
  <a href="https://discord.gg/coteab"><img src="https://img.shields.io/badge/Discord-Join-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
</p>

---

## Quick Contact
* Coteab Macro maintained by **Vapure** (aka *criticize.* / *C*), **Akito**. 
* You've probably seen us hanging around other Sol's RNG community servers.
* Reach out on Discord or drop an email at `work.vapure@gmail.com`.

---

## Features
* 99.99% accuracy using direct log-reading methods.
* Built-in OCR detection to automatically spot and buy from merchants
* Works flawlessly in all biomes, including GLITCHED, DREAMSPACE, and CYBERSPACE
* Simulates mouse clicks so you stay active during massive AFK sessions
* Full support for multi-webhooks to pipe live session time reports and notifications directly to your server

---

## Troubleshoot / FAQ

### Setup & Security
<details>
<summary><b>Is there a virus inside this macro?</b></summary>
<blockquote>
No, it's just Windows pulling false positives. Feel free to read through the source code or reverse-engineer it yourself. You can also drop the file into a virtual machine or VirusTotal. 

If Windows Defender blocks it, try turning off your anti-virus or watch these setup clips:
* <a href="https://youtu.be">Tutorial 1</a>
* <a href="https://youtu.be">Tutorial 2</a>
</blockquote>
</details>

<details>
<summary><b>The macro opens to a blank black/white screen?</b></summary>
<blockquote>
You need to install or reinstall Microsoft Webview2: <a href="https://microsoft.com">Download Webview2</a>.
</blockquote>
</details>

<details>
<summary><b>The macro won't do anything or won't start?</b></summary>
<blockquote>
Two fast fixes: Make sure you extracted the macro into its own folder right next to your config file. If it still hangs, right-click and <b>Run as administrator</b>.
</blockquote>
</details>

### Potions & OCR Failsafes
<details>
<summary><b>Why is the macro wasting my rare potions?</b></summary>
<blockquote>
Your OCR failsafe needs a tune-up. Push your mouse delay up to 1000–2000 milliseconds, or recalibrate the failsafe completely.
</blockquote>
</details>

<details>
<summary><b>The macro looks up an item and immediately closes?</b></summary>
<blockquote>
Either recalibrate your OCR-failsafe or completely disable the option. If you still want a safety net without using it, just bump your input delay up to 1000–2000 milliseconds.
</blockquote>
</details>

<details>
<summary><b>I set up the OCR-failsafe but it still reads items wrong?</b></summary>
<blockquote>
Swap your game font to a standard, clean text style—preferably <b>Arial</b> or <b>Rubik</b>.
</blockquote>
</details>

<details>
<summary><b>What exactly counts as the first item slot?</b></summary>
<blockquote>
Check this reference photo: <a href="https://postimg.cc">Item Slot Reference Image</a>.
</blockquote>
</details>

### Interaction & Fishing
<details>
<summary><b>Why isn't it pressing "E" when a merchant appears?</b></summary>
<blockquote>
Check your millisecond input delay field. If it's completely empty, the macro breaks. If you want it fast without issues, just type <code>0</code>.
</blockquote>
</details>

<details>
<summary><b>The macro keeps spamming the reel?</b></summary>
<blockquote>
Your midbar color sample is off. Give it a fresh calibration.
</blockquote>
</details>

<details>
<summary><b>The macro keeps spamming the fish button?</b></summary>
<blockquote>
Your fishing pixel detection needs to be recalibrated.
</blockquote>
</details>

---

**Still broken?** If none of these steps patch your issue, wipe everything and do a clean re-installation. If it's still acting up, drop a message in our support forum inside the [Discord server](discord.gg/coteab)!
