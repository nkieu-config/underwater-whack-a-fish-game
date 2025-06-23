# 🌊 Axolotl Catching Game

An interactive 3D underwater game where players **catch axolotls** and **avoid jellyfish** in a beautifully rendered scene built with **Three.js**. The game features **real-time animations**, **sound effects**, **GUI controls**, and a responsive design — offering a fun way to explore modern WebGL techniques!

> Built as a hands-on project to deepen skills in Three.js, game loops, raycasting, and UI integration.

---

## 🌐 Live Demo

🎮 [**Play the Game on Vercel**](https://nkieu-underwater-game.vercel.app/)

---

## ✨ Game Highlights

- 🎮 **Interactive Gameplay** – Catch axolotls with mouse clicks while avoiding jellyfish
- 🎨 **3D Models & Environment** – GLTF-based creatures with a stunning underwater backdrop
- ⏱️ **Timer-Based Challenge** – 20-second countdown per round
- 💖 **Health System** – Lose hearts when clicking jellyfish
- 🦈 **Shark Animation** – Attack animation plays on click
- 🔊 **Immersive Sound** – Background music and click feedback
- 📊 **GUI Panel** – Real-time score and heart counter with restart button
- 📱 **Responsive Canvas** – Fully scales with browser window size

---

## 🎯 How to Play

| Action                | Description                                   |
| --------------------- | --------------------------------------------- |
| 🟢 **Start Game**     | Click "Start" in the GUI to begin a 20s round |
| 🦎 **Catch Axolotls** | Click the pink axolotls to earn **+1 point**  |
| 🪼 **Avoid Jellyfish** | Clicking them deducts **-1 heart**            |
| 💔 **Game Over**      | Lose all 3 hearts or run out of time          |

> Creatures spawn every **650ms** with weighted randomness (axolotls appear more frequently).

---

## 📚 What I Learned

This project helped practice and strengthen:

- ✅ **Three.js Fundamentals** – Cameras, lights, textures, shadows, and materials
- ✅ **GLTF Model Loading** – Efficient use of GLTFLoader for optimized models
- ✅ **Raycasting** – Object interaction via mouse clicks in 3D space
- ✅ **Real-Time UI Updates** – Using `dat.GUI` and DOM to reflect game state
- ✅ **Sound Integration** – Layered sound effects and music handling
- ✅ **Game Loop Design** – Timer logic, spawning cycles, and state control

---

## 🛠️ Tech Stack

| Tech            | Purpose                                      |
| --------------- | -------------------------------------------- |
| **Three.js**    | 3D rendering and scene setup                 |
| **GLTFLoader**  | Load 3D axolotl, jellyfish, and other models |
| **dat.GUI**     | Game controls interface                      |
| **WebGL**       | Hardware-accelerated graphics engine         |
| **HTML5 + CSS** | Layout and styling                           |

---

## 🚀 Getting Started

### 🖥️ Run Locally

```bash
git clone https://github.com/nkieu-config/underwater-whack-a-fish-game.git
```

Then open `index.html` in your browser.

---

## 📐 Game Mechanics

### 🧮 Scoring System

- ✅ **+1 Point** for catching an axolotl
- ❌ **-1 Heart** for clicking a jellyfish
- 🕹️ Game ends when: **hearts = 0** or **time = 0**

### 🔄 Creature Spawning

- Spawns **every 650ms**
- **Axolotl spawn chance**: 4 in 6
- **Jellyfish spawn chance**: 2 in 6
- Spawned models never overlap positions

### 💥 Shark Animation

- Brief shark model appears on successful click
- Adds visual feedback for interaction

---

## 🎨 Assets & Credits

- 🎨 **3D Models**: Axolotl, Jellyfish, Shark – loaded via GLTF
- 📷 **Background Image**: Underwater city from [Pexels](https://www.pexels.com/photo/photo-of-underwater-city-2170473/)
- 🔊 **Audio Assets**: Background and click sounds (educational use)
- 🧠 Project idea and core architecture inspired by self-driven Three.js experimentation

---

## 📌 License

This project is open-source and available under the [MIT License](LICENSE).
